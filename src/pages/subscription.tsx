import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { getCategories, getSubscriptions, getWebsiteSettings, verifyPayment, checkout, whoami } from '../http';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { IoCheckmarkCircle } from 'react-icons/io5';
import Layout from '../components/layout';
import Header from '../components/shared/header';
import toast from 'react-hot-toast'
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';






function Subscription() {

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);


    const navigate = useNavigate()
    const cookie = new Cookies()
    const [loading, setLoading] = useState<boolean>(false)
    const accessToken = cookie.get('accessToken')
    const { data: allSubscription, isLoading } = useQuery({
        queryKey: ["getAllSubscriptions"],
        queryFn: () => getSubscriptions(),
    });
    const { data: categories } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories(),
    });
    const { data: websiteSetting } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getWebsiteSettings()
    })
    const { data: getUser } = useQuery({
        queryKey: ['whoami'],
        queryFn: () => whoami()
    })

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = async (data: any, rozerpay_api_key: string, item: any) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        const options = {
            key: rozerpay_api_key,
            amount: data.amount,
            currency: data.currency,
            name: item.name,
            description: item.description,
            image: websiteSetting?.data.logo,
            order_id: data.id,
            handler: async (response: any) => {
                const sendData: any = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                };
                try {
                    const response = await verifyPayment(sendData, headers);
                    if (response.status === 200) {
                        toast.success("Payment Successful", {
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
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);
                    }
                } catch (error) {
                    toast.error("Payment Failed");
                }
            },
            prefill: {
                name: getUser?.data.data.user.name || 'userSession.user?.info.name',
                email: getUser?.data.data.user.email || 'email@email.com',
                contact: getUser?.data.data.user.phone || '9876543210',
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    const handlePayment = async (selectedId: string) => {
        if (!isAuthenticated) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
            return toast.error("Please Login First")
        }
        setLoading(true)
        try {
            const response = await checkout({ subscriptionId: selectedId, provider: "razorpay" }, headers)
            const { data: { data, rozerpay_api_key } } = response
            const item = allSubscription?.data.find(plan => plan._id === selectedId)
            if (response.status === 201) {
                makePayment(data, rozerpay_api_key, item as any);
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            toast.error('Something want wrong!')
            setLoading(false)
        }
    };


    const [isHover, setIsHover] = useState<number>()


    return (
        <>
            {/* Code for mobile and tablet */}
            <div className='lg:hidden'>
                <div className='min-h-screen relative'>
                    <div className='hidden sm:block'>
                        <Header settings={websiteSetting?.data} data={categories?.data} />
                    </div>
                    <div className='px-5 relative'>
                        <Link to={'/profile'}>
                            <div className='absolute top-5 left-5'>
                                <IoMdArrowRoundBack className='h-10 w-10 fill-white' />
                            </div>
                        </Link>
                        <div className='absolute text-white text-[22px] top-6 left-1/2 transform -translate-x-1/2'>
                            Subscribe
                        </div>

                    </div>



                    <div className="pt-[100px] px-5">

                        <div className='text-[25.53px] text-white font-bold text-center'>
                            Subscribe to enjoy your lovely Movies or Series
                        </div>
                        <div className='text-[17.02px] text-white text-center mt-2 opacity-50 font-light mb-[63px]'>
                            We will help you to book your lovely movies  computerize and instantly. And it's free!
                        </div>
                    </div>
                    <div>
                        <Swiper
                            breakpoints={
                                {
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    640: {
                                        slidesPerView: 1,
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
                            className="mySwiper px-8 mt-3"
                        >
                            {
                                isLoading ?
                                    <>
                                        <div className='h-[310px] bg-gray-500 animate-pulse rounded-lg' />
                                    </>
                                    :
                                    <>
                                        {
                                            allSubscription?.data && allSubscription.data.length > 0 && allSubscription.data.map((item: IAllSubscriptionData, index: number) => {
                                                return (
                                                    <SwiperSlide className="w-full" key={index}>
                                                        {/* <Link to={`/${item.type}/${item.slug}`}> */}
                                                        <div className="rounded-lg py-8 mx-auto bg-gradient-to-tr from-[#0758A3] via-[#1570C5] to-[#2289E7] text-white text-center">
                                                            <div className='font-bold text-[18.01px]'>{item.name}</div>
                                                            <div className='text-[44.54px] font-bold'>₹{item.price}</div>
                                                            <div className='text-[12.32px] mb-[23px]'>{item.duration}</div>
                                                            <div className='mb-[23px]'>
                                                                {
                                                                    item?.points && item.points.length > 0 && item.points.map((item: any, index: number) =>

                                                                        <div className='text-[12.84px] font-light mb-1'>{item}</div>

                                                                    )
                                                                }

                                                            </div>
                                                            <button onClick={() => handlePayment(item._id)} className='text-[18.95px] py-[9.5px] bg-[#2A96FA] px-[68px] rounded-full'>Subscribe</button>
                                                        </div>
                                                        {/* </Link> */}
                                                    </SwiperSlide>
                                                );
                                            })
                                        }
                                    </>
                            }
                        </Swiper>
                        <div className='mt-[53px] mb-5 text-[11.91px] text-[#D4D4D4] text-center'>
                            You Will be charged $9.99 (monthly plan) or $60.99 (annual
                            plan) through your Tunes account.
                        </div>
                        <div className='text-[11.91px] text-[#D4D4D4] text-center'>You can cancel at any time if your not satisfied</div>
                    </div>




                </div>
            </div>


            {/* Code for laptop */}
            <Layout hideHeader>
                <div className='lg:block hidden bg-cover relative' style={{ backgroundImage: `url(https://res.cloudinary.com/dgyudczza/image/upload/v1676027129/muplay/Group_77_uwlio3.png)` }}>
                    <div>
                        <Header settings={websiteSetting?.data} data={categories?.data} />
                    </div>
                    <div className='min-h-screen container m-auto'>

                        <div className='py-[45px] text-[50px] text-center font-semibold text-white'>
                            Choose the plan
                            <div className='text-[17.8px]'>
                                Pay by month or the year
                            </div>
                        </div>




                        <div className='grid grid-cols-3 gap-20 mx-20 pb-[80px] -mb-24'>

                            {
                                isLoading ?
                                    <>

                                        <div className='h-[609.24px] bg-gray-500 animate-pulse rounded-lg' />
                                        <div className='h-[609.24px] bg-gray-500 animate-pulse rounded-lg' />
                                        <div className='h-[609.24px] bg-gray-500 animate-pulse rounded-lg' />

                                    </>
                                    :
                                    <>
                                        {
                                            allSubscription?.data && allSubscription.data.length > 0 && allSubscription.data.map((item: IAllSubscriptionData, index: number) => {
                                                return (
                                                    <div className="col-span-1" key={index}>
                                                        {/* <Link to={`/${item.type}/${item.slug}`}> */}
                                                        <div className='font-semibold text-[30.95px] text-center text-white mb-[33px]'>{item.name}</div>



                                                        <div onMouseOver={() => setIsHover(index)} onMouseOut={() => setIsHover(undefined)} className={`rounded-lg p-7 mx-auto ${isHover == index ? 'bg-[#2A96FA]' : 'bg-black'} text-white relative overflow-hidden`}>

                                                            {isHover == index ? <svg className='absolute h-[107px] w-[111px] top-0 right-0 fill-none' viewBox="0 0 111 107"><path fill="url(#paint0_linear_14_3434)" d="M22.668 81.706l87.619 24.566V3.914l-.819-1.638-.819-.82-1.637-.818H.559l22.11 81.068z"></path>
                                                                <defs><linearGradient id="paint0_linear_14_3434" x1="89.815" x2="54.604" y1="184.065" y2="0.638" gradientUnits="userSpaceOnUse"><stop stopColor="#67A8E5"></stop><stop offset="1" stopColor="#D9D9D9" stopOpacity="0"></stop></linearGradient></defs>
                                                            </svg> : null}

                                                            <div className='mb-3'>
                                                                <svg className='w-[50px] h-[50px] fill-none' viewBox="0 0 61 61"><path fill={isHover == index ? "#FDFEFE" : "#FD4F58"} d="M17.722 13.272c9.367-7.107 22.723-5.274 29.83 4.094 7.106 9.367 5.274 22.723-4.094 29.83-9.368 7.107-22.723 5.274-29.83-4.094-7.107-9.368-5.274-22.723 4.094-29.83zM37.664 39.56c5.15-3.907 6.158-11.25 2.251-16.4-3.907-5.15-11.25-6.158-16.4-2.25-5.15 3.907-6.158 11.25-2.25 16.4 3.907 5.15 11.25 6.157 16.4 2.25z"></path><path fill={isHover == index ? "#A7A1EE" : "#F8A9AC"} fillOpacity="0.66" d="M43.703 30.706c0-8.04-7.19-17.253-10.703-21.706 7.41 0 13.925 6.92 15.644 9.647 6.586 10.451 2.079 20.897-1.647 24.922C42.246 48.7 38.173 49.753 35.47 50c1.622-1.484 8.233-8.05 8.233-19.294z"></path></svg>
                                                            </div>



                                                            <div className='font-bold text-[26.2px] mb-2'>{item.name}</div>
                                                            <div className='text-[44.54px] font-bold mb-[30px]'>₹{item.price}<span className='text-[19.83px] font-light'>/{item.duration}</span></div>


                                                            <div className='mb-[23px]'>
                                                                {
                                                                    item?.points && item.points.length > 0 && item.points.map((item: any, index: number) =>

                                                                        <div className='text-[18px] font-light mb-[22px] flex'>
                                                                            <IoCheckmarkCircle className={`h-7 w-7 mr-2 fill-white`} />
                                                                            {item}
                                                                        </div>

                                                                    )
                                                                }

                                                            </div>
                                                            <button onClick={() => handlePayment(item._id)} className={`text-[22.97px] font-semibold py-[15px] w-full rounded-lg ${isHover == index ? 'bg-white text-black' : 'bg-[#212528]'}`}>Get Started</button>
                                                        </div>
                                                        {/* </Link> */}
                                                    </div>
                                                );
                                            })
                                        }
                                    </>
                            }
                        </div>




                    </div>
                </div>
            </Layout>


        </>

    )
}

export default Subscription
