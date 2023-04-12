import { getCategories, getWebsiteSettings, login, loginWithEmail, verifyOTP } from "../http/index";
import React, { useState, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import Header from "../components/shared/header";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout";
import OTPInput, { ResendOTP } from "otp-input-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoMail, IoArrowBackOutline } from 'react-icons/io5'
import { BsFillTelephoneFill } from 'react-icons/bs'
import OTPPageVector from "../components/Icons/svg/otpPageVector";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setPhoneAndHash, setAuth } from "../Redux/Slices/authSlice";
import Cookies from "universal-cookie";




function Login({ config }: any) {
  const cookies = new Cookies();
  const { data: websiteSetting } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getWebsiteSettings(),
  });
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getCategories(),
  });
  const bgimg = "https://res.cloudinary.com/dgyudczza/image/upload/v1678453584/zezo.in/Group_57_xpmwqt.png";




  const { phoneAndHash } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [withEmail, setWithEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedWithEmail, setIsSubmittedWithEmail] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [hash, setHash] = useState("");


  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }
  const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const isFormValid = isValidEmail && isValidPassword;





  const handlePhoneInput = (event: any) => {
    const newValue = event.target.value;
    const regex = /^[0-9\b]+$/; // regular expression that matches only digits and backspace
    if (regex.test(newValue)) {
      setPhone(newValue);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };



  async function signin() {
    setIsSubmitted(true);
    try {
      const { data, status } = await login({ phone });
      if (status === 200) {
        try {
          setHash(data.hash)
          dispatch(setPhoneAndHash({
            phone: data.phone,
            hash: data.hash
          }))
        } catch (error) {
          console.log(error)
        }
        toast.success("OTP sent to your phone number", {
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
      //if login is successfull redirect it to home page
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  }


  async function submitOtp() {
    try {
      const { data, status } = await verifyOTP({ phone: phoneAndHash?.phone, hash: phoneAndHash?.hash, otp: parseInt(otp) });
      if (status === 200) {
        toast.success("OTP verified", {
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
        cookies.set('accessToken', data.data.accessToken)
        cookies.set('refreshToken', data.data.refreshToken)
        dispatch(setAuth({
          user: data.data.user,
          isAuthenticated: true
        }))
        navigate('/')


      }
      //if login is successfull redirect it to home page
    } catch (error: any) {
      toast.error("OTP was invalid or expired." || error.message);
    }
  }


  async function submitWithEmail() {
    try {
      const { data, status } = await loginWithEmail({ email, password});
      if (status === 200) {
        toast.success("Login Sucessfully", {
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
        console.log(data)
        cookies.set('accessToken', data.data.accessToken)
        cookies.set('refreshToken', data.data.refreshToken)
        dispatch(setAuth({
          user: data.data.user,
          isAuthenticated: true
        }))
        navigate('/')


      }
      //if login is successfull redirect it to home page
    } catch (error: any) {
      toast.error("Incorrect Email or Password." || error.message);
    }
  }





  const renderButton = (buttonProps: any) => {
    return (
      <button {...buttonProps} className={`${buttonProps.remainingTime !== 0 ? 'text-white font-extralight' : 'text-green-500 font-extralight'}`}>
        {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec` : "Didn't get.Resend OTP."}
      </button>
    );
  };
  const mobRenderButton = (buttonProps: any) => {
    return (
      <button {...buttonProps} className={`text-[12px] ${buttonProps.remainingTime !== 0 ? 'text-white font-extralight' : 'text-[#2A96FA] font-extralight'}`}>
        {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec` : "RESEND NEW CODE"}
      </button>
    );
  };
  const renderTime = () => React.Fragment;

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
            {
              withEmail ?
                <>
                  <div className="h-[100%] pt-[20%] relative">
                    <div className="text-[31px] text-white font-semibold mb-8">
                      Enter Your <br /> Email Address & Password
                    </div>
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
                        <div className="mb-[30px] text-xs text-red-500 text-center capitalize">
                          <span>Please enter a valid email.</span>
                        </div>
                      )
                    }

                    <div className="text-[19.5px] text-white">
                      <div className="my-auto mb-2">Password:</div>
                      <div
                        className={`px-[18px] flex justify-between bg-[#D9D9D917] py-[5px] border-2 ${isValidPassword || password == ''
                          ? "border-none"
                          : "border-red-500 "
                          }`}
                      >
                        <input
                          className="w-full focus:outline-none placeholder:text-white bg-transparent"
                          autoFocus={false}
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
                          className=" text-gray-600"
                        >
                          {seePassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                      </div>
                    </div>

                    {isValidPassword || password == '' ? null : (
                      <p className="text-red-500 text-xs mb-[20px]">Must be at least 8 characters long, at least one lowercase & uppercase letter, and one number.</p>
                    )}

                    <p className="text-white mt-3">Don't have an account? <Link to={'/register'}><span className="text-[#2A96FA]">Sign up</span></Link></p>


                    <div className="absolute left-0 right-0 bottom-[4%]">
                      <div className="text-center text-white text-[12px] mb-5">
                        By clicking verify, l agree with the <span className="text-[#2A96FA]">Terms & Conditions</span> and <br /> <span className="text-[#2A96FA]">Privacy Policy</span>
                      </div>
                      <div className="flex gap-2">
                        <div onClick={() => setWithEmail(false)} className="my-auto p-2 cursor-pointer bg-[#2A96FA] hover:bg-transparent rounded-full">
                          <BsFillTelephoneFill size={25} color='white' />
                        </div>
                        <div className="text-white my-auto text-xl">Or</div>
                        {
                          !isFormValid ?
                            <button className='bg-gray-600 ripple-bg-gray-600 rounded-xl text-[15px] text-white py-1 font-bold w-full capitalize'>Login</button>
                            :
                            <button onClick={submitWithEmail} className='bg-[#2A96FA] rounded-xl text-[15px] text-white py-1 font-bold w-full capitalize'>Login</button>
                        }
                      </div>
                    </div>
                  </div>
                </>

                :
                <>
                  {isSubmitted ? (
                    <>
                      <div className="h-[100%] relative">
                        <div onClick={() => setIsSubmitted(false)} className="absolute top-[2%] left-0">
                          <IoArrowBackOutline size={40} color='white' />
                        </div>
                        <div className="flex justify-center pt-[20%] mb-[30px]">
                          <OTPPageVector />
                        </div>
                        <div className="text-white text-center text-[18.5px]">
                          We Have Sent an OTP to
                        </div>
                        <div className="text-white text-center text-[16.65px] text-[#FFFFFF66] mb-8">
                          +91 {phone.slice(0, 3)}****{phone.slice(6
                          )}
                        </div>

                        <div className="mb-[30px]">
                          <OTPInput value={otp} className='mx-auto text-center justify-center' inputClassName='bg-white text-black text-xl rounded-full focus:outline-none py-2' inputStyles={{ width: '62px', height: '62px', fontSize: '2rem' }} onChange={setOtp} autoFocus OTPLength={4} otpType="number" disabled={false} />
                        </div>
                      </div>

                      <div className="absolute mx-5 bottom-[5%] left-0 right-0">
                        <div className="mb-[8px] text-[#FFFFFF8A] text-center text-[13.17px]">Didn't you receive any code?</div>
                        <div className="flex justify-center mb-5">
                          <ResendOTP maxTime={2} renderButton={mobRenderButton} renderTime={renderTime} />
                        </div>

                        {otp.length !== 4 ? (
                          <>
                            <button
                              disabled
                              className="bg-gray-600 ripple-bg-gray-600 py-[13px] rounded-xl text-[15px] text-white font-bold w-full capitalize"
                            >
                              Verify
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={submitOtp}
                            className="bg-[#2A96FA] py-[13px] rounded-xl text-[15px] text-white font-bold w-full capitalize"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-[50%] pt-[20%]">
                        <div className="text-[31px] text-white font-semibold">
                          Enter your <br /> mobile number
                        </div>
                        <div className="mt-3 text-white text-[16px] mb-8">
                          We will send you a confirmation code
                        </div>
                        <div className="flex text-[19.5px] text-white">
                          <div className="my-auto mr-2">+91</div>
                          <div
                            className={`px-[18px] bg-[#D9D9D917] py-[5px] border-2 ${(!hasError && phone.length == 0) || phone.length == 10
                              ? "border-none"
                              : "border-red-500 "
                              }`}
                          >
                            <input
                              className="w-full focus:outline-none placeholder:text-white bg-transparent"
                              autoFocus={true}
                              defaultValue={phone}
                              placeholder="Phone Number"
                              onChange={handlePhoneInput}
                              type="numbers"
                              min="0"
                              max="10"
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                        {hasError ? (
                          <div className="text-red-500 text-center capitalize">
                            <span>Please enter a valid number.</span>
                          </div>
                        ) : (
                          <div className=""></div>
                        )}
                      </div>
                      <div className="mx-auto h-[50%] relative">
                        <div className="absolute left-0 right-0 bottom-[10%]">
                          <div className="text-center text-white text-[12px] mb-5">
                            By clicking verify, l agree with the <span className="text-[#2A96FA]">Terms & Conditions</span> and <br /> <span className="text-[#2A96FA]">Privacy Policy</span>
                          </div>
                          <div className="flex gap-2">
                            <div onClick={() => setWithEmail(true)} className="my-auto p-2 cursor-pointer bg-[#2A96FA] hover:bg-transparent rounded-full">
                              <IoMail size={30} color='white' />
                            </div>
                            <div className="text-white my-auto text-xl">Or</div>
                            {
                              phone.length !== 10 ?
                                <button className='bg-gray-600 ripple-bg-gray-600 rounded-xl text-[15px] text-white py-1 font-bold w-full capitalize'>verify</button>
                                :
                                <button onClick={signin} className='bg-[#2A96FA] rounded-xl text-[15px] text-white py-1 font-bold w-full capitalize'>verify</button>
                            }
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
            }

          </div>
        </div>
      </div>






      {/* Code for Tab and Laptop */}
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
                  {
                    withEmail ?
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
                              <div className="mb-[10px] rounded-xl px-[18px] py-[16px] border-gray-500 relative bg-[#D9D9D917] border-2">
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

                              <div className="mb-[30px]">

                                {!isValidPassword ? (
                                  <button
                                    disabled
                                    className="bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                                  >
                                    LOGIN
                                  </button>
                                ) : (
                                  <button
                                    onClick={submitWithEmail}
                                    className="bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                                  >
                                    LOGIN
                                  </button>
                                )}
                              </div>
                              <div className="flex justify-between gap-2">
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                                <div className="my-auto text-[20px] text-gray-400">or</div>
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                              </div>



                              <div className="text-[#2A96FA] text-center font-semibold cursor-pointer mt-[20px] mb-[40px]" onClick={() => setWithEmail(false)}>Login with Phone</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="pt-[87.4px] font-semibold leading-tight text-[36px]  mb-[16px] text-center">
                              Sign in
                              <div className="mx-auto rounded-full mt-[4.34px] h-[5px] w-[28px] bg-[#2A96FA]"></div>
                            </div>
                            <div className="text-center text-[16px] mb-[42px]">
                              <p className="text-white mt-3">Don't have an account? <Link to={'/register'}><span className="text-[#2A96FA]">Sign up</span></Link></p>
                            </div>

                            <div className="w-[75%]  mx-auto">
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
                              {isValidEmail || email == '' ? (
                                <div className="mb-[30px]"></div>
                              ) :
                                (
                                  <div className="mb-[30px] text-red-500 text-center capitalize">
                                    <span>Please enter a valid email.</span>
                                  </div>
                                )
                              }
                              <div className="mb-[30px]">
                                {
                                  !isValidEmail ?
                                    <button disabled className='bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Continue with Email</button>
                                    :
                                    <button onClick={()=>setIsSubmittedWithEmail(true)} className='bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Continue with Email</button>
                                }
                              </div>
                              <div className="flex justify-between gap-2">
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                                <div className="my-auto text-[20px] text-gray-400">or</div>
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                              </div>

                              <div className="text-[#2A96FA] text-center font-semibold cursor-pointer mt-[20px] mb-[40px]" onClick={() => setWithEmail(false)}>Login with Phone</div>
                            </div>
                          </>
                        )}
                      </div>
                      :
                      <div className="m-auto bg-[rgba(0,0,0,0.7)] border rounded-lg w-[76%]">
                        {isSubmitted ? (
                          <>
                            <div className="pt-[48px] font-semibold leading-tight text-[36px]  mb-[16px] text-center">
                              OTP
                              <div className="mx-auto rounded-full mt-[4.34px] h-[5px] w-[28px] bg-[#2A96FA]"></div>
                            </div>
                            <div className="text-center text-[16px] mb-[42px]">
                              Check your XX{phone.slice(8)} this number and put the 4 digit code here
                              <div className="mt-2">{phone} isn't your number? <button onClick={() => setIsSubmitted(false)} className="text-[#2A96FA]">Edit</button></div>
                            </div>
                            <div className="w-[75%]  mx-auto">
                              <div className="mb-[30px]">
                                <OTPInput value={otp} className='mx-auto text-center justify-center' inputClassName='bg-black text-white text-xl border border-[#969696] border-2 rounded focus:outline-none py-2' inputStyles={{ width: '3rem', height: '3rem', fontSize: '2rem' }} onChange={setOtp} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                <div className="flex justify-end mt-2">
                                  <ResendOTP maxTime={2} renderButton={renderButton} renderTime={renderTime} />
                                </div>


                              </div>

                              <div className="mb-[30px] flex justify-between gap-5">
                                <button
                                  onClick={() => setIsSubmitted(false)}
                                  className="bg-transparent rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                                >
                                  Back
                                </button>

                                {otp.length !== 4 ? (
                                  <>
                                    <button
                                      disabled
                                      className="bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                                    >
                                      Proceed
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={submitOtp}
                                    className="bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full"
                                  >
                                    Proceed
                                  </button>
                                )}
                              </div>
                              <div className="flex justify-between gap-2">
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                                <div className="my-auto text-[20px] text-gray-400">or</div>
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                              </div>



                              <div onClick={() => setWithEmail(true)} className="text-[#2A96FA] text-center font-semibold cursor-pointer mt-[20px] mb-[40px]">Login with Email</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="pt-[87.4px] font-semibold leading-tight text-[36px]  mb-[16px] text-center">
                              Sign in
                              <div className="mx-auto rounded-full mt-[4.34px] h-[5px] w-[28px] bg-[#2A96FA]"></div>
                            </div>
                            <div className="text-center text-[16px] mb-[42px]">
                              It's EASY! Just provide your phone number & follow.
                            </div>

                            <div className="w-[75%]  mx-auto">
                              <div
                                className={`rounded-xl px-[18px] py-[16px] border-2 ${(!hasError && phone.length == 0) || phone.length == 10
                                  ? "border-[#C7C7C76E]"
                                  : "border-red-500 "
                                  } text-[19.5px]`}
                              >
                                <input
                                  className="w-full focus:outline-none placeholder:text-white bg-transparent"
                                  autoFocus={true}
                                  defaultValue={phone}
                                  placeholder="Phone Number"
                                  onChange={handlePhoneInput}
                                  type="numbers"
                                  min="0"
                                  max="10"
                                  name=""
                                  id=""
                                />
                              </div>
                              {hasError ? (
                                <div className="mb-[30px] text-red-500 text-center capitalize">
                                  <span>Please enter a valid number.</span>
                                </div>
                              ) : (
                                <div className="mb-[30px]"></div>
                              )}
                              <div className="mb-[30px]">
                                {
                                  phone.length !== 10 ?
                                    <button disabled className='bg-gray-600 rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Verify</button>
                                    :
                                    <button onClick={signin} className='bg-[#2A96FA] rounded-xl border-2 text-[20.64px] py-[15px] font-bold w-full'>Verify</button>
                                }
                              </div>
                              <div className="flex justify-between gap-2">
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                                <div className="my-auto text-[20px] text-gray-400">or</div>
                                <div className="bg-gray-400 h-[2px] w-full my-auto"></div>
                              </div>

                              <div onClick={() => setWithEmail(true)} className="text-[#2A96FA] text-center font-semibold cursor-pointer mt-[20px] mb-[40px]">Login with Email</div>
                            </div>
                          </>
                        )}
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default Login;
