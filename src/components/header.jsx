const Header = ({ children }) => {
    return (
        <div className="sticky top-0 z-50 w-full bg-blue-500">
            <div className="w-full h-14 lg:rounded-tl-full bg-custom-yellow flex items-center justify-between px-5 md:px-10 font-semibold">
                {children}
            </div>
        </div>
    )
}

export default Header