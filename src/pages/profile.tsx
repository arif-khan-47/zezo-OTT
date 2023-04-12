import React from 'react'
import Layout from '../components/layout'
import { MdChevronRight } from 'react-icons/md'
import { TbMovie } from 'react-icons/tb'
import { FiSettings, FiHeadphones, FiLogOut } from 'react-icons/fi'
import { HiOutlineDeviceMobile } from 'react-icons/hi'
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearPhoneAndHash, setAuth } from '../Redux/Slices/authSlice'
import Cookies from 'universal-cookie';
import { useQuery } from '@tanstack/react-query'
import { whoami } from '../http'
import { toast } from 'react-hot-toast'


function Profile() {
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const navigate = useNavigate();

    const { data: getUser } = useQuery({
        queryKey: ['whoami'],
        queryFn: () => whoami()
    })
    



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
            toast.success('Logged Out',{
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
            })
        } catch (error) {

        }
    }

    return (
        <>
            <div className=' min-h-screen hidden sm:block'>
                <Layout>
                    <div className='px-5'>
                        <Link to={'/my-profile'}>
                            <div className='my-[30px] flex justify-between'>
                                <div className='flex gap-x-[18px] justify-start'>
                                    <img className='h-[70px] w-[70px] bg-green-700 rounded-full' src={getUser?.data.data.user.avatar} alt="" />
                                    <div className='text-white '>
                                        <div className='text-[24.46px] mb-[11px] font-semibold'>
                                            {getUser?.data.data.user.name}
                                        </div>
                                        
                                        <div className='text-[16.46px]'>
                                        {getUser?.data.data.user.phone}
                                        </div>
                                        <div className='text-[16.46px]'>
                                        {getUser?.data.data.user.email}
                                        </div>
                                    </div>
                                </div>
                                <MdChevronRight className='my-auto h-full w-12 fill-white' />

                            </div>
                        </Link>

                        <div className='h-[2px] bg-white rounded-full mb-[40px]' />

                        <Link to={'/my-account'}>
                            <div className='flex gap-[17px] mb-8'>
                                <TbMovie className='h-10 w-10 stroke-white' />
                                <div className='text-white text-[24px] my-auto'>My Account</div>
                            </div>
                        </Link>

                        <Link to={'/settings'}>
                            <div className='flex gap-[17px] mb-8'>
                                <FiSettings className='h-10 w-10 stroke-white' />
                                <div className='text-white text-[24px] my-auto'>Preferences</div>
                            </div>
                        </Link>

                        <Link to={'/manage-device'}>
                            <div className='flex gap-[17px] mb-8'>
                                <HiOutlineDeviceMobile className='h-10 w-10 stroke-white' />
                                <div className='text-white text-[24px] my-auto'>Linked Devices</div>
                            </div>
                        </Link>


                        <Link to={'/my-watch-history'}>
                            <div className='flex gap-[17px] mb-8'>
                                <BsFillCollectionPlayFill className='h-8 w-8 fill-white' />
                                <div className='text-white text-[24px] my-auto'>My Watch History</div>
                            </div>
                        </Link>




                        <div className='flex gap-[17px] mb-8'>
                            <CgNotes className='h-9 w-10 text-white' />
                            <div className='text-white text-[24px] my-auto'>Privacy Policy</div>
                        </div>
                        <div className='flex gap-[17px] mb-8'>
                            <FiHeadphones className='h-10 w-10 stroke-white' />
                            <div className='text-white text-[24px] my-auto'>Contact Us</div>
                        </div>
                        <div className='flex gap-[17px] mb-8 cursor-pointer' onClick={handleLogout}>
                            <FiLogOut className='h-10 w-10 stroke-white' />
                            <div className='text-white text-[24px] my-auto'>Logout</div>
                        </div>
                    </div>

                </Layout>
            </div>

            <div className=' min-h-screen px-5 pt-5 sm:hidden'>
                <Layout hideHeader>
                    <Link to={'/my-profile'}>
                        <div className='my-[30px] flex justify-between'>
                            <div className='flex gap-x-[18px] justify-start'>
                                <img className='h-[70px] w-[70px] bg-green-700 rounded-full' src={getUser?.data.data.user.avatar} alt="" />
                                <div className='text-white '>
                                    <div className='text-[24.46px] mb-[11px] font-semibold'>
                                    {getUser?.data.data.user.name}
                                    </div>
                                    <div className='text-[16.46px]'>
                                    {getUser?.data.data.user.phone}
                                    </div>
                                    <div className='text-[16.46px]'>
                                    {getUser?.data.data.user.email}
                                    </div>
                                </div>
                            </div>
                            <MdChevronRight className='my-auto h-full w-12 fill-white' />
                        </div>
                    </Link>

                    <div className='h-[2px] bg-white rounded-full mb-[40px]' />

                    <Link to={'/my-account'}>
                        <div className='flex gap-[17px] mb-8'>
                            <TbMovie className='h-10 w-10 stroke-white' />
                            <div className='text-white text-[24px] my-auto'>My Account</div>
                        </div>
                    </Link>

                    <Link to={'/settings'}>
                        <div className='flex gap-[17px] mb-8'>
                            <FiSettings className='h-10 w-10 stroke-white' />
                            <div className='text-white text-[24px] my-auto'>Preferences</div>
                        </div>
                    </Link>

                    <Link to={'/manage-device'}>
                        <div className='flex gap-[17px] mb-8'>
                            <HiOutlineDeviceMobile className='h-10 w-10 stroke-white' />
                            <div className='text-white text-[24px] my-auto'>Linked Devices</div>
                        </div>
                    </Link>


                    <Link to={'/my-watch-history'}>
                        <div className='flex gap-[17px] mb-8'>
                            <BsFillCollectionPlayFill className='h-8 w-8 fill-white' />
                            <div className='text-white text-[24px] my-auto'>My Watch History</div>
                        </div>
                    </Link>




                    <div className='flex gap-[17px] mb-8'>
                        <CgNotes className='h-9 w-10 text-white' />
                        <div className='text-white text-[24px] my-auto'>Privacy Policy</div>
                    </div>
                    <div className='flex gap-[17px] mb-8'>
                        <FiHeadphones className='h-10 w-10 stroke-white' />
                        <div className='text-white text-[24px] my-auto'>Contact Us</div>
                    </div>
                    <div className='flex gap-[17px] mb-8 cursor-pointer' onClick={handleLogout}>
                        <FiLogOut className='h-10 w-10 stroke-white' />
                        <div className='text-white text-[24px] my-auto'>Logout</div>
                    </div>
                </Layout>
            </div>



        </>
    )
}

export default Profile
