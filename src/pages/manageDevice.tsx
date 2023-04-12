import React, { useState } from 'react'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'

function ManageDevice() {

    const data = [
        {
            device: 'Realme Phone (This Device)',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 14',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 13',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 12',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 11',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone X',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 8',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 7',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 6',
            date: '11/Feb/2023'
        },
        {
            device: 'iPhone 5',
            date: '11/Feb/2023'
        },
    ]

    return (
        <div className='min-h-screen'>
            {/* <Layout hideHeader> */}
                <div className='bg-[#222222] px-5 py-5 flex justify-between'>
                    <div className='text-white text-[15.91px] my-auto'>
                        Manage Devices
                    </div>
                    <Link to={'/profile'}>
                        <MdClose className='h-8 w-8 fill-white' />
                    </Link>
                </div>
                <div className=''>
                    {
                        data.map((item, index) =>
                            <>
                                <div className='py-4 px-5 flex justify-between border-b'>
                                    <div>
                                        <div className='text-[15.91px] text-white'>
                                            {item.device}
                                        </div>
                                        <div className='text-[13.86px] text-[#A1A1A1]'>
                                            {item.date}
                                        </div>
                                    </div>
                                    <button className='text-[#2A96FA] text-[12px] font-semibold py-[7px] my-auto px-[14px] border rounded'>Log Out</button>
                                </div>
                            </>
                        )
                    }

                </div>

            {/* </Layout> */}
        </div>
    )
}

export default ManageDevice
