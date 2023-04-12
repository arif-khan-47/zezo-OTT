import Header from "../shared/header"
import { MdVolumeOff, MdVolumeUp } from "react-icons/md"
import { CardOnSlider } from "../cards"
import React, { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";




// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


import { Pagination } from "swiper";
// Styles
import "video.js/dist/video-js.css";
import VideoPlayer from "../HomePageVideoPlayer/video"
interface ISliderProps {
    settings: IWebsiteSettings | undefined;
    data: IContentData[];
    headerData: any | undefined;
}

const phoneSlugHomeSlider = ({ settings, data, headerData }: ISliderProps): JSX.Element => {
    const [actind, setActind] = React.useState<number>(0);
    const [isSliderVideoPlay, setIsSliderVideoPlay] = React.useState<boolean>(false)
    const [isMute, setIsMute] = React.useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSliderVideoPlay(true)
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <>
            {/* <div className="w-full sm:hidden">
                <Header settings={settings?.data} data={headerData}/>
            </div> */}
            <div className="relative sm:h-[576px] lg:h-full">
                <Swiper
                    // pagination={true} 
                    modules={[Pagination]}
                    breakpoints={
                        {
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }
                    }
                    className="mySwiper mx-5 my-5"
                    onSlideChange={(e) => setActind(e.activeIndex)}
                >
                    {
                        data.map((item, index) =>
                        (
                            <SwiperSlide key={index}>
                                <div className="h-full w-full text-white rounded-lg">
                                    {
                                        isSliderVideoPlay ? <div className="opacity-50 duration-1000 rounded-lg">
                                            <VideoPlayer
                                                isMuted={isMute}
                                                src={item.trailer_source_link || ""}
                                                options={
                                                    {
                                                        autoplay: isSliderVideoPlay,
                                                        controls: false,
                                                        responsive: true,
                                                        fluid: true,
                                                        loop: true,
                                                        muted: isMute,
                                                        preload: "auto",
                                                        poster: item.thumbnail,
                                                        playbackRates: [0.5, 1, 1.5, 2],
                                                        controlBar: {
                                                            pictureInPictureToggle: false
                                                        },
                                                        sources: [
                                                            {
                                                                src: item.trailer_source_link
                                                                // src: item.source_link
                                                                // src: item.type == 'series' ? item.seasons && item.seasons.length > 0 && item.seasons[0].episodes && item.seasons[0].episodes[0].trailer_source_link : item.trailer_source_link
                                                            },
                                                        ],
                                                    }
                                                }
                                            />
                                        </div> : <img
                                            className="w-full h-full duration-1000 rounded-lg"
                                            src={item.thumbnail}
                                            alt="home"
                                        />
                                    }
                                </div>
                                <div className="absolute bottom-3 z-10  w-full pl-8 pr-5 items-center sm:hidden">
                                    <div className="flex justify-between text-white">
                                        <div>
                                            <div className="text-[16.06px]">
                                                {item.name}
                                            </div>
                                            <div className="opacity-60 flex gap-1">
                                                {item.genres?.map((genres, index) => (
                                                    <div key={index} className='text-[12px]'>
                                                        {genres.name}
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                isSliderVideoPlay ?
                                                    <button
                                                        onClick={() => setIsMute(!isMute)}
                                                        className="text-white bg-opacity-10 w-11 h-11 rounded flex justify-center items-center gap-2">
                                                        {
                                                            isMute ? <MdVolumeOff size={30} className="text-gray-300" /> : <MdVolumeUp size={30} className="text-white" />
                                                        }
                                                    </button>
                                                    : null

                                            }
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        )
                        )
                    }
                </Swiper>
                <div className='flex justify-center gap-1 mt-5'>
                    {data.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className={`${actind === index ? 'bg-blue-500 h-2 w-4' : 'bg-gray-400 h-2 w-2'} rounded-full`}></div>
                            </div>
                        )

                    }
                    )}
                </div>


            </div>
        </>

    )
}

export default phoneSlugHomeSlider