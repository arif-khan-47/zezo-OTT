import React from "react";

interface IHeartIconProps {
    width: number | undefined,
    color: string | undefined,
}
const Heart = ({ width, color }: IHeartIconProps): JSX.Element => {
    return (
        <svg 
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 23 21"
    >
      <path
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.938"
        d="M19.817 3.043a5.332 5.332 0 00-7.54 0L11.25 4.07l-1.028-1.027a5.332 5.332 0 00-7.54 7.54L3.71 11.61l7.54 7.54 7.541-7.54 1.027-1.027a5.33 5.33 0 000-7.54z"
      ></path>
    </svg>
    )
}
export default Heart;