import React, { useEffect, useState } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import screenful from "screenfull";
import { BackIcon, BackwardIcon, ForwordIcon, FullScreenIcon, MuteVolumeIcon, PauseIcon, PlayBackSpeedIcon, PlayIcon, ReportIcon, SettingsIcon, SubtitleAndAudioIcon, VolumeIcon } from '../Icons/index'
import { Slider } from "@mui/material";
import "videojs-hotkeys";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import { addWatchTime, countView, addToHistoryEndpoint, updateHistoryEndpoint, IHistoryPayload, getContentSignCookieEndPoint } from "../../http/index";
import { publicIpv4 } from 'public-ip';
// import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import _ from "lodash";
import axios from "axios";
import { ISessionData } from "../../types/http/session";

// SetTimeOut Delay For Video Player Controllar
const delay = 5;

interface IVideoPlayerProps {
  sourceUrl: string | null;
  type?: string;
  contentData: IContent['data'][0];
  userSession?: ISessionData;
  isTrailer?: boolean;
  episode?: IContentEpisodes | null;
}

const VideoPlayer = ({ sourceUrl, type, contentData, userSession, isTrailer, episode }: IVideoPlayerProps): JSX.Element => {
  // console.log('bhcbchduvbhj', sourceUrl)

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${userSession?.accessToken}`
  }
  // router
  // const router = useRouter();
  // useRef
  const videoNode = React.useRef<HTMLVideoElement>();
  const player = React.useRef<videojs.Player>();
  const containerRef = React.useRef<HTMLInputElement>(null);
  // useStates
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [signCookie, setSignCookie] = React.useState({
    policy: "",
    signature: "",
    keyPairId: "",
  });

  // react redux
  const { currentTrackTime } = useSelector((state: RootState) => state.player);

  // get signcookie for content from server
  const getSignCookie = async () => {
    try {
      const { data } = await getContentSignCookieEndPoint(contentData._id, "cookie");
      const { url } = data;
      const newData = {
        // policy is url.CloudFront-Policy
        policy: url["CloudFront-Policy"],
        // signature is url.CloudFront-Signature
        signature: url["CloudFront-Signature"],
        // key-pair-id is url.CloudFront-Key-Pair-Id
        keyPairId: url["CloudFront-Key-Pair-Id"],
      }
      setSignCookie(newData);
      return data;
    } catch (error) {
      return null;
    }
  }

  // add to history
  const addToHistory = async () => {
    try {
      const payloadData: IHistoryPayload = {
        id: contentData._id,
        currentTime: 0,
      }
      await addToHistoryEndpoint(payloadData, headers);
    } catch (error) { }
  }
  // update current time to history
  // get current_time from localstorage
  const get_current_time_from_localStorage = () => localStorage.getItem('current_time')
  const updateHistory = async () => {
    const updatePayloadData: IHistoryPayload = {
      id: contentData._id,
      currentTime: parseInt(get_current_time_from_localStorage() || '0'),
    }
    try {
      await updateHistoryEndpoint(updatePayloadData, headers);
    } catch (error) { }
  }
  // update current time debounced
  const updateHistorydebounced = _.debounce((time: number) => {
    localStorage.setItem('current_time', time.toString());
  }, 5000, { 'maxWait': 5000 });

  // if video is played 1 minute then store view count in database
  const viewCountFunc = async (id: string, episodeId: string | null) => {
    try {
      await countView({
        content_id: id,
        episode_id: episodeId || null,
        ip_address: await publicIpv4() as any,
        platform: 'web',
        city: localStorage.getItem('city') || null,
        location: localStorage.getItem('country') || null,
        region: localStorage.getItem('regionName') || null,
        timezone: localStorage.getItem('timezone') || null,
      }, headers)
    } catch (error: any) {
    }
  }
  // useEffect for view count
  useEffect(() => {
    // axios call for get ip info
    publicIpv4().then(async (ip) => {
      // if ip is same in localStorage ipaddress then return
      if (localStorage.getItem('ipAddress') === ip) {
        return;
      }
      const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
      // store ip info in localStorage
      localStorage.setItem('ipAddress', data.query);
      localStorage.setItem('city', data.city);
      localStorage.setItem('country', data.country);
      localStorage.setItem('regionName', data.regionName);
      localStorage.setItem('timezone', data.timezone);
    })
    // now start 1 min timer then run viewCountFunc and clear timer
    const timer = setTimeout(() => {
      viewCountFunc(contentData._id, episode?._id || null)
    }, 15000);
    // getSignCookie();
    return () => clearTimeout(timer);
  }, [])
  // if video is played 1 minute then store view count in database
  const countWatchTime = async (id: string, episodeId: string | null, played: number) => {
    try {
      await addWatchTime({
        content_id: id,
        episode_id: episodeId || null,
        time: played,
        ip_address: await publicIpv4() as any,
        platform: 'web',
        city: localStorage.getItem('city') || null,
        location: localStorage.getItem('country') || null,
        region: localStorage.getItem('regionName') || null,
        timezone: localStorage.getItem('timezone') || null,
      }, headers)
      //console.log(data)
    } catch (error) {
      //console.log(error.response.data.error.message || 'Something want wrong')
    }
  }



  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true)


  const [remainingTime, setRemainingTime] = React.useState(0);
  const [volume, setVolume] = React.useState(0.5);
  const [mute, setMute] = React.useState(false);
  const [videoQuality, setVideoQuality] = React.useState<any>(null);
  const [videoLevels, setVideoLevels] = React.useState<any>(false);
  const [selectedPlaybackRate, setSelectedPlaybackRate] = React.useState(1);

  // show video quality controls
  const [showQualityControls, setShowQualityControls] = React.useState(false);
  const [showPlaybackRateControls, setShowPlaybackRateControls] = React.useState(false);
  const [showSubtitleAndAudioControls, setShowSubtitleAndAudioControls] = React.useState(false);

  const [selectedIndexLevel, setSelectedIndexLevel] = React.useState(-1);

  const { user } = useSelector((state: RootState) => state.auth);

  function getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values() as any]
  }

  useEffect(() => {
    if (videoLevels) {

      const levels = getUniqueListBy(videoLevels.levels_, "height");
      //setVideoQuality(levels)
      setVideoQuality(videoLevels.levels_);
    }

  }, [videoLevels])

  // now handle play pause
  const handlePlayPause = () => {
    if (isPlaying) {
      videoNode.current?.pause();
      setIsPlaying(false);
    } else {
      videoNode.current?.play();
      setIsPlaying(true);
    }
  }

  // handle fullscreen and exit fullscreen
  const handleFullscreen = () => {
    screenful.toggle(containerRef.current!)
    setIsFullScreen(!isFullScreen)
  }

  // handle overlay and exit overlay 5seconds after video ends
  useEffect(() => {
    let timer = setTimeout(() => setShowControls(false), delay * 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showControls]);

  // 10 forword and backword
  const handleForword = () => {
    videoNode.current!.currentTime += 10;
  }
  const handleBackword = () => {
    videoNode.current!.currentTime -= 10;
  }

  // get current time and duration
  const getCurrentTime = () => {
    return videoNode.current?.currentTime || 0;
  }
  // get played time
  const getPlayedTimePlayer = () => {
    return videoNode.current!.played
  }
  const getDuration = () => {
    return videoNode.current!.duration;
  }

  // Chenge Formet
  const format = (seconds: number) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };


  const onReady = (player: videojs.Player) => {
    // get played time
    if (currentTrackTime) {
      player.currentTime(currentTrackTime as any);
    }
    setIsPlaying(true);

    let qualityLevels = player.qualityLevels();
    setVideoLevels(qualityLevels);

    // get video duration and current time in minimute
    player.on("timeupdate", () => {
      // set current time
      setCurrentTime(getCurrentTime());
      setDuration(getDuration());
      // set remaining time
      setRemainingTime(getDuration() - getCurrentTime());
      // save current time in local storage for resume watching every 5 seconds useing lodash debounce
      updateHistorydebounced(player.currentTime());

      // get played time
      const playedTime = getPlayedTimePlayer();
      // get user total time spent on video without skipping and replaying 
      let totalTime = 0;
      for (let i = 0; i < playedTime.length; i++) {
        totalTime += playedTime.end(i) - playedTime.start(i);
      }
      // save totaltime locall storage
      localStorage.setItem('watch_time', Math.floor(totalTime as any).toString());

      // console.log(getDuration());
      // console.log(getCurrentTime());
      // console.log(playedTime);

      // if (playedTime.length > 0) {
      //   setWatchTime(playedTime.end(0));
      // }
    });
    // set volume
    // player.volume(volume);

    // play and pause video on space key
    document.addEventListener("keydown", (e) => {
      e.preventDefault();  // prevent default action
      if (e.keyCode === 32) {
        handlePlayPause();
        setShowControls(true);
      }
    });

    // handle fullscreen f key press
    document.addEventListener("keydown", function (e) {
      if (e.key === "f") {
        handleFullscreen();
      }
    });

    // handle forword and backword on left and right arrow key
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        handleForword();
        setShowControls(true);
      }
      if (e.key === "ArrowLeft") {
        handleBackword();
        setShowControls(true);
      }
    });



    // handle volume on up and down arrow key
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        setVolume(volume + 0.1);
        player.volume(volume);
        setShowControls(true);
      }
      if (e.key === "ArrowDown") {
        setVolume(volume - 0.1);
        player.volume(volume);
        setShowControls(true);
      }
    });

  }
  // handle on seek
  const onSeek = (e: any) => {
    videoNode.current!.currentTime = e.target.value;
  }
  // handle on volume change
  const onVolumeChange = (e: any) => {
    const value = e.target.value;
    if (value === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
    // volume slider value is from 0 to 1
    setVolume(value);
    videoNode.current!.volume = value;
  }
  // now handle mute and unmute
  const handleMute = () => {
    if (mute) {
      setMute(false);
      videoNode.current!.volume = volume;
    } else {
      setMute(true);
      videoNode.current!.volume = 0;
    }
  }
  // handle speed change
  const handleSpeedChange = (rate: any) => {
    videoNode.current!.playbackRate = rate;
    setSelectedPlaybackRate(rate);
  }

  // const trackEl = videoNode.current!.addTextTrack('captions', 'English', 'en');
  // trackEl.addEventListener('load', function () {
  //   console.log('loaded');
  // });

  const options = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [
      {
        // src: episode ? episode.source_link : sourceUrl ? contentData.trailer_source_link : sourceUrl,
        src: sourceUrl ? sourceUrl : episode ? episode.source_link : contentData.trailer_source_link,

      },
    ],
  };




  React.useEffect(() => {
    addToHistory()
    let playerRe: any;
    playerRe = player.current = videojs(videoNode.current!, options as any, () => onReady(player.current!));

    return () => {
      playerRe.dispose();
      updateHistory();
      countWatchTime(contentData._id, episode?._id || null, localStorage.getItem('watch_time') as any);
      // now clear watch time from local storage
      localStorage.removeItem('watch_time');
    }
  }, [sourceUrl]);


  // handle video quality change
  const handleQualityChange = (data: any) => {
    if (player) {
      let qualityLevels: any = player.current!.qualityLevels();
      setVideoLevels(qualityLevels);

      // nkdgndiangangkrf
      // Listen to change events for when the player selects a new quality level
      qualityLevels.on('change', function () {
        // console.log('Quality Level changed!');
        // console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
      });

      // show what levels are enabled
      let showEnabledLevels = () => {
        for (var i = 0; i < qualityLevels.length; i++) {
          let qualityLevel = qualityLevels[i];
          //console.log(qualityLevel.enabled, qualityLevel.height);
        }
      }

      // enable quality level by index, set other levels to false
      let enableQualityLevel = (level: any) => {

        for (var i = 0; i < videoQuality.length; i++) {
          let qualityLevel = qualityLevels[i];
          qualityLevel.enabled = i === level ? true : false;
        }

        qualityLevels.selectedIndex_ = level;
        qualityLevels.trigger({ type: 'change', selectedIndex: level });
      }

      enableQualityLevel(data);
      setSelectedIndexLevel(data);

      showEnabledLevels();


      player.current!.on('timeupdate', function () {
        //console.log("Playing now: ", player.current.videoHeight());
      })

      player.current!.on('loadedmetadata', function () {

        // enable buttons
        const setMinLevel: any = document.getElementById("setMinLevel");
        setMinLevel!.disabled = false;
        //document.getElementById("setMinLevel").disabled = false;

        // track currently rendered segments change
        let tracks = player.current!.textTracks();
        let segmentMetadataTrack: any

        for (let i = 0; i < tracks.length; i++) {
          if (tracks[i].label === 'segment-metadata') {
            segmentMetadataTrack = tracks[i];
          }
        }

        let previousPlaylist: any

        if (segmentMetadataTrack) {
          segmentMetadataTrack.on('cuechange', function () {
            let activeCue = segmentMetadataTrack.activeCues[0];

            if (activeCue) {
              if (previousPlaylist !== activeCue.value.playlist) {
                //console.log('Switched from rendition ' + previousPlaylist + ' to rendition ' + activeCue.value.playlist, activeCue.value.resolution.height);
              }
              previousPlaylist = activeCue.value.playlist;
            }
          });
        }

      });
    }
  }

  // handle auto quality change
  const handleAutoQuality = () => {
    if (player) {
      let qualityLevels: any = player.current!.qualityLevels();
      setSelectedIndexLevel(-1);
      qualityLevels.autoLevelEnabled = true;
      qualityLevels.selectedIndex_ = -1;
      qualityLevels.trigger({ type: 'change', selectedIndex: -1 });
    }
  }



  return (
    <>
      <div className="w-full flex justify-center items-center bg-black">
        <div ref={containerRef} data-vjs-player className="relative" onMouseMoveCapture={() => setShowControls(true)}>
          <video
            ref={videoNode as any}
            className='video-js vjs-big-play-centered'
            data-vjs-player
          />
          {
            showControls && <>
              <div className="absolute w-full h-full top-0">
                <div className="absolute top-4 lg:top-6 w-full z-50">
                  <div className="flex justify-between items-center px-4 lg:px-8 cursor-pointer">
                    <div className="cursor-pointer"
                    // onClick={() => router.back()}
                    >
                      <BackIcon className="w-5 lg:w-8" />
                    </div>
                    <div>
                      <h1 className="text-white text-base lg:text-2xl font-bold cursor-pointer">
                        {contentData.name}
                      </h1>
                    </div>
                    <div>
                      <ReportIcon className="w-5 lg:w-8" />
                    </div>
                  </div>
                </div>

                {
                  showQualityControls && <div className="absolute bottom-28 right-10">
                    <div className="w-72 h-fit bg-gray-800 py-4 bg-opacity-70 rounded">
                      <div className="px-10 mb-4">
                        <span className="text-white text-xl font-bold">Video Quality</span>
                      </div>
                      <hr />
                      <ul>
                        {
                          videoQuality && videoQuality.map((level: any, index: number) => {
                            return (
                              <li key={index} className="flex justify-between items-center w-full cursor-pointer">
                                <div className="flex items-center hover:bg-[#401A4C] w-full" onClick={() => {
                                  handleQualityChange(index)
                                  setShowQualityControls(false)
                                }}>
                                  <div className={`ml-2 text-sm font-semibold px-5 py-1 ${selectedIndexLevel === index && 'text-green-500'
                                    }`}>{level.height}p</div>
                                </div>
                              </li>
                            )
                          }
                          ).reverse()
                        }
                        <li>
                          <div className="flex justify-between items-center w-full cursor-pointer">
                            <div className="flex items-center hover:bg-[#401A4C] w-full" onClick={() => {
                              handleAutoQuality()
                              setShowQualityControls(false)
                            }}>
                              <div className={`ml-2 text-sm font-semibold px-5 py-1
                              ${selectedIndexLevel === -1 && 'text-green-500'}
                              `}>Auto</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                }


                {
                  showPlaybackRateControls && <div className="absolute bottom-28 right-10">
                    <div className="w-72 h-fit bg-gray-800 py-4 bg-opacity-70 rounded">
                      <div className="px-10 mb-4">
                        <span className="text-white text-xl font-bold">
                          Playback Speed
                        </span>
                      </div>
                      <hr />
                      <ul>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 0.25 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(0.25)} >0.25</li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 0.5 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(0.5)} >0.5</li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 0.75 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(0.75)} >0.75</li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 1 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(1)} >
                          Normal
                        </li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 1.25 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(1.25)} >1.25</li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 1.5 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(1.5)} >1.5</li>
                        <li className={`text-sm md:text-base lg:text-base font-semibold px-10 py-2 cursor-pointer hover:bg-[#401A4C] ${selectedPlaybackRate === 2 && 'text-green-500'
                          }`} onClick={() => handleSpeedChange(2)} >2</li>

                      </ul>
                    </div>
                  </div>
                }


                {/* {
                  showSubtitleAndAudioControls && <div className="absolute bottom-28 right-10">
                    <div className="w-72 h-fit bg-gray-800 py-4 bg-opacity-70 rounded">
                      <ul>
                        <li className="flex justify-between items-center px-4 py-2 cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            <div className="ml-2">Subtitle</div>
                          </div>
                        </li>
                        <li className="flex justify-between items-center px-4 py-2 cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                            <div className="ml-2">Audio</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                } */}


                <div className="absolute bottom-2 w-full overflow-hidden">
                  <div className="px-8 flex items-center">
                    <Slider
                      color="secondary"
                      sx={{
                        color: '#B9090B',
                      }}
                      value={currentTime}
                      min={0}
                      step={1}
                      onChange={onSeek}
                      max={duration}
                    />
                    <span className="ml-5 text-xl">{format(remainingTime)}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 lg:px-8 py-2">
                    <div className="flex gap-5 lg:gap-8 items-center">
                      <div onClick={handlePlayPause} className="cursor-pointer">
                        {
                          !isPlaying ? <PlayIcon className="w-5 lg:w-8" /> : <PauseIcon className="w-5 lg:w-8" />
                        }
                      </div>
                      <div onClick={handleBackword} className="cursor-pointer">
                        <BackwardIcon
                          className="w-5 lg:w-8"
                        />
                      </div>
                      <div onClick={handleForword} className="cursor-pointer">
                        <ForwordIcon
                          className="w-5 lg:w-8"
                        />
                      </div>
                      <div className="hidden lg:flex items-center gap-6 w-52">
                        <div className="cursor-pointer">
                          {
                            !mute ? <div onClick={() => handleMute()}> <VolumeIcon className="w-5 lg:w-8" /> </div> : <div onClick={() => handleMute()}><MuteVolumeIcon className="w-5 lg:w-8" /></div>
                          }
                        </div>
                        <Slider
                          value={volume}
                          min={0}
                          step={0.1}
                          max={1}
                          sx={{
                            color: 'white',
                          }}
                          onChange={onVolumeChange}
                          aria-labelledby="input-slider"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 lg:gap-8 items-center">
                      {/* <div className="cursor-pointer" onClick={() => {
                        setShowQualityControls(false)
                        setShowPlaybackRateControls(false)
                        setShowSubtitleAndAudioControls(!showSubtitleAndAudioControls)
                      }}>
                        <SubtitleAndAudioIcon className="w-5 lg:w-8" />
                      </div> */}
                      <div className="cursor-pointer" onClick={() => {
                        setShowQualityControls(false)
                        setShowPlaybackRateControls(!showPlaybackRateControls)
                        setShowSubtitleAndAudioControls(false)
                      }}>
                        <PlayBackSpeedIcon className="w-5 lg:w-8" />
                      </div>
                      <div className="cursor-pointer" onClick={() => {
                        setShowQualityControls(!showQualityControls)
                        setShowPlaybackRateControls(false)
                        setShowSubtitleAndAudioControls(false)
                      }}>
                        <SettingsIcon className="w-5 lg:w-8" />
                      </div>
                      <div onClick={handleFullscreen} className="cursor-pointer">
                        <FullScreenIcon className="w-5 lg:w-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </>



  );
};

export default VideoPlayer;
