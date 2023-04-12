import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

interface IFooterProps {
  settings: IWebsiteSettingsData | undefined;
}

const Footer = ({ settings }: IFooterProps): JSX.Element => {
  return (
    <>
      <div className="bg-[#131A22] mt-[85px]">
        <div className="container m-auto py-[45px] lg:py-[64px]">
          <div className="mb-[17.24px] lg:mb-[24.52px]">
            <h1 className="capitalize text-center text-[26.37px] lg:text-[37.08px] mb-[27.32px] lg:mb-[38.68px] text-[#2A96FA]">
              millions of movies and web series on your finger tips
            </h1>

            <h3 className="text-center text-[12.45px] lg:text-[17.51px] w-[457px] lg:w-[643px] mx-auto text-white">
              Stay in tune with us and you won't miss a thing! Don't worry, we
              don't spam. You can opt out any time.
            </h3>
          </div>

          <div className="mx-auto flex justify-center mb-[9px] lg:mb-[14px]">
            <input
              placeholder="abc*******xyz@gmail.com"
              type={"email"}
              className="placeholder-[#5D5D5D] px-[14px] bg-[#DEDEDE] placeholder:text-[7.43px] lg:placeholder:text-base focus:outline-none"
            />
            <button className="lg:w-[144.21px] w-[102.55px] h-[27.1px] lg:h-[38.11px] flex justify-center bg-[#2A96FA]">
              <div className="text-[9.62px] lg:text-[13.53px] my-auto text-center mx-auto flex uppercase text-white font-semibold">
                Submit now
                <svg
                  className="lg:w-[9px] w-[4.76px] lg:ml-[9px] ml-[6.32px] h-[10px] fill-none my-auto"
                  viewBox="0 0 9 10"
                >
                  <path
                    fill="#fff"
                    stroke="#fff"
                    d="M7.797 4.963L1.7.743a.206.206 0 00-.323.17v7.502c0 .156.166.255.303.181l6.096-3.282a.206.206 0 00.02-.35z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#1C1C1C87]">
        <div className="container m-auto">
          <div className="grid grid-cols-6 mx-10 lg:pt-[80px] pt-[57.29px] pb-[83px] lg:pb-[121.3px]">
            <div className="col-span-2">
              <div className="h-[25.93px] lg:h-[36.46px] w-[61.87px] lg:w-[87px] mb-[24.85px] lg:mb-[35px]">
                <Logo src={settings?.logo} />
              </div>
              <div className="w-[203px] lg:w-[286px] text-[7.83px] lg:text-[11.01px] text-white mb-[17.6px]">
                Galaxy Entertainment is where we seek to inform, empower and
                inspire the world! We have a clear vision to redesign the way
                Indian Cinema functions, in all major and minor departments.
              </div>
              <div className="flex gap-2 lg:gap-5 mb-[29.34px]">
                <Link to={"/"}>
                  <img
                    className="h-[22.76px] lg:h-[32px] w-[70px] lg:w-[100px]"
                    src="https://res.cloudinary.com/dgyudczza/image/upload/v1678261334/zezo.in/Download_on_the_App_Store_Badge.svg_uwiplm.png"
                  />
                </Link>
                <Link to={"/"}>
                  <img
                    className="h-[22.76px] lg:h-[32px] w-[70px] lg:w-[100px]"
                    src="https://res.cloudinary.com/dgyudczza/image/upload/v1678261147/zezo.in/Google_Play_Store_badge_EN.svg_nwjd7r.png"
                  />
                </Link>
              </div>

              <div className="flex gap-1 lg:gap-2">
                {settings?.social_links?.map((social: any, index: number) => {
                  if (social.status) {
                    return (
                      <div key={index}>
                        <a
                          href={`${social.href}`}
                          target={social.newTab ? "_blank" : "_self"}
                          rel="noreferrer"
                        >
                          <img className="lg:w-10 lg:h-10 w-8 h-8" src={social.icon} alt="" />
                        </a>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="col-span-1">
              <div className="font-bold mt-5 text-white text-[11.69px] lg:text-[16.44px] mb-[8.81px]">
                COMPANY
              </div>
              {settings?.webSettings?.footer?.menu?.map(
                (link: any, index: number) => {
                  if (index < 4) {
                    return (
                      <div
                        key={index}
                        className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#2A96FA] text-gray-400 lg:text-[16.51px] font-extralight text-[8.6px]`}
                      >
                        <Link to={`/${link.link}`}>{link.name}</Link>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>

            <div className="col-span-1">
              <div className="font-bold mt-5 text-white text-[11.69px] lg:text-[16.44px] mb-[8.81px]">
              HELP CENTRE
              </div>
              {settings?.webSettings?.footer?.menu?.map(
                (link: any, index: number) => {
                  if (index > 4 && index < 9) {
                    return (
                      <div
                        key={index}
                        className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#2A96FA] text-gray-400 lg:text-[16.51px] font-extralight text-[8.6px]`}
                      >
                        <Link to={`/${link.link}`}>{link.name}</Link>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>

            <div className="col-span-1">
              <div className="font-bold mt-5 text-white text-[11.69px] lg:text-[16.44px] mb-[8.81px]">
              CONNECT
              </div>
              {settings?.webSettings?.footer?.menu?.map(
                (link: any, index: number) => {
                  if (index > 8) {
                    return (
                      <div
                        key={index}
                        className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#2A96FA] text-gray-400 lg:text-[16.51px] font-extralight text-[8.6px]`}
                      >
                        <Link to={`/${link.link}`}>{link.name}</Link>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>

            <div className="col-span-1">
              <div className="font-bold mt-5 text-white text-[11.69px] lg:text-[16.44px] mb-[8.81px]">
              CONTENT
              </div>
              {settings?.webSettings?.footer?.menu?.map(
                (link: any, index: number) => {
                  if (index > 10) {
                    return (
                      <div
                        key={index}
                        className={`mb-[8.81px] cursor-pointer w-fit hover:text-[#2A96FA] text-gray-400 lg:text-[16.51px] font-extralight text-[8.6px]`}
                      >
                        <Link to={`/${link.link}`}>{link.name}</Link>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </div>
          </div>
          <div className="text-center text-white text-[10.86px] lg:text-[15.27px] pb-[10px] lg:pb-[16px]">
            {settings?.copy_right_text} powered by{" "}
            <Link to={"https://zezosoft.com/"}>Zezo</Link>.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
