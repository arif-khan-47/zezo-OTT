import { getCategories, getWebsiteSettings, login, register, verifyOTP } from "../http/index";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/shared/header";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "../Redux/Slices/authSlice";





function Register({ config }: any) {
  const { data: websiteSetting } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getWebsiteSettings(),
  });
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getCategories(),
  });
  const bgimg = "https://res.cloudinary.com/dgyudczza/image/upload/v1678453584/zezo.in/Group_57_xpmwqt.png";
  const cookies = new Cookies();
  const [name, setName] = useState('')
  const [withEmail, setWithEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedWithEmail, setIsSubmittedWithEmail] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  const isValidName = /^[a-zA-Z\s]+$/.test(name);

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }
  function handleNameChange(event: any) {
    setName(event.target.value);
  }

  const isFormValid = isValidEmail && isValidPassword && isValidName;




  async function submitWithEmail() {
    try {
      const res = await register({ name, email, password });
      try {
        toast.success(res.data.message || "Registered Sucessfully", {
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
        cookies.set('accessToken', res.data.accessToken)
        cookies.set('refreshToken', res.data.refreshToken)
          dispatch(setAuth({
            user: res.data.user,
            isAuthenticated: true
          }))
          navigate('/')

      } catch (error) {
        toast.error("Something was wrong.");
      }


      // }
      //if login is successfull redirect it to home page
    } catch (error: any) {
      // console.log(error.response.data.error.message)
      toast.error(error.response.data.error.message || "Incorrect Email or Password.");
    }
  }








  function handleToggleVisibility() {
    setSeePassword(!seePassword);
  }

  return (
    <>
      {/* Code for Mobile Device */}
      <div className="sm:hidden">
        <div
          className={`bg-black h-screen -mb-24`}
        >
          <div className="px-5 h-[100%]">
            <div className="h-[100%] pt-[20%] relative">
              <div className="text-[31px] text-white font-semibold mb-1">
                Register
              </div>
              <p className=" mb-8 text-white">Already a User? <Link to={'/login'}><span className="text-[#2A96FA]">Login.</span></Link></p>



              <div className="text-[19.5px] text-white">
                <div className="my-auto mb-2">Name:</div>
                <div
                  className={`px-[18px] bg-[#D9D9D917] py-[5px] border-2 ${isValidName || name == ''
                    ? "border-none"
                    : "border-red-500 "
                    }`}
                >
                  <input
                    className="w-full focus:outline-none placeholder:text-white bg-transparent"
                    autoFocus={true}
                    defaultValue={email}
                    placeholder="Your Full Name"
                    onChange={handleNameChange}
                    type="text"
                    min="0"
                    max="10"
                    name=""
                    id=""
                  />
                </div>
              </div>
              {isValidName || name == '' ? (
                <div className="mb-[30px]"></div>
              ) :
                (
                  <div className="mb-[30px] text-xs text-red-500 capitalize">
                    <span>Please enter a valid Name.</span>
                  </div>
                )
              }

              <div className="text-[19.5px] text-white">
                <div className="my-auto mb-2">Email:</div>
                <div
                  className={`px-[18px] bg-[#D9D9D917] py-[5px] border-2 ${isValidEmail || email == ''
                    ? "border-none"
                    : "border-red-500 "
                    }`}
                >
                  <input
                    className="w-full focus:outline-none placeholder:text-white bg-transparent"
                    autoFocus={true}
                    defaultValue={email}
                    placeholder="Your Email"
                    onChange={handleEmailChange}
                    type="email"
                    min="0"
                    max="10"
                    name=""
                    id=""
                  />
                </div>
              </div>
              {isValidEmail || email == '' ? (
                <div className="mb-[30px]"></div>
              ) :
                (
                  <div className="mb-[30px] text-xs text-red-500 capitalize">
                    <span>Please enter a valid email.</span>
                  </div>
                )
              }

              <div className="text-[19.5px] text-white">
                <div className="my-auto mb-2">New Password:</div>
                <div
                  className={`px-[18px] flex justify-between bg-[#D9D9D917] py-[5px] border-2 ${isValidPassword || password == ''
                    ? "border-none"
                    : "border-red-500 "
                    }`}
                >
                  <input
                    className="w-full focus:outline-none placeholder:text-white bg-transparent"
                    autoFocus={true}
                    defaultValue={password}
                    placeholder="New Passsword"
                    type={seePassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    min="0"
                    max="10"
                    name=""
                    id=""
                  />
                  <button
                    type="button"
                    onClick={handleToggleVisibility}
                    className=" text-gray-600"
                  >
                    {seePassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
              </div>



              {isValidPassword || password == '' ? null : (
                <p className="text-red-500 text-xs mb-[20px]">Must be at least 8 characters long, at least one lowercase & uppercase letter, and one number.</p>
              )}


              <div className="absolute left-0 right-0 bottom-[4%]">
                <div className="text-center text-white text-[12px] mb-5">
                  By clicking verify, l agree with the <span className="text-[#2A96FA]">Terms & Conditions</span> and <br /> <span className="text-[#2A96FA]">Privacy Policy</span>
                </div>
                <div className="flex">
                  {
                    !isFormValid ?
                      <button className='bg-gray-600 ripple-bg-gray-600 rounded-xl text-[15px] text-white py-2 font-bold w-full capitalize'>Sign Up</button>
                      :
                      <button onClick={submitWithEmail} className='bg-[#2A96FA] rounded-xl text-[15px] text-white py-2 font-bold w-full capitalize'>Sign Up</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






      {/* Code for Tablet and Laptop view */}
      <div className="hidden sm:block">
        <Layout hideHeader>
          <div className="relative">
            <div className="absolute top-0 left-0 right-0">
              <Header settings={websiteSetting?.data} data={categories?.data} />
            </div>
            <div
              className={`lg:bg-cover h-screen -mb-24`}
              style={{ backgroundImage: `url(${bgimg})` }}
            >
              <div className="px-5 lg:px-10 grid lg:grid-cols-2 h-full">
                <div className="col-span-1 hidden lg:block m-auto">
                  <img
                    className="mb-11"
                    src="https://res.cloudinary.com/dgyudczza/image/upload/v1678453686/zezo.in/image-removebg-preview_25_1_hikjp0.png"
                  />
                  <div className="text-white text-[17.97px]">
                    Watch Latest Move, Drama, series & Sports with
                  </div>
                  <div className="text-[#2A96FA] text-[33.57px] font-bold">
                    Unlimited Fun & Masti
                  </div>
                </div>
                <div className="col-span-1 text-white flex">

                  <div className="m-auto bg-[rgba(0,0,0,0.7)] border rounded-lg w-[76%]">
                    {isSubmittedWithEmail ? (
                      <>
                        <div className="pt-[48px] font-semibold leading-tight text-[36px]  mb-[16px] text-center">
                          Password
                          <div className="mx-auto rounded-full mt-[4.34px] h-[5px] w-[28px] bg-[#2A96FA]"></div>
                        </div>
                        <div className="text-center text-[16px] mb-[42px]">
                          Your password.
                          <div className="mt-2">{email} isn't your email? <button onClick={() => setIsSubmittedWithEmail(false)} className="text-[#2A96FA]">Edit</button></div>
                        </div>
                        <div className="w-[75%]  mx-auto">
                          <div className="mb-[10px] border-b-2 border-gray-500 relative">
                            <input
                              className="w-full focus:outline-none placeholder:text-white bg-transparent"
                              autoFocus={true}
                              defaultValue={password}
                              placeholder="Passsword"
                              type={seePassword ? 'text' : 'password'}
                              value={password}
                              onChange={handlePasswordChange}
                              min="0"
                              max="10"
                              name=""
                              id=""
                            />
                            <button
                              type="button"
                              onClick={handleToggleVisibility}
                              className="absolute inset-y-0 right-0 px-3 text-gray-600"
                            >
                              {seePassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                          </div>
                          {isValidPassword ? null : (
                            <p className="text-red-500 mb-[20px]">Must be at least 8 characters long, at least one lowercase & uppercase letter, and one number.</p>
                          )}

                          {/* <div className="mb-[30px]">

                            {isValidPassword ? (
                              <button
                                disabled
                                className="bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                              >
                                LOGIN
                              </button>
                            ) : (
                              <button
                                onClick={submitOtp}
                                className="bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                              >
                                LOGIN
                              </button>
                            )}
                          </div> */}
                          {/* <div className="flex justify-between gap-2">
                            <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                            <div className="my-auto text-[20px] text-gray-400">or</div>
                            <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                          </div> */}



                          {/* <div className="text-[#2A96FA] text-center font-semibold cursor-pointer mt-[20px] mb-[40px]" onClick={() => setWithEmail(false)}>Login with Phone</div> */}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pt-[50px] font-semibold leading-tight text-[36px]  mb-[16px] text-center">
                          Sign Up
                          <div className="mx-auto rounded-full mt-[4.34px] h-[5px] w-[28px] bg-[#2A96FA]"></div>
                        </div>
                        <div className="text-center text-[16px] mb-[30px]">
                          Already a User? <Link to={'/login'}><span className="text-[#2A96FA]">Login.</span></Link>
                        </div>

                        <div className="w-[75%] mx-auto">
                          {/* Name  */}
                          <div className="mb-2">
                            <div
                              className={`rounded-xl px-[18px] py-[16px] border-2 ${isValidName || name == ''
                                ? "border-[#C7C7C76E]"
                                : "border-red-500 "
                                } text-[19.5px]`}
                            >
                              <input
                                className="w-full focus:outline-none placeholder:text-white bg-transparent"
                                autoFocus={true}
                                defaultValue={name}
                                placeholder="Your Full Name"
                                onChange={handleNameChange}
                                type="text"
                                min="0"
                                max="10"
                                name=""
                                id=""
                              />
                            </div>
                          </div>



                          {/* Email  */}
                          <div className="mb-2">
                            <div
                              className={`rounded-xl px-[18px] py-[16px] border-2 ${isValidEmail || email == ''
                                ? "border-[#C7C7C76E]"
                                : "border-red-500 "
                                } text-[19.5px]`}
                            >
                              <input
                                className="w-full focus:outline-none placeholder:text-white bg-transparent"
                                autoFocus={true}
                                defaultValue={email}
                                placeholder="Your Email"
                                onChange={handleEmailChange}
                                type="email"
                                min="0"
                                max="10"
                                name=""
                                id=""
                              />
                            </div>
                          </div>


                          {/* Password  */}
                          <div className={`mb-[10px] rounded-xl px-[18px] py-[16px] ${isValidPassword || password == '' ? 'border-gray-500' : 'border-red-500'} relative bg-[#D9D9D917] border-2`}>
                            <input
                              className="w-full focus:outline-none placeholder:text-white placeholder:text-xl bg-transparent"
                              autoFocus={true}
                              defaultValue={password}
                              placeholder="Passsword"
                              type={seePassword ? 'text' : 'password'}
                              value={password}
                              onChange={handlePasswordChange}
                              min="0"
                              max="10"
                              name=""
                              id=""
                            />
                            <button
                              type="button"
                              onClick={handleToggleVisibility}
                              className="absolute inset-y-0 right-0 px-3 text-gray-600"
                            >
                              {seePassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button>
                          </div>
                          {isValidPassword || password == '' ? null : (
                            <p className="text-red-500 mb-[20px]">Must be at least 8 characters long, at least one lowercase & uppercase letter, and one number.</p>
                          )}

                          <div className="mb-[30px]">
                            {
                              !isFormValid ?
                                <button disabled className='bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Sign Up</button>
                                :
                                <button onClick={submitWithEmail} className='bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Sign Up</button>
                            }
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default Register;
