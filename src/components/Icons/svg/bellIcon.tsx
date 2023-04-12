import React from "react";

interface ICompassIconProps {
    width?: number | undefined,
    color?: string | undefined,
}
const BellIcon = ({ width, color }: ICompassIconProps): JSX.Element => {
    return (
        <svg
            width="34"
            height="35"
            fill="none"
            viewBox="0 0 34 35"
        >
            <g clipPath="url(#clip0_4_62)">
                <path
                    fill="#FAFAFA"
                    d="M17.089 31.25a2.82 2.82 0 002.812-2.813h-5.625a2.812 2.812 0 002.813 2.813zm8.437-8.438v-7.03c0-4.318-2.306-7.932-6.328-8.888v-.957c0-1.167-.942-2.109-2.11-2.109-1.166 0-2.109.942-2.109 2.11v.956c-4.035.956-6.328 4.556-6.328 8.887v7.031l-1.814 1.815c-.886.886-.267 2.404.985 2.404h18.52c1.252 0 1.884-1.518.998-2.404l-1.814-1.814z"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0_4_62">
                    <path
                        fill="#fff"
                        d="M0 0H33.75V33.75H0z"
                        transform="translate(.214 .312)"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    )
}
export default BellIcon;
