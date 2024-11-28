"use client";
import React, { useState } from "react";
import CustomInput from "@/common/CustomInput";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type FormErrors = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const FormPracticeUseForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name as keyof FormData, value);
    };

    const validateField = (name: keyof FormData, value: string) => {
        const newErrors: FormErrors = { ...errors };
        let isValid = true;

        switch (name) {
            case "firstName":
                newErrors.firstName = value ? "" : "First name is required";
                isValid = value.length > 0;
                break;
            case "lastName":
                newErrors.lastName = value ? "" : "Last name is required";
                isValid = value.length > 0;
                break;
            case "email":
                if (!value) {
                    newErrors.email = "Email is required";
                    isValid = false;
                } else if (!value.includes("@gmail.com")) {
                    newErrors.email = "Email must be like Example@gmail.com";
                    isValid = false;
                } else {
                    newErrors.email = "";
                }
                break;
            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                    isValid = false;
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                    isValid = false;
                } else {
                    newErrors.password = "";
                }
                break;
            case "confirmPassword":
                if (!value) {
                    newErrors.confirmPassword = "Confirm password is required";
                    isValid = false;
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = "Passwords must match";
                    isValid = false;
                } else {
                    newErrors.confirmPassword = "";
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateForm = () => {
        const newErrors: FormErrors = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
        let isValid = true;
    
        Object.keys(formData).forEach((field) => {
            const key = field as keyof FormData;
            const value = formData[key];
    
            switch (key) {
                case "firstName":
                    newErrors.firstName = value ? "" : "First name is required";
                    if (!value) isValid = false;
                    break;
                case "lastName":
                    newErrors.lastName = value ? "" : "Last name is required";
                    if (!value) isValid = false;
                    break;
                case "email":
                    if (!value) {
                        newErrors.email = "Email is required";
                        isValid = false;
                    } else if (!value.includes("@gmail.com")) {
                        newErrors.email = "Email must be like Example@gmail.com";
                        isValid = false;
                    }
                    break;
                case "password":
                    if (!value) {
                        newErrors.password = "Password is required";
                        isValid = false;
                    } else if (value.length < 8) {
                        newErrors.password = "Password must be at least 8 characters";
                        isValid = false;
                    }
                    break;
                case "confirmPassword":
                    if (!value) {
                        newErrors.confirmPassword = "Confirm password is required";
                        isValid = false;
                    } else if (value !== formData.password) {
                        newErrors.confirmPassword = "Passwords must match";
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
        });
    
        setErrors(newErrors); 
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (validateForm()) {
            console.log("Form submitted successfully:\n: ", formData);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setErrors({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } else {
            console.log("Form has errors:", errors);
        }
    };
    

    return (
        <div className="flex py-20 justify-center items-center">
            <div className="container px-4">
                <div className="max-w-[600px] mx-auto w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 shadow-lg p-10 rounded-lg">
                        <span className="font-semibold text-center text-xl text-gray-600">FORM</span>

                        <CustomInput
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                           
                        />
                        {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}

                        <CustomInput
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}

                        <CustomInput
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}

                        <CustomInput
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                        <CustomInput
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 max-w-[100px] mx-auto flex justify-center px-6 rounded hover:bg-blue-700"
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormPracticeUseForm;
