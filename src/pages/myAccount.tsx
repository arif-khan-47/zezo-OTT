import React, { useState } from 'react'
import Layout from '../components/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FiChevronRight } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineHelp } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { whoami } from '../http'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { clearPhoneAndHash, setAuth } from '../Redux/Slices/authSlice'
import Cookies from 'universal-cookie'

function MyAccount() {

    const dispatch = useDispatch()
    const cookie = new Cookies()
    const navigate = useNavigate()


    const { data: getUser } = useQuery({
        queryKey: ['whoami'],
        queryFn: () => whoami()
    })
    // console.log(getUser?.data.data.user)

    function handleLogout() {
        try {
            dispatch(setAuth({
                isAuthenticated: false,
                user: null
            }))
            dispatch(
                clearPhoneAndHash()
            )
            cookie.remove('accessToken')
            cookie.remove('refreshToken')
            navigate('/')
        } catch (error) {

        }
    }

    return (
        <div className='min-h-screen relative px-5'>
            <div className='absolute top-5 left-5'>
                <div className="flex gap-x-5">
                    <Link to={'/profile'}>
                        <IoMdArrowRoundBack className='h-10 w-10 fill-white' />
                    </Link>
                    <div className='text-white text-[22px] my-auto'>
                        My Account
                    </div>

                </div>
            </div>


            <div className='flex pt-[100px]'>
                {
                    getUser ?
                        <img src={getUser?.data.data.user.avatar} alt="" className='h-[85px] w-[85px] mx-auto bg-[#565C5C] rounded-full p-2 fill-black' />
                        :

                        <GoPerson className='h-[85px] w-[85px] mx-auto bg-[#565C5C] rounded-full p-2 fill-black' />
                }
            </div>
            <div className='text-white text-center mt-[10px] mb-[31px]'>
                <div className='text-[18.39px]'>{getUser?.data.data.user.name}</div>
                <div className='text-[#909696] text-[14.3px]'>+91 {getUser?.data.data.user.phone}</div>
                <div className='text-[#909696] text-[14.3px]'>{getUser?.data.data.user.email}</div>

            </div>

            <div className='text-[#D9D9D9] mb-8'>
                <div className='text-[12px] mb-3'>MEMBERSHIP</div>
                <div className='w-full rounded text-white bg-[#1B1F20]'>
                    <div className='p-[16px]'>
                        <div className='text-[16.34px]'>
                            {getUser?.data.data.isPremium.subscriptionDetails.name}
                        </div>
                        <div className='text-[#909696] text-[14.3px]'>Active Date: {moment(getUser?.data.data.isPremium.subscriptionDetails.active_at).format('Do MMMM YYYY')}</div>
                        
                    </div>
                    <div className='h-[1.5px] bg-[#5F6364CC]'></div>
                    <div className='p-[16px] flex justify-between'>
                        <div className='text-[16.34pxpx]'>
                            Cancel Subscription
                        </div>
                        <FiChevronRight className='my-auto h-5 stroke-[#5F6364] w-5' />
                    </div>
                </div>
            </div>

            <div className='text-[#D9D9D9] mb-8'>
                <div className='text-[12px] mb-3'>ACCOUNT AND SECURITY</div>

                <Link to={'/settings'}>
                    <div className='w-full rounded text-white bg-[#1B1F20] p-[16px] text-[16.34px] mb-3'>
                        Account Settings
                    </div>
                </Link>

                <Link to={'/manage-device'}>
                    <div className='w-full rounded text-white bg-[#1B1F20] p-[16px] text-[16.34px] mb-3'>
                        Manage Devices
                    </div>
                </Link>

                <div className='w-full rounded text-white bg-[#1B1F20]'>
                    <div onClick={handleLogout} className='text-[16.34px] p-[16px] cursor-pointer'>
                        Log out
                    </div>
                    <div className='h-[1.5px] bg-[#5F6364CC] mx-[16px]'></div>
                    <div className='text-[16.34px] p-[16px]'>
                        Log out All Devices
                    </div>
                </div>
            </div>

            <div className='py-9 flex justify-center gap-2'>
                <MdOutlineHelp className='my-auto h-6 w-6 fill-[#D9D9D9]' />
                <div className='text-[#8E908F]'>Need Help? Click Here</div>
            </div>


        </div>
    )
}

export default MyAccount
