import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Title } from "../title";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface IDefaultcardProps {
  data: IContentData[];
  title: string;
}

const dummydata = [
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
  "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
];


const SearchMobCard = ({ data, title }: IDefaultcardProps): JSX.Element => {
  return (
    <div className="container mt-[20px] sm:mt-[40px]">
      <div className="flex justify-between">
        <div><Title>{title}</Title></div>
        <div className="text-[#2A96FA] cursor-pointer">See All</div>
      </div>
      <Swiper
        breakpoints={
          {
            0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            }


          }
        }
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper mt-3"
      >
        {
          data.length == 0 || null ?
            dummydata.map((item, index) => {
              return (
                <SwiperSlide className="w-full" key={index}>
                  <Link to={"/"}>
                    <div className="item overflow-hidden rounded cursor-pointer w-full">
                      <img
                        src={item}
                        alt="Card"
                        className="hover:scale-125 duration-300 w-full rounded overflow-hidden"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })
            :
            <div></div>
        }
        {
          data.map((item, index) => {
            return (
              <SwiperSlide className="w-full" key={index}>
                <Link to={"/"}>
                  <div className="item overflow-hidden rounded cursor-pointer w-full">
                    <img
                      src={item.poster}
                      alt="Card"
                      className="hover:scale-125 duration-300 w-full rounded h-[167.06px] sm:h-[250px] overflow-hidden"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default SearchMobCard;
