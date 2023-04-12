import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout'
import { searching } from '../http/index';
import { useDebounce } from 'use-debounce';
import { IoClose } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'
import { BsMic } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'
import { getAllSections } from '../http'
import SearchMobCard from '../components/cards/searchMobCard';




function Search() {

    const genre = [
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_xxaca9.png',
            link: '/web-shows'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_1_wxsllp.png',
            link: '/movies'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_2_c7ipd1.png',
            link: '/short-films'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_81_3_vgyvw4.png',
            link: '/music'
        },
        {
            img: 'https://res.cloudinary.com/dgyudczza/image/upload/v1676022012/muplay/Group_67_gyu5h8.png',
            link: '/live-tv'
        },
    ]

    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])


    const [searchValue] = useDebounce(searchInput, 1000);

    async function getSearchContent(value: string) {
        try {
            const { data, status } = await searching(value);
            if (status === 200) {
                setLoading(false)
                setData(data.data)
            }
        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (searchValue) {
            getSearchContent(searchValue)
        }

    }, [searchValue])



    const { data: allSections } = useQuery({
        queryKey: ["allSections"],
        queryFn: () => getAllSections(),
    });



    const handleSearchInput = (event: any) => {
        setSearchInput(event.target.value);
        setLoading(true)
    };


    const NumberOfDiv = 6;

    const divs: any = [];

    for (let i = 0; i < NumberOfDiv; i++) {
        divs.push(i);
    }


    return (
        <>
            {/* Code for Mobile View  */}
            <div className='m-auto px-5 sm:hidden'>
                <Layout hideHeader>
                    <div className='pt-[30px] text-[18.24px] mb-4 text-white font-bold'>
                        Discover New
                    </div>
                    <div className='mx-auto w-full mb-[24px]'>
                        <div className='bg-gradient-to-l from-[#1F1F1F] to-[#0B0B0B] border-2 border-[#151515] w-full h-12 flex justify-between rounded-lg'>
                            <div className='h-full w-[8%] flex ml-2 lg:ml-0'>
                                <FiSearch className='m-auto fill-none stroke-white h-[20px] w-[20px]' />
                            </div>
                            <div className='h-full w-[80%]'>
                                <input className='h-full text-[15px] bg-transparent focus:outline-none text-white w-full placeholder:text-[#CCCCCCB5] placeholder:text-[15px]'
                                    defaultValue={searchInput}
                                    onChange={handleSearchInput}
                                    placeholder='Search here' type="text" name="" id="" />
                            </div>
                            <div className='my-auto w-[12%] cursor-pointer'>
                                <BsMic className='m-auto fill-gray-400' />
                            </div>

                        </div>
                    </div>

                    <div className='m-auto container min-h-screen'>
                        {searchInput === '' ?

                            allSections?.data &&
                            allSections.data.map((section, index) => {
                                if (section.type === "normal") {
                                    return <SearchMobCard key={index} data={section.content} title={section.title} />;
                                }
                                return null;
                            }
                            )
                            :
                            <>
                                <div className=''>
                                    {
                                        !loading && data && data.length === 0 && (
                                            <p className='text-white text-center text-3xl'>No Data Found</p>
                                        )
                                    }
                                </div>
                                <div className=''>
                                    {
                                        loading ?
                                            divs.map((item: any, index: any) => (
                                                
                                                <div key={index}  className='grid grid-cols-3 border-b py-2 border-gray-700'>
                                                    <div className='col-span-1'>
                                                        <div className='mx-auto h-16 w-32 animate-pulse rounded-xl bg-gray-500 cursor-pointer'/>
                                                    </div>
                                                    <div className='col-span-2 text-white'>
                                                        <div className='mx-5 rounded-lg h-5 animate-pulse bg-gray-500'></div>
                                                        <div className='h-3 mt-2 rounded-xl animate-pulse  bg-gray-500 mx-5'></div>
                                                        <div className='h-3 mt-2 rounded-xl animate-pulse  bg-gray-500 mx-5'></div>
                                                    </div>
                                                </div>
                                            
                                            ))
                                            :
                                        data && data.length > 0 && (
                                            data.map((item: any, index: number) => (
                                                <Link key={index} to={`/${item.type}/${item.slug}`}>
                                                    <div className='grid grid-cols-3 border-b py-2 border-gray-700'>
                                                        <div className='col-span-1'>
                                                            <img src={item.thumbnail} className='h-fit w-fit rounded-xl cursor-pointer' alt={item.slug} />
                                                        </div>
                                                        <div className='col-span-2 text-white'>
                                                            <div className='ml-5 text-xl'>{item.name}</div>
                                                            <div className='text-xs text-gray-400 ml-5'>{item.description.slice(0,70)}...</div>
                                                        </div>
                                                    </div>
                                                </Link>))
                                        )
                                    }

                                </div>
                            </>
                        }
                    </div>
                </Layout>
            </div>

            {/* Code for Desktop and tablet */}
            <div className='hidden sm:block'>
                <Layout>
                    <div className='pt-20 relative'>
                        <Link to={'/'}>
                            <div className='absolute lg:top-[97px] right-[5%] fill-none cursor-pointer'>
                                <IoClose className='fill-white lg:h-[30px] lg:w-[30px]' size={35} />
                            </div>
                        </Link>

                        <div className='mx-auto w-[70%]'>
                            <div className='bg-[#202020] w-full h-10 lg:h-[67.02px] flex justify-between rounded-l-lg rounded-r-[50px]'>
                                <div className='h-full w-[8%] flex ml-2 lg:ml-0'>
                                    <FiSearch className='m-auto fill-none stroke-white lg:h-[30px] lg:w-[30px]' />
                                </div>
                                <div className='h-full w-[84%]'>
                                    <input className='h-full text-[10px] lg:text-[22.12px] bg-transparent focus:outline-none text-white w-full placeholder:text-[#CCCCCCB5]'
                                        defaultValue={searchInput}
                                        onChange={handleSearchInput}
                                        placeholder='Search for a Web Shows, Movie & Genre etc' type="text" name="" id="" />
                                </div>



                                <div className='my-auto border-8 -mr-3 -mt-[4px] lg:-mt-[1px] border-[#121212] lg:p-3 p-2 bg-[#202020] rounded-full cursor-pointer'>
                                    <BsMic className='m-auto lg:w-[30px] lg:h-[30px] fill-white' />
                                </div>

                            </div>



                            <div className='lg:mt-[23.11px] mt-5 flex-wrap flex justify-evenly lg:grid lg:grid-cols-5 gap-2'>
                                {
                                    genre.map((item, index) => (
                                        <div key={index} className='lg:h-[68.56px] h-12 w-24 lg:w-full relative'>
                                            <Link to={item.link}>
                                                <img
                                                    className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#2A96FA] cursor-pointer'
                                                    src={item.img}
                                                    alt=""
                                                />
                                            </Link>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='m-auto mt-[60px] px-5 container'>
                        {searchInput === '' ?
                            <>
                                <p className='text-[18.26px] text-white mb-[23px]'>Today&apos;s Top Searches</p>

                                <div className='grid grid-cols-3 lg:grid-cols-6 gap-3'>
                                    {
                                        allSections?.data[0].content.map((item: any, index) => (
                                            <Link key={index} to={`/${item.type}/${item.slug}`}>
                                                <div className='h-[130px] w-full relative'>
                                                    <img src={item.thumbnail} className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00] cursor-pointer' alt={item.slug} />
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    {
                                        !loading && data && data.length === 0 && (
                                            <p className='text-white text-center text-3xl'>No Data Found</p>
                                        )
                                    }
                                </div>
                                <div className='grid grid-cols-3 lg:grid-cols-6 gap-3'>
                                    {
                                        loading ?
                                            divs.map((item: any, index: any) => (
                                                <div key={index} className='col-span-1 h-[130px] w-full bg-gray-800 animate-pulse rounded-xl'></div>
                                            ))
                                            :
                                            data && data.length > 0 && (
                                                data.map((item: any, index: number) => (
                                                    <Link key={index} to={`/${item.type}/${item.slug}`}>
                                                        <div className='h-[130px] w-full relative'>
                                                            <img src={item.thumbnail} className='h-fit w-fit rounded-xl hover:border-2 hover:border-[#FF2A00] cursor-pointer' alt={item.slug} />
                                                        </div>
                                                    </Link>))
                                            )
                                    }

                                </div>
                            </>
                        }
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default Search