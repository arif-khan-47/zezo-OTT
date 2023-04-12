import React from 'react';
// import $ from 'jquery';
// import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { Title } from '../title';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const data = [
    "https://qqcdnpictest.mxplay.com/pic/452b1863d450b2bb76aeb9dff933db82/en/16x9/320x180/509de1e1cf9157c15a9ea442f34446bb_1920x1080.webp",
    "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
    "https://qqcdnpictest.mxplay.com/pic/452b1863d450b2bb76aeb9dff933db82/en/16x9/320x180/509de1e1cf9157c15a9ea442f34446bb_1920x1080.webp",
    "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
    "https://qqcdnpictest.mxplay.com/pic/452b1863d450b2bb76aeb9dff933db82/en/16x9/320x180/509de1e1cf9157c15a9ea442f34446bb_1920x1080.webp",
    "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
    "https://qqcdnpictest.mxplay.com/pic/452b1863d450b2bb76aeb9dff933db82/en/16x9/320x180/509de1e1cf9157c15a9ea442f34446bb_1920x1080.webp",
    "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp"
]

const responsive = {
    0: {
        items: 3,
        nav: false,
        dots: false,
        margin: 10,
        stagePadding: 20,
    },
    600: {
        items: 4,
        nav: false,
        dots: false,
        margin: 10,
        stagePadding: 20,
    },
    1000: {
        items: 4,
        nav: false,
        loop: false,
        dots: false,
        margin: 20,
        stagePadding: 40,
    },
    1200: {
        items: 4,
        nav: false,
        loop: false,
        dots: false,
        margin: 20,
        stagePadding: 40,
    },
    1400: {
        items: 4,
        nav: false,
        loop: false,
        dots: false,
        //margin: 20,
        stagePadding: 40,
    },
    1600: {
        items: 5,
        nav: false,
        loop: false,
        dots: false,
        margin: 20,
        stagePadding: 40,
    },
    1800: {
        items: 5,
        nav: false,
        loop: false,
        dots: false,
        margin: 20,
        stagePadding: 40,
    }
}

const CardOnSlider = () => {
    return (
        <div className='2xl:container sm:block hidden'>
            <Title className='mx-10'>
                Popular on Zezo
            </Title>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="mySwiper pl-10 mt-3"

            >

                {
                    data.map((item, index) => {
                        return (
                            <SwiperSlide className='w-full' key={index}>
                                <Link to={'/'}>
                                    <div className='item aspect-video overflow-hidden rounded cursor-pointer w-full'>
                                        <img
                                            src={item}
                                            alt='Card'
                                            className='hover:scale-125 duration-300 w-full rounded overflow-hidden'
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {/* <OwlCarousel responsive={responsive} className="mt-4" margin={10}>
                {
                    data.map((item) => {
                        return (
                            <Link to={'/'}>
                                <div className='item aspect-video overflow-hidden rounded cursor-pointer'>
                                    <img
                                        src={item}
                                        alt='Card'
                                        className='hover:scale-125 duration-300'
                                    />
                                </div>
                            </Link>
                        )
                    })
                }
            </OwlCarousel> */}
        </div>
    )
}

export default CardOnSlider