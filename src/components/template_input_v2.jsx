const TemplateInputV2 = ({name, subName, value, typeInput, disabled, onChange}) => {
    return (
        <div className="w-full flex flex-col md:flex-row items-center md:space-x-3">
            <p className="font-semibold w-full md:text-end">{name} <span className="font-normal">{subName}</span></p>
            <input type={typeInput} value={value} onChange={onChange} className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm" disabled={disabled} />
        </div>
    )
}

export default TemplateInputV2