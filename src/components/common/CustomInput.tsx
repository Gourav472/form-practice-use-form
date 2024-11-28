import React from 'react'

interface CustomInputProps {
    type: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name: string;
}

const CustomInput = (props: CustomInputProps) => {
    const { type, placeholder, onChange, value, name } = props

    return (
        <div>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className="rounded-lg w-full mt-4 mb-1 text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"   />
        </div>

    )
}

export default CustomInput
