import React from 'react'

interface CustomInputProps {
    type: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name: string;
    className: string;
}

const CustomInput = (props: CustomInputProps) => {
    const { type, placeholder, onChange, value, name, className } = props

    return (
        <div>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={`${className}`}
            />
        </div>

    )
}

export default CustomInput
