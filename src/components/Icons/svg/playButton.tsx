import React from "react";

interface ICompassIconProps {
    width: number | undefined,
    color: string | undefined,
}
const PlayButton = (className: any): JSX.Element => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="99"
            fill="none"
            viewBox="0 0 98 99"
        >
            <path
                fill="#2A96FA"
                stroke="#2A96FA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="7.055"
                d="M49.075 94.569c24.894 0 45.075-20.18 45.075-45.075 0-24.894-20.18-45.075-45.075-45.075C24.181 4.419 4 24.599 4 49.494c0 24.894 20.18 45.075 45.075 45.075z"
            ></path>
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5.095"
                d="M40.06 31.464l27.045 18.03-27.045 18.03v-36.06z"
            ></path>
        </svg>
    )
}
export default PlayButton;
