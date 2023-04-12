import React, { useState, useEffect, ChangeEvent } from 'react'
import Layout from '../components/layout'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BiCamera } from 'react-icons/bi'
import { FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { updateUser, whoami } from '../http'
import { toast } from 'react-hot-toast'

function MyProfile() {
    const { data: getUser } = useQuery({
        queryKey: ['whoami'],
        queryFn: () => whoami()
    })
    // console.log(getUser?.data.data.user)


    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState<any>('')
    const [avatarFile, setAvatarFile] = useState<any>('')


    console.log(avatar)

    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        if (getUser) {
            setName(getUser?.data.data.user.name);
            setPhone(getUser?.data.data.user.phone);
            setEmail(getUser?.data.data.user.email)
            setAvatar(getUser?.data.data.user.avatar)
        }
    }, [getUser]);



    const handleAvatarChange = (e: any) => {
        const selectedAvatar = e.target.files && e.target.files[0];
        setAvatarFile(selectedAvatar);
        setAvatar(URL.createObjectURL(selectedAvatar));
    };

    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | ''>("");
    const isMail = () => {
        setSelectedGender('male');
    }
    const isFemail = () => {
        setSelectedGender('female');
    }

    const handlePhoneInput = (event: any) => {
        const newValue = event.target.value;
        const regex = /^[0-9\b]+$/; // regular expression that matches only digits and backspace
        if (regex.test(newValue) && newValue.length == 10) {
            setPhone(newValue);
            setHasError(false);
        } else {
            setHasError(true);
        }
    };

    const fromData = new FormData();
    fromData.append("name", name);
    if(avatarFile) fromData.append("avatar", avatarFile);
    async function handleOnUpdate() {
        const res = await updateUser(fromData)
        try {
            toast.success(res.data.message||'Profile Updated successfully')
        } catch (error) {

        }

    }



    return (
        <div className='min-h-screen relative px-5'>
            <Layout hideHeader>
                <Link to={'/profile'}>
                    <div className='absolute top-5 left-5'>
                        <IoMdArrowRoundBack className='h-10 w-10 fill-white' />
                    </div>
                </Link>
                <div className='absolute text-white text-[22px] top-6 left-1/2 transform -translate-x-1/2'>
                    My Profile
                </div>


                <div className='flex pt-[100px] mb-10'>
                    <div className='h-[100px] w-[100px] mx-auto relative'>
                        <label htmlFor="profile" className=''>
                            <img className='bg-green-500 h-full w-full border-[#2A96FA] border-2 rounded-full' src={avatar} alt="" />
                            <input type="file" className='hidden' name="profile" id="profile" onChange={handleAvatarChange} />
                            <BiCamera className='absolute right-0 bottom-0 h-8 w-8 bg-[#2A96FA] rounded-full p-1 fill-white border-4 border-black' />
                        </label>
                    </div>
                </div>

                <div className='text-[17.94px] text-white font-semibold mb-[23px]'>Basic Detail</div>

                <div className='text-[#D9D9D9] mb-8'>
                    <div className='text-[17px] mb-1'>Full name</div>
                    <input type="text" className='h-[60px] w-full border rounded-lg border-[#FFFFFFB8] bg-transparent pl-[16px] text-lg text-[#D9D9D999]' placeholder='Full Name' defaultValue={name} name="" id="" />
                </div>

                <div className='text-[#D9D9D9] mb-8'>
                    <div className='text-[17px] mb-1'>Date of Birth</div>
                    <div className='h-[60px] w-full border rounded-lg border-[#FFFFFFB8] bg-transparent px-[16px] text-lg text-[#D9D9D999] flex justify-between'>
                        <div className='my-auto'>7 july 2023</div>
                        <FiChevronDown className='my-auto stroke-white h-6 w-6' />
                    </div>
                </div>


                <div className='text-[#D9D9D9] mb-8'>
                    <div className='text-[17px] mb-1'>Gender</div>
                    <div className="flex justify-center gap-3">
                        <div onClick={() => isMail()} className='h-[60px] w-full border rounded-lg border-[#FFFFFFB8] bg-transparent px-[16px] text-lg text-[#D9D9D999] flex justify-start'>
                            <div className='border-2 my-auto rounded-full p-[2px]'>
                                <div className={`h-[10px] w-[10px] ${selectedGender == 'male' ? 'bg-[#2A96FA]' : 'bg-white'} rounded-full`}></div>
                            </div>
                            <span className={`my-auto ml-4 ${selectedGender == 'male' ? 'text-white' : ''}`}>Male</span>
                        </div>
                        <div onClick={() => isFemail()} className='h-[60px] w-full border rounded-lg border-[#FFFFFFB8] bg-transparent px-[16px] text-lg text-[#D9D9D999] flex justify-start'>
                            <div className='border-2 my-auto rounded-full p-[2px]'>
                                <div className={`h-[10px] w-[10px] ${selectedGender == 'female' ? 'bg-[#2A96FA]' : 'bg-white'} rounded-full`}></div>
                            </div>
                            <span className={`my-auto ml-4 ${selectedGender == 'female' ? 'text-white' : ''}`}>Female</span>
                        </div>
                    </div>

                </div>

                <div className='text-[17.94px] text-white font-semibold mb-[23px]'>Contact Detail</div>

                <div className='text-[#D9D9D9] mb-8'>
                    <div className='text-[17px] mb-1'>Mobile number</div>
                    <input type="number" className={`h-[60px] w-full border ${hasError ? 'border-red-500' : 'border-[#FFFFFFB8]'} rounded-lg bg-transparent pl-[16px] text-lg text-[#D9D9D999]`} placeholder='Phone Number' onChange={handlePhoneInput} defaultValue={phone} name="" id="" />
                </div>

                <div className='text-[#D9D9D9] mb-20'>
                    <div className='text-[17px] mb-1'>Email</div>
                    <input type="email" className='h-[60px] w-full border rounded-lg border-[#FFFFFFB8] bg-transparent pl-[16px] text-lg text-[#D9D9D999]' placeholder='Email Id' defaultValue={email} name="" id="" />
                </div>


                <button onClick={() => handleOnUpdate()} className={`bg-[#2A96FA] w-full rounded-lg py-[16px] text-white font-semibold text-[19.94px]`}>
                    Save
                </button>


            </Layout>
        </div>
    )
}

export default MyProfile
