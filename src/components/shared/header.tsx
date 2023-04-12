import React, { useState } from "react";
import { Link } from "react-router-dom";
import BellIcon from "../../components/Icons/svg/bellIcon"
import HomeIcon from "./../../assets/icons/home_icon.svg";
import SearchIcon from "../../assets/icons/search.svg";
// import BellIcon from "../../assets/icons/bell_icon.svg";
import MenuBarIcon from "../../assets/icons/menu_bar.svg";

import Logo from "./logo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiUserCircle } from "react-icons/hi";

interface IHeaderProps {
  settings: IWebsiteSettingsData | undefined;
  data: any | IGetCategoriesData | undefined;
}



const Header = ({ settings, data }: IHeaderProps): JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);


  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden sm:block">
        <div className="lg:h-20 h-[60px] bg-gradient-to-b from-black grid grid-flow-col grid-cols-12 items-center z-20">
          <div className="col-span-2 z-20 h-full flex lg:pl-10 p-5 mx-auto lg:mx-0">
            <Logo src={settings?.logo} />
          </div>
          <div className="col-span-6 z-20 h-full flex items-center">
            <Link to={"/"}>
              <img className="lg:h-8 lg:w-8 h-6 w-6 cursor-pointer" src={HomeIcon} />
            </Link>

            {/* Code for laptop size  */}
            <div className="lg:block hidden z-20">
              <div className="flex gap-8 ml-12">
                {data && data.slice(0, 4).map((item: any, index:number) => {
                  return (
                    <Link key={index} to={`/${item.slug}`}>
                      <p
                        className="text-white text-base opacity-90 hover:text-[#2A96FA]"
                        style={{ fontWeight: 500 }}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}

                {data && data.slice(4) ? (
                  <div
                    className={`text-white text-base opacity-90 cursor-pointer flex gap-1 relative hover:text-[#2A96FA]`}
                    onMouseOver={() => setOpen(true)}
                    onMouseOut={() => setOpen(false)}
                    style={{ fontWeight: 500 }}
                  >
                    Others
                    <svg
                      className="w-5 my-auto stroke-white fill-white"
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M903.232 256L960 306.432 512 768 64 306.432 120.768 256 512 659.072z"></path>
                    </svg>
                    <div className="absolute pt-10">
                      <div
                        className={`w-56 py-1 bg-black rounded-xl shadow-inner shadow-white ${open ? "" : "hidden"
                          }`}
                      >
                        {data && data.slice(4).map((item:any, index:number) => {
                          return (
                            <div key={index} className="m-5">
                              <Link key={index} to={`/${item.slug}`}>
                                <p
                                  className={`text-white text-base opacity-90 hover:text-[#2A96FA]`}
                                  style={{ fontWeight: 500 }}
                                >
                                  {item.name}
                                </p>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}

              </div>
            </div>

            {/* Code for tablet size  */}
            <div className="lg:hidden z-20">
              <div className="flex gap-8 ml-12">
                {data && data.slice(0, 2).map((item:any, index:number) => {
                  return (
                    <Link key={index} to={`/${item.slug}`}>
                      <p
                        className="text-white text-base opacity-90 hover:text-[#2A96FA]"
                        style={{ fontWeight: 500 }}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}

                {data && data.slice(2) ? (
                  <div
                    className={`text-white text-base opacity-90 cursor-pointer flex gap-1 relative hover:text-[#2A96FA] z-10`}
                    onClick={() => setOpen(!open)}
                    style={{ fontWeight: 500 }}
                  >
                    Others
                    <svg
                      className="w-5 my-auto stroke-white fill-white"
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M903.232 256L960 306.432 512 768 64 306.432 120.768 256 512 659.072z"></path>
                    </svg>
                    <div className="absolute pt-8">
                      <div
                        className={`w-56 py-1 bg-black rounded-xl shadow-inner shadow-white ${open ? "" : "hidden"
                          }`}
                      >
                        {data && data.slice(2)
                          .map((item:any, index:number) => {
                            return (
                              <div key={index} className="m-5">
                                <Link to={`/${item.slug}`}>
                                  <p
                                    className={`text-white text-base opacity-90 hover:text-[#2A96FA]`}
                                    style={{ fontWeight: 500 }}
                                  >
                                    {item.name}
                                  </p>
                                </Link>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ) : null}

              </div>
            </div>


          </div>
          <div className="col-span-4 h-full flex lg:gap-10 gap-3 items-center justify-end lg:pr-10 pr-5  z-20">
            <Link to={"/search"}>
              <img className="lg:h-6 lg:w-6 h-[17.03px] w-[17.03px] cursor-pointer" src={SearchIcon} />
            </Link>
            <Link
              to={"/"}
              className="bg-[#2A2620] py-0.5 px-3 rounded-full border-[#2A96FA] border border-opacity-30"
            >
              <p className="text-white text-[12px] lg:text-base">GO AD-FREE</p>
            </Link>
            <Link to={"/"}>
              {/* <img className="lg:h-7 lg:w-7 h-[19.5px] w-[15.17px] cursor-pointer" src={BellIcon} /> */}
              <BellIcon/>
            </Link>
            {
              isAuthenticated ?
                <Link to={'/profile'}>
                  <HiUserCircle className="text-white h-8 w-8 lg:h-10 lg:w-10" />
                </Link>
                :
                <Link to={"/login"} className="py-0.5 lg:px-4">
                  <p className={`text-white font-semibold text-[14px] lg:text-base`}>Login</p>
                </Link>
            }
            <Link to={"/"}>
              <img className="lg:h-7 lg:w-7 h-[24px] w-[24px] cursor-pointer" src={MenuBarIcon} />
            </Link>
          </div>
        </div>
      </div>





      {/* Code for Mobile size  */}
      <div className="sm:hidden py-2 bg-black">
        <div className="flex px-5 justify-between h-10">
          <div className="h-8 w-16 relative my-auto">
            <Logo src={settings?.logo} />
          </div>
          <div className="my-auto">
            <Link to={"/search"}>
              <img className="h-6 w-6 cursor-pointer" src={SearchIcon} />
            </Link>
          </div>
        </div>
        <div className="my-3">
          <div className="flex overflow-x-auto my-2 pl-5">
            <div className="flex-shrink-0 whitespace-nowrap">
              {
                data && data.map((item: any, index: number) => {
                  return (

                    <Link to={`/${item.slug}`} className='w-fit' key={index}>
                      <button className="px-4 py-2 bg-gradient-to-l from-[#1F1F1F] to-[#0B0B0B] border border-[#202020] text-[12.69px] text-white rounded-lg mr-2">
                        {item.name}
                      </button>
                    </Link>

                  );
                })
              }
            </div>
          </div>
        </div>


      </div>
    </>

  );
};

export default Header;
