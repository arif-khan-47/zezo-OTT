import React from "react";

interface IHomeIconProps {
    width: number | undefined,
    color: string | undefined,
}
const Home = ({ width, color }: IHomeIconProps): JSX.Element => {
    return (
        <svg className={`w-[${width}px] fill-[${color}]`} viewBox="0 0 21 20">
           <path fill={color} d="M18.41 4.39L12.126.566a3.906 3.906 0 00-4.048 0L1.796 4.391a3.812 3.812 0 00-1.74 3.89l1.623 8.527C1.936 18.274 4.047 20 5.55 20h9.102c1.505 0 3.616-1.73 3.874-3.195l1.621-8.527a3.809 3.809 0 00-1.736-3.887zm-7.33 12.675a.98.98 0 11-1.958 0v-4.63a.98.98 0 111.959 0v4.63z"></path>
           </svg>
    )
}
export default Home;