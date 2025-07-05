
const FormInput = ({label,htmlFor,type,register,error,placeholder}) => {
    return (
        <div>
            <label htmlFor={htmlFor}>{label}</label>
            <input id={htmlFor} type={type} {...register} placeholder={placeholder}/>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    )
}

export default FormInput