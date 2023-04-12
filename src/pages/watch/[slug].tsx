import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import { addFavorite, getAllSections, getCategories, getContentEndpoint, getWebsiteSettings } from '../../http';
// import VideoPlayer from "../../components/HomePageVideoPlayer/video";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

import Header from '../../components/shared/header';
import moment from "moment";
import { BsChevronDown, BsChevronUp, BsPlayCircleFill } from 'react-icons/bs'
import { IoIosAddCircle, IoMdArrowRoundBack } from 'react-icons/io'
import { RiShareFill } from 'react-icons/ri'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import SlugPageCard from '../../components/cards/slugPageCard';
import SeasonTabs from '../../components/Tabs/SeasonTabs';
import PlayButton from '../../components/Icons/svg/playButton';
import { toast } from 'react-hot-toast';


const Watch = ({ }: any) => {

    const { data: allSections, isLoading } = useQuery({
        queryKey: ["allSections"],
        queryFn: () => getAllSections(),
    });

    const { data: categories } = useQuery({
        queryKey: ["allCategories"],
        queryFn: () => getCategories(),
    });

    const { slug } = useParams();
    const [isTruncated, setIsTruncated] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    // console.log(data.source_link)
    const [loading, setLoading] = useState<boolean>(true)
    const [showController, setShowController] = useState<boolean>(false)
    const navigate = useNavigate()

    function indicateController() {
        setShowController(true);
        setTimeout(() => {
            setShowController(false);
        }, 5000);
    }

    async function handleFavorite(id: string) {
        try {
            const res = await addFavorite({ id });

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

    const { data: websiteSetting } = useQuery({
        queryKey: ["settings"],
        queryFn: () => getWebsiteSettings(),
    });

    async function fetchData() {
        const { data, status } = await getContentEndpoint(slug)
        if (status == 200) {
            setData(data.data[0])
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()

    }, [])


    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };



    return (
        <>
            {/* // Code for laptop and desktop View  */}
            <div className=' min-h-screen'>
                <Layout hideHeader>
                    <div className='relative sm:h-[576px] lg:h-full'>
                        <div className='absolute left-0 top-0 right-0 z-20 sm:block hidden'><Header settings={websiteSetting?.data} data={categories?.data} /></div>
                        <div className='sm:hidden' onClick={() => navigate('/')}><IoMdArrowRoundBack className='cursor-pointer fill-white w-9 h-9 z-10 absolute left-5 top-5 bg-[#919191] rounded-full p-2' /></div>
                        {
                            loading ?
                                <div className='h-[230px] sm:h-screen w-full bg-gray-500 animate-pulse'></div>
                                :
                                <div onMouseMove={() => indicateController()} className='relative'>
                                    <VideoPlayer
                                        contentData={data}
                                        sourceUrl={data.source_link}
                                        // userSession={userSession}
                                        isTrailer={data.trailer ? true : false}
                                        episode={data.seasons || null}
                                    />

                                    {
                                        showController ?
                                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                                <PlayButton />
                                            </div>
                                            :
                                            null
                                    }

                                </div>
                        }

                    </div>


                    {/* code for mobile  */}


                    <div className='sm:hidden'>
                        <div className='bg-gradient-to-t from-transparent via-black to-transparent'>
                            <div className='container px-5 text-white'>
                                {loading ?
                                    <>
                                        <div className='flex justify-between mt-2 mb-1'>
                                            <div className='h-[25px] w-[80%] bg-gray-500 rounded-lg my-auto animate-pulse' />
                                            <div className='bg-gray-500 rounded-full cursor-pointer h-10 w-10 my-auto animate-pulse' />
                                        </div>
                                        <div className='flex justify-start gap-x-[8.5px] gap-y-1 flex-wrap pb-[22px]'>
                                            <div className="my-auto animate-pulse bg-gray-500 rounded-md h-8 w-16" />
                                            <div className="my-auto animate-pulse bg-gray-500 rounded-md h-8 w-16" />
                                            <div className="my-auto animate-pulse bg-gray-500 rounded-md h-8 w-16" />
                                            <div className="my-auto animate-pulse bg-gray-500 rounded-md h-8 w-16" />
                                            <div className="my-auto animate-pulse bg-gray-500 rounded-md h-8 w-16" />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='flex justify-between mt-2 mb-1'>
                                            <div className='text-[25px] font-bold my-auto'>{data.name}</div>
                                            <div onClick={() => setIsFavorite(!isFavorite)} className='bg-[#292D2BBF] rounded-full my-auto p-2 cursor-pointer'>
                                                {isFavorite ? <HiHeart className='h-6 w-6 my-auto' /> : <HiOutlineHeart className='h-6 w-6 my-auto' />}
                                            </div>
                                        </div>
                                        <div className='flex justify-start gap-x-[8.5px] gap-y-1 flex-wrap pb-[22px]'>
                                            {data?.genres && data.genres.map((item: any, index: any) =>
                                                <div className="my-auto bg-[#393E3F] rounded-md py-[3px] px-[10px]">
                                                    <span className=''>{item.name}</span>
                                                </div>
                                            )}
                                            {
                                                data.duration && (
                                                    <div className="my-auto bg-[#393E3F] rounded-md py-[3px] px-[10px]">{Math.floor(data.duration / 3600)}H {Math.floor((data.duration % 3600) / 60)}Min</div>
                                                )
                                            }
                                            {
                                                data.rating && (
                                                    <div className="my-auto bg-[#393E3F] rounded-md py-[3px] px-[10px]">
                                                        <span className=''>{data.rating}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>

                                }


                            </div>
                        </div>
                        <div className='container px-5 text-white'>
                            {
                                loading ?
                                    <>
                                        <div className='w-[50px] bg-gray-500 animate-pulse rounded h-[20px]' />
                                        <div className='w-full bg-gray-500 animate-pulse rounded h-[20px] mt-2' />
                                        <div className='w-full bg-gray-500 animate-pulse rounded h-[20px] mt-1' />
                                        <div className='w-full bg-gray-500 animate-pulse rounded h-[20px] mt-1' />
                                        <div className='w-full bg-gray-500 animate-pulse rounded h-[20px] mt-1' />
                                        <div className='w-[50px] my-2 bg-gray-500 animate-pulse rounded h-[20px]' />

                                        <div className="flex overflow-x-auto">
                                            <div className="flex-shrink-0 flex whitespace-nowrap">

                                                <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div>
                                                <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div> <div className='w-[71.91px] mr-2'>
                                                    <div className='h-[71.91px] w-[71.91px] bg-gray-500 animate-pulse rounded-full' />
                                                    <div className='h-[20px] w-full bg-gray-500 animate-pulse rounded-lg mt-1'></div>
                                                </div>

                                            </div>
                                        </div>


                                    </>
                                    :
                                    <>
                                        <div className='text-[#2A96FA] text-[16.02px] font-semibold'>About</div>
                                        {isTruncated ? data?.description && data.description.slice(0, 250) + "..." : data?.description}

                                        <div className='text-[#2A96FA] flex gap-1 cursor-pointer' onClick={toggleTruncate}>
                                            {isTruncated ? "See More" : "See Less"}{isTruncated ? <BsChevronDown className='my-auto' /> : <BsChevronUp className='my-auto' />}
                                        </div>

                                        <div className='text-[#2A96FA] text-[16.02px] font-semibold my-2'>Cast</div>

                                        <div className="flex overflow-x-auto mb-2">
                                            <div className="flex-shrink-0 whitespace-nowrap">
                                                {
                                                    data?.cast && data.cast.length > 0 && data.cast.map((item: any, index: number) =>
                                                        <a href={`https://www.google.com/search?q=${item.name}`} target="_blank"><div className='w-[71.91px] mr-2'>
                                                            <img src={item.avatar} alt="" className='h-[71.91px] w-[71.91px] rounded-full' />
                                                            <div className='flex justify-center text-center'>{item.name.slice(0, 7)}{item.name.length > 7 ? '...' : ''}</div>
                                                        </div>
                                                        </a>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className='my-5'>
                                            {
                                                data && data?.type == 'series' ?
                                                    <>
                                                        <div className='text-[14.3px]'>Episodes</div>
                                                        <SeasonTabs data={data?.seasons} />
                                                    </>
                                                    :
                                                    <div></div>
                                            }
                                        </div>
                                    </>
                            }
                        </div>
                        <div>
                            {
                                isLoading ?
                                    <div className='text-white text-center'>Loading</div>
                                    :
                                    <>
                                        {
                                            allSections?.data &&
                                            allSections.data.map((section, index) => {
                                                if (section.type === "normal") {
                                                    return <SlugPageCard key={index} data={section.content} title={section.title} />;
                                                }
                                                return null;
                                            }
                                            )
                                        }
                                    </>
                            }
                        </div>
                    </div>


                    {/* code for tablet and desktop  */}
                    <div className='hidden sm:block'>
                        <div className='mx-7 pt-12 text-white'>
                            <div className='text-[10.32px]'>Home&gt;{data.type}&gt;{data.name}</div>
                            <div className='text-[24.53px] mt-10 flex justify-between'>
                                <div>{data.name}</div>
                                <div className='flex justify-center gap-8'>
                                    <div onClick={() => handleFavorite(data._id)} className='flex gap-1 cursor-pointer'>
                                        <div className="my-auto"><IoIosAddCircle /></div><div className="my-auto capitalize text-[20px]">Add to my List</div>
                                    </div>
                                    <div className='flex gap-1 cursor-pointer'>
                                        <div className="my-auto"><RiShareFill /></div><div className="my-auto capitalize text-[20px]">Share</div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-[32px] flex justify-start gap-6'>
                                <div className='my-auto text-[12.34px] border p-[7px] rounded'>{data.u_age}</div>
                                <div className='my-auto'>
                                    {moment(data.createdAt).format('YYYY')}
                                </div>
                                <div className="my-auto">{Math.floor(data.duration / 3600)}H {Math.floor((data.duration % 3600) / 60)}Min</div>
                                <div className="my-auto">
                                    {data?.language && data.language.map((item: any, index: any) =>
                                        <span className=''>{(index ? ', ' : '') + item.name}</span>
                                    )}
                                </div>
                            </div>
                            <div className='mt-8 text-[18.47px]'>{data.name}</div>
                            <div className='mt-3'><span className='text-gray-400'>Genre </span>
                                {data?.genres && data.genres.map((item: any, index: any) =>
                                    <span className=''>{(index ? ', ' : '') + item.name}</span>
                                )}</div>
                            <div className=''><span className='text-gray-400'>Content </span>
                                {data?.genres && data.genres.map((item: any, index: any) =>
                                    <span className=''>{(index ? ', ' : '') + item.name}</span>
                                )}</div>
                            <div className=''><span className='text-gray-400'>Director </span>
                                {data?.genres && data.genres.map((item: any, index: any) =>
                                    <span className=''>{(index ? ', ' : '') + item.name}</span>
                                )}</div>
                            <div className=''><span className='text-gray-400'>Starring </span>
                                {data?.genres && data.genres.map((item: any, index: any) =>
                                    <span className=''>{(index ? ', ' : '') + item.name}</span>
                                )}</div>
                            <div>
                                {isTruncated ? data?.description && data.description.slice(0, 250) + "..." : data?.description}
                                <div className='text-[#2A96FA] flex gap-1 cursor-pointer' onClick={toggleTruncate}>
                                    {isTruncated ? "See More" : "See Less"}{isTruncated ? <BsChevronDown className='my-auto' /> : <BsChevronUp className='my-auto' />}
                                </div>
                            </div>
                        </div>


                        <div>
                            {
                                allSections?.data &&
                                allSections.data.map((section, index) => {
                                    if (section.type === "normal") {
                                        return <SlugPageCard key={index} data={section.content} title={section.title} />;
                                    }
                                    return null;
                                }
                                )
                            }
                        </div>
                    </div>

                </Layout>
            </div >
        </>

    );
};

export default Watch;
