import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'

function WatchHistory() {

    const dummydata = [
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '30%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '50%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '83%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '36%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '43%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '85%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '80%',
            name: 'Unknown'
        },
        {
            banner: "https://qqcdnpictest.mxplay.com/pic/1a9a8ebf62df05e913ce23f67d954e02/en/2x3/320x480/test_pic1676362110871.webp",
            watched: '70%',
            name: 'Unknown'
        },
    ];



    return (
        <div className='min-h-screen relative px-5'>
            <div className='absolute top-5 left-5'>
                <div className='flex gap-x-5'>
                    <Link to={'/profile'}>
                        <IoMdArrowRoundBack className='h-10 w-10 fill-white' />
                    </Link>
                    <div className='text-white text-[22px] my-auto'>
                        My Watch History
                    </div>
                </div>
            </div>
            <div className='absolute top-6 right-5'>
                <MdDelete className='h-8 w-8 fill-white' />
            </div>

            <div className='pt-[100px] grid grid-cols-2 sm:grid-cols-4 gap-[4px]'>
                {
                    dummydata.map((item, index) =>
                        <div className='col-span-1'>
                            <div className='relative'>
                                <img className='h-[103.03px] sm:h-60 rounded-lg w-full' src={item.banner} alt="" />
                                <div className='bottom-0 left-0 right-0 absolute bg-gradient-to-t from-black to-transparent pt-[50px] rounded-lg flex justify-between px-[6px] pb-[2px]'>
                                    <div>
                                        <div className='text-white text-xs'>{item.name}</div>
                                        <div className='text-[#FFFFFFA3] text-[8px]'>{item.name}</div>
                                    </div>
                                    <BsFillPlayFill className='h-8 w-7 fill-white my-auto' />
                                </div>
                            </div>
                            <div className='mx-1'>
                                <div className='mt-1 h-[3px] w-[100%] bg-[#5F636478] rounded-full mb-3'>
                                    <div className={`h-[3px] rounded-l-full bg-[#2A96FA]`} style={{width: item.watched}}/>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default WatchHistory
