interface ITitleProps {
    children: string,
    className?: string,
    style?: Object,
}

const Title = ({ children, className, style }: ITitleProps): JSX.Element => {
    return (
        <>
            <span className={`text-white font-semibold text-lg ${className}`}>{children}</span>
        </>
    )
}

export default Title;