import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Router, useNavigate } from 'react-router-dom';
import Layout from '../components/layout'
import { delFavorite } from '../http';
import Cookies from 'universal-cookie';


function Favorite() {
    const [favorite, setFavorite] = useState([])
    const cookie = new Cookies();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const accessToken = cookie.get('accessToken');



    async function getAllFavorite() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/favorite`, {
                withCredentials: true,
                headers: {
                    "x-requested-with": "",
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            console.log(response);
            setFavorite(response.data.data)
            setLoading(false)
        } catch (error: any) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        getAllFavorite()
    }, [])




    function onClickHandler(type:string, slug:string) {
        navigate(`/${type}/${slug}`);
        window.location.reload();
        
      }




    async function handleDelFavorite(id: string) {
        try {
            const res = await delFavorite(id);

            console.log(res)
            toast.success("Removed from Favorite.", {
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
            toast.error(error.response.data.error.message);
        }
    }
    const num = 0;
    const length = 6;
    const loadingData = Array(length).fill(num);
    return (
        <>
            {/* Code for tab and destop */}
            <div className='sm:hidden'>
                <Layout hideHeader>
                    <div className="w-[94%] mx-auto pt-10">
                        <h1 className="text-2xl text-white font-semibold">
                            Favorite List
                        </h1>

                    </div>

                    <div className="container m-auto mt-4">
                        <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>

                            {
                                loading ? loadingData.map((item, index) => {
                                    return (
                                        <div key={index} className='col-span-1'>
                                            <div className='relative'>
                                                <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                    :
                                    favorite && favorite.length > 0 && favorite.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className='col-span-1 relative'>
                                                <div className='absolute right-1 top-1 hover:scale-125 duration-500 bg-red-600 rounded-full p-1 cursor-pointer' onClick={() => handleDelFavorite(item._id)}>
                                                    <svg className='w-6 stroke-white fill-none' viewBox="0 0 24 24"><g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"></path></g></svg>
                                                </div>
                                                <div className='aspect-video mx-auto bg-cover bg-no-repeat w-[100%] my-auto rounded cursor-pointer bg-gray-600 hover:border-2'  onClick={() => onClickHandler(item.content.type, item.content.slug)} style={{ backgroundImage: `url(${item.content.thumbnail})` }}>
                                                    {/* <img
                                                // onClick={() => handleSliderClick(item)}
                                                src={item.content.thumbnail}
                                                className=''
                                            /> */}
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>

                </Layout>

            </div>






            {/* Code for tab and destop */}
            <div className='sm:block hidden'>
                <Layout>
                    <div className="w-[94%] mx-auto mt-10">
                        <h1 className="text-2xl text-white font-semibold">
                            Favorite List
                        </h1>

                    </div>

                    <div className="container m-auto mt-4">
                        <div className='grid grid-cols-2 lg:grid-cols-5 gap-3 mx-5 lg:mx-0'>

                            {
                                loading ? loadingData.map((item, index) => {
                                    return (
                                        <div key={index} className='col-span-1'>
                                            <div className='relative'>
                                                <div className='aspect-video mx-auto w-[100%] my-auto rounded cursor-pointer bg-gray-600'>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                    :
                                    favorite && favorite.length > 0 && favorite.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className='col-span-1 relative'>
                                                <div className='absolute right-1 top-1 hover:scale-125 duration-500 bg-red-600 rounded-full p-1 cursor-pointer' onClick={() => handleDelFavorite(item._id)}>
                                                    <svg className='w-6 stroke-white fill-none' viewBox="0 0 24 24"><g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 003 3h6a3 3 0 003-3v-8M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"></path></g></svg>
                                                </div>
                                                <div className='aspect-video mx-auto bg-cover bg-no-repeat w-[100%] my-auto rounded cursor-pointer bg-gray-600 hover:border-2' onClick={() => onClickHandler(item.content.type, item.content.slug)} style={{ backgroundImage: `url(${item.content.thumbnail})` }}>
                                                    {/* <img
                                                // onClick={() => handleSliderClick(item)}
                                                src={item.content.thumbnail}
                                                className=''
                                            /> */}
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </Layout>

            </div>
        </>
    )
}

export default Favorite
