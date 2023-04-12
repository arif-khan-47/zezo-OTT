import * as React from "react";
import videojs from "video.js";
// import Player from "video.js/dist/types/player";
// import Player from "video.js/dist/types/player";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: any;
  isMuted?: boolean;
  src?: string;
}

const initialOptions: any = {
  controls: false,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },

    pictureInPictureToggle: false,
    PictureInPictureEvent: false,
    PictureInPictureWindow: false,
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options, isMuted, src }) => {
  const videoNode = React.useRef<HTMLVideoElement>();
  // const player = React.useRef<Player | any>();
  const player = React.useRef<any>();


  // on mute or unmute change events
  React.useEffect(() => {
    if (isMuted) {
      videoNode.current!.muted = true;
    } else {
      videoNode.current!.muted = false;
    }
  }, [isMuted]);

  React.useEffect(() => {
    if (src) {
      videoNode.current!.src = src;
    } else {
  videoNode.current!.src = "";
    }
  }, [src]);

  React.useEffect(() => {
    player.current = videojs(videoNode.current!, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      videoNode.current!.play();
      videoNode.current!.onloadeddata = function (e) {
        console.log(e);
      };
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode as any} className="video-js" />;
};

export default VideoPlayer;
