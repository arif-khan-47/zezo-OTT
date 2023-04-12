import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import {  } from "swiper";
import { Link } from "react-router-dom";
// import Link from "next/link";
// import Router from "next/router";


const SlidePerWebView = 4;
const LoadingWebElement:any = [];

for (let i = 0; i < SlidePerWebView; i++) {
    LoadingWebElement.push(i);
}

function EpisodeSlider({ data }: any) {
    console.log(data)
    return (
        <div className="">

                <div className="">
                    <Swiper
                        cssMode={false}
                        // modules={[Navigation, Autoplay]}
                        className="mySwiper"

                        breakpoints={
                            {
                                0: {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: SlidePerWebView,
                                    spaceBetween: 20,
                                }


                            }
                        }
                    >
                        {
                            data && data.length > 0 ?
                                data && data.length > 0 && data.map((item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="hover:scale-105 py-5 rounded-2xl hover:duration-200 cursor-pointer">
                                            <div onClick={()=>console.log(item)}>
                                            {/* <Link to={`/${item.type}/${item.slug}`}> */}
                                                <div className="bg-cover sm:block hidden bg-center h-[211px] w-full rounded-xl" 
                                                style={{ backgroundImage: `url(${item.thumbnail})`}}
                                                 />
                                                 <div className="bg-gray-600 sm:hidden h-[41.9px] w-[41.9px] text-center flex rounded">
                                                   <span className="m-auto">{index + 1}</span>
                                                </div>
                                            {/* </Link> */}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                                :
                                LoadingWebElement.map((item:any, index:any) => (
                                    <SwiperSlide key={index}>
                                    <div key={index} className='h-[41px] w-[41px] bg-gray-800 animate-pulse rounded my-5'></div>
                                    </SwiperSlide>
                                ))
                        }
                    </Swiper>
                </div>
           
        </div>
    )
}

export default EpisodeSlider
