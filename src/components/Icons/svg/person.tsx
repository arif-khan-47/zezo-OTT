import React from "react";

interface IPersonIconProps {
    width: number | undefined,
    color: string | undefined,
}
const Person = ({ width, color }: IPersonIconProps): JSX.Element => {
    return (
        <svg className={`w-[${width}px] fill-none`} viewBox="0 0 20 22">
            <path fill={color} d="M18.747 20.65v-2.132a4.265 4.265 0 00-4.265-4.265h-8.53a4.265 4.265 0 00-4.265 4.265v2.133"></path><path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.133" d="M18.747 20.65v-2.132a4.265 4.265 0 00-4.265-4.265h-8.53a4.265 4.265 0 00-4.265 4.265v2.133h17.06z"></path><path fill={color} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.133" d="M10.217 9.988a4.265 4.265 0 100-8.53 4.265 4.265 0 000 8.53z"></path>
        </svg>
    )
}
export default Person;