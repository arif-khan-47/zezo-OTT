import Header from "../shared/header";
import ContentImage from "../../assets/img/test.png";
import { FaPlay } from "react-icons/fa";
import { HiPlus, HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { CardOnSlider } from "../cards";
import React, { useEffect } from "react";
// Styles
import "video.js/dist/video-js.css";
import VideoPlayer from "../HomePageVideoPlayer/video";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addFavorite } from "../../http";
interface ISliderProps {
  settings: IWebsiteSettings | undefined;
  data: IContentData[];
  headerData: any|  IGetCategoriesData | undefined;
}

const HomeSlider = ({ settings, data, headerData }: ISliderProps): JSX.Element => {
  const [isSliderVideoPlay, setIsSliderVideoPlay] =
    React.useState<boolean>(false);
  const [isMute, setIsMute] = React.useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const [updatedUrl, setUpdatedUrl] = React.useState<string>("");
  const [actind, setActind] = React.useState<number>(0);
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSliderVideoPlay(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function playButton(data: any) {
    console.log(data);
    navigate(`/${data.type}/${data.slug}`);
    // window.location.reload();

  }
  async function handleFavorite(id: string) {
    try {
        const res = await addFavorite({id});

        console.log(res)
        toast.success("Added to Favorite.", {
            style: {
                border: '1px solid #2A96FA',
                padding: '16px',
                color: '#2A96FA',
                backgroundColor: '#1D1D1D'
            },
            iconTheme: {
                primary: '#2A96FA',
                secondary: '#1D1D1D',
            },
        });

    } catch (error: any) {
        // console.log(error.response.data.error.message)
        toast.success(error.response.data.error.message, {
            style: {
                border: '1px solid #2A96FA',
                padding: '16px',
                color: '#2A96FA',
                backgroundColor: '#1D1D1D'
            },
            iconTheme: {
                primary: '#2A96FA',
                secondary: '#1D1D1D',
            },
        });
    }
}

  const handlePaginationClick = (index: number, data: any) => {
    setCurrentSlide(index);
    setUpdatedUrl(data.trailer_source_link);
    setActind(index);
  }
  const goToPreviousSlide = (link: string) => {
    setUpdatedUrl(link);
    if (currentSlide === 0) {
      setCurrentSlide(data.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    if (actind === 0) {
      setActind(data.length - 1);
    } else {
      setActind(currentSlide - 1);
    }
  };
  [];
  const goToNextSlide = (link: string) => {
    setUpdatedUrl(link);
    if (currentSlide === data.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }

    if (actind === data.length - 1) {
      setActind(0);
    } else {
      setActind(currentSlide + 1);
    }
  };
  return (
    <>
      <div className="relative sm:h-[576px] lg:h-full">
        {isSliderVideoPlay ? (
          <div className="opacity-50 duration-1000">
            <VideoPlayer
              src={updatedUrl}
              isMuted={isMute}
              options={{
                autoplay: isSliderVideoPlay,
                controls: false,
                responsive: true,
                fluid: true,
                loop: true,
                muted: isMute,
                preload: "auto",
                poster: data[currentSlide].thumbnail,
                playbackRates: [0.5, 1, 1.5, 2],
                controlBar: {
                  pictureInPictureToggle: false,
                },
                sources: [
                  {
                    src: data[currentSlide].trailer_source_link,
                  },
                ],
              }}
            />
          </div>
        ) : (
          <img
            className="w-full h-full duration-1000"
            src={data[currentSlide].thumbnail}
            alt="home"
          />
        )}
        <div className="absolute top-[80px] md:top-[100px] lg:top-28 left-12 hidden sm:block">
          <div className="bg-blue-500 lg:w-36 lg:h-14 h-[38px] w-[93.94px] flex justify-center items-center bg-opacity-20 border-l-2 border-blue-500">
            <p className="text-white text-lg">{data[currentSlide].u_age}</p>
          </div>
        </div>
        <div className="absolute top-[141px] lg:top-52 left-12 hidden sm:block">
          <img className="w-96" src={ContentImage} />
        </div>
        <div className="absolute top-[352px] lg:top-[30rem] z-10  w-full px-12 items-center hidden sm:block">
          <div className="flex justify-between">
            <div className="flex gap-3">

                <button onClick={()=>playButton(data?.[currentSlide])} className="text-white bg-[#2A96FA] w-32 h-11 rounded flex justify-center items-center gap-2">
                  <FaPlay />
                  Play Now
                </button>

              <button onClick={() => handleFavorite(data?.[currentSlide]._id)} className="text-white bg-white bg-opacity-10 w-32 h-11 rounded flex justify-center items-center gap-2">
                <HiPlus size={20} className="text-white" />
                My List
              </button>
              <button className="text-white bg-opacity-10 w-10 h-11 rounded flex justify-center items-center gap-2">
                <IoIosShareAlt size={22} className="text-white" />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  goToPreviousSlide(
                    data[currentSlide].trailer_source_link || ""
                  )
                }
                className="text-white bg-white bg-opacity-10 w-11 h-11 rounded flex justify-center items-center gap-2"
              >
                <HiChevronLeft size={30} className="text-white" />
              </button>
              <button
                onClick={() =>
                  goToNextSlide(data[currentSlide].trailer_source_link || "")
                }
                className="text-white bg-white bg-opacity-10 w-11 h-11 rounded flex justify-center items-center gap-2"
              >
                <HiChevronRight size={30} className="text-white" />
              </button>
              <button
                onClick={() => setIsMute(!isMute)}
                className="text-white bg-opacity-10 w-11 h-11 rounded flex justify-center items-center gap-2"
              >
                {isMute ? (
                  <MdVolumeOff size={30} className="text-gray-300" />
                ) : (
                  <MdVolumeUp size={30} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 top-[30rem]">
          <div className="flex justify-center m-auto gap-2 mt-5">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <div onClick={() => handlePaginationClick(index, item)}
                    className={`${currentSlide === index
                        ? "bg-blue-500 h-3 w-8"
                        : "bg-gray-400 h-3 w-3"
                      } rounded-full cursor-pointer`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black h-96 hidden sm:block" />
        <div className="absolute top-[26rem] md:top-[25rem] lg:top-[33rem] xl:top-[35rem] 2xl:top-[40rem] 3xl:top-[40rem] w-full">
          <CardOnSlider />
        </div>
        <div className="absolute top-0 z-10 w-full hidden sm:block">
          <Header settings={settings?.data} data={headerData} />
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
