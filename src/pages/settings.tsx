import React, { useState } from 'react'
import Layout from '../components/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FiChevronDown } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { MdOutlineHelp } from 'react-icons/md'

function Settings() {


    return (
        <div className='min-h-screen relative px-5'>
            <div className='absolute top-5 left-5'>
                <div className="flex gap-x-5">
                    <Link to={'/profile'}>
                        <IoMdArrowRoundBack className='h-10 w-10 fill-white' />
                    </Link>
                    <div className='text-white text-[22px] my-auto'>
                        Settings
                    </div>

                </div>
            </div>



            <div className='text-[#D9D9D9] mb-8 pt-[100px]'>
                <div className='text-[12px] mb-3'>MEMBERSHIP</div>
                <div className='w-full rounded text-white bg-[#1B1F20]'>
                    <div className='p-[16px] flex justify-between'>
                        <div className='text-[16.34pxpx]'>
                            Autoplay Trailers
                        </div>

                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input id="toogleA" type="checkbox" className="sr-only" />
                                <div className="w-9 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                            </div>
                        </label>


                    </div>
                    <div className='h-[1px] bg-[#5F6364CC] mx-5'></div>
                    <div className='p-[16px] flex justify-between'>
                        <div className='text-[16.34pxpx]'>
                            Preferred Video Quality
                        </div>
                        <div className='flex'>
                            <div className='text-[16.83px] text-[#A1A1A1]'>Auto</div>
                            <FiChevronDown className='my-auto h-5 stroke-[#5F6364] w-5' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-[#D9D9D9] mb-8'>
                <div className='text-[12px] mb-3'>DOWNLOAD</div>
                <div className='p-[16px] flex justify-between bg-[#1B1F20] mb-3 rounded'>
                    <div className='text-[16.34pxpx]'>
                        Default Download Quality
                    </div>
                    <FiChevronDown className='my-auto h-5 stroke-[#5F6364] w-5' />
                </div>




                <div className='w-full rounded text-white bg-[#1B1F20]'>
                    <div className='text-[16.34px] p-[16px]'>
                        Log out
                    </div>
                    <div className='mx-[16px] rounded-full'>
                        <div className='bg-white w-[100%]'>
                            <div className='w-[56%] bg-[#898989] h-1' />
                        </div>
                    </div>
                    <div className='flex justify-between p-[16px]'>
                        <div className='flex text-[12.62px] text-[#898989]'>
                            <div className='h-3 w-3 bg-[#898989] my-auto mr-1' /> <span className='my-auto'>Used 58.92GB</span>
                        </div>
                        <div className='flex text-[12.62px] text-[#A1A1A1]'>
                            <div className='h-3 w-3 bg-white my-auto mr-1' /> Available 69.08GB
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-[5%] left-0 right-0'>
                <div className='flex justify-evenly'>
                    <div className='text-[#8E908F] text-[12.62px]'>Rate Us</div>
                    <div className='bg-white h-[5px] w-[5px] rounded-full my-auto'></div>
                    <div className='text-[#8E908F] text-[12.62px]'>Privacy Policy</div>
                    <div className='bg-white h-[5px] w-[5px] rounded-full my-auto'></div>
                    <div className='text-[#8E908F] text-[12.62px]'>Terms & Conditions</div>

                </div>
            </div>


        </div>
    )
}

export default Settings
