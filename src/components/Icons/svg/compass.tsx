import React from "react";

interface ICompassIconProps {
    width: number | undefined,
    color: string | undefined,
}
const Compass = ({ width, color }: ICompassIconProps): JSX.Element => {
    return (
        <svg className={`w-[${width}px] fill-[${color}]`} viewBox="0 0 22 22">
        <path fill={color} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.919" d="M11.217 20.65a9.596 9.596 0 100-19.192 9.596 9.596 0 100 19.193z"></path><path fill="#1C1C1C" stroke="#1C1C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.01" d="M14.567 8.024l-1.722 5.164-5.164 1.72 1.722-5.163 5.164-1.721z"></path></svg>
    )
}
export default Compass;
