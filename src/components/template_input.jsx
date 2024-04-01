const TemplateInput = ({ name, subName, value, typeInput, disabled, onChange, placeholder }) => {
    return (
        <div className="w-full flex flex-col text-sm">
            <p className="font-semibold">{name} <span className="font-normal">{subName}</span></p>
            <input
                type={typeInput}
                value={value} onChange={onChange} placeholder={placeholder ?? ''}
                className="outline-none border-2 px-3 py-2 rounded-md focus:border-yellow-400 w-full text-sm font-normal" disabled={disabled} />
        </div>
    )
}

export default TemplateInput