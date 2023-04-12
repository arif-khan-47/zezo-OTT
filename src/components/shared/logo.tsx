import { Link } from "react-router-dom"

interface ILogoProps {
    src: string | undefined
}
const Logo = ({ src }: ILogoProps): JSX.Element => {
    return (
        <div className="h-full flex justify-center items-center">
            <Link to={"/"}>
                <img
                    src={src}
                    alt="logo"
                    className="w-40 object-contain"
                />
            </Link>
        </div>

    )
}

export default Logo