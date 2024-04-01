const TemplateText = ({ name, value, width, upperCase }) => {
    return (
        <div className="flex flex-col md:items-center md:flex-row md:space-x-3 text-sm">
            <p className={`font-semibold flex items-center ${width === undefined ? 'w-56' : width}`}><span>{name}</span> <span className="md:hidden">:</span></p>
            <p className="md:space-x-2 flex items-center w-full md:w-fit">
                <span className="hidden md:block font-semibold">:</span>
                <span className={`${upperCase !== true ? '' : 'uppercase' } px-3 py-2 border-2 md:border-0 rounded-md w-full`}>{value}</span>
            </p>
        </div>
    )
}

export default TemplateText