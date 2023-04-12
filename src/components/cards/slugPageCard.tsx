import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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


const SlugPageCard = ({ data, title }: IDefaultcardProps): JSX.Element => {
  const [viewButton, setViewButton] = useState(false)


const navigate = useNavigate();


  function clickHandler(type:string,slug:string) {
    navigate(`/${type}/${slug}`);
    window.location.reload();
  }
  return (
    <div className="2xl:container mt-[20px] sm:mt-[40px]" onMouseOver={() => setViewButton(true)} onMouseOut={() => setViewButton(false)}>
      <div className="sm:block hidden">
        <div className="flex gap-1 w-fit cursor-pointer pl-5 sm:pl-10 ">
          <Title className={`${viewButton ? '' : 'mr-3'} uppercase`}>{title}</Title>
          <div className={`my-auto ml-2 text-[#2A96FA] font-bold ${viewButton ? '' : 'hidden'}`}>View All</div>
          <svg className="w-2 hidden sm:block fill-none my-auto"
            viewBox="0 0 7 12"
          ><path fill="#2A96FA" d="M.927 11.486a.732.732 0 001.036 0L6.83 6.62a.583.583 0 000-.825L1.963.929A.732.732 0 10.927 1.965l4.24 4.245L.92 10.456a.73.73 0 00.006 1.03z"></path>
          </svg>
        </div>

      </div>

      {/* For phone view  */}
      <div className="flex justify-between cursor-pointer px-5 sm:hidden">
        <Title className={` capitalize`}>{title}</Title>
        <div className={`my-auto ml-2 text-[#2A96FA] font-bold`}>See All</div>
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
              slidesPerView: 6,
              spaceBetween: 10,
            }


          }
        }
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper pl-5 sm:pl-10 mt-3"
      >
        {
          data.length == 0 || null ?
            dummydata.map((item, index) => {
              return (
                <SwiperSlide className="w-full" key={index}>
                  <Link to={`/`}>
                    <div className="item overflow-hidden rounded cursor-pointer w-full">
                      <img
                        src={item}
                        alt="Card"
                        className="hover:scale-125 duration-300 w-full rounded sm:h-[140.08px] overflow-hidden"
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
                {/* <Link to={`/${item.type}/${item.slug}`}> */}
                <div onClick={()=>clickHandler(item.type, item.slug)}>
                  <div className="item overflow-hidden rounded cursor-pointer w-full sm:block hidden">
                    <img
                      src={item.thumbnail}
                      alt="Card"
                      className="hover:scale-125 duration-300 w-full rounded sm:h-[140.08px] overflow-hidden"
                    />
                  </div>

                  {/* for mobile  */}
                  <div className="item overflow-hidden rounded cursor-pointer w-full sm:hidden">
                    <img
                      src={item.poster}
                      alt="Card"
                      className="hover:scale-125 duration-300 w-full rounded h-[166.77px] overflow-hidden"
                    />

                  </div>
                </div>
                {/* </Link> */}
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default SlugPageCard;
