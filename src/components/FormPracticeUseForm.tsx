"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/common/CustomInput";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const FormPracticeUseForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        clearErrors,
        reset, // Add reset to your hook
    } = useForm<FormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form submitted successfully:", data);

        // Reset the form after submission
        reset(); // This will clear the form

        clearErrors();
    };

    const validatePasswordMatch = (value: string) => {
        const password = watch("password");
        if (password !== value) {
            return "Passwords must match";
        }
        return true;
    };

    return (
        <div className="flex py-20 justify-center items-center">
            <div className="container px-4">
                <div className="max-w-[600px] mx-auto w-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 shadow-lg p-10 rounded-lg"
                    >
                        <span className="font-semibold text-center text-xl text-gray-600">FORM</span>

                        <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: "First name is required" }}
                            render={({ field }) => (
                                <>
                                    <CustomInput
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="rounded-lg w-full text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"
                                        {...field}
                                    />
                                    {errors.firstName && (
                                        <span className="text-red-500">{errors.firstName.message}</span>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: "Last name is required" }}
                            render={({ field }) => (
                                <>
                                    <CustomInput
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="rounded-lg w-full text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"
                                        {...field}
                                    />
                                    {errors.lastName && (
                                        <span className="text-red-500">{errors.lastName.message}</span>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: "Email must be like Example@gmail.com",
                                },
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomInput
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-lg w-full text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"
                                        {...field}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500">{errors.email.message}</span>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomInput
                                        type="password"
                                        placeholder="Enter your password"
                                        className="rounded-lg w-full text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"
                                        {...field}
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">{errors.password.message}</span>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: "Confirm password is required",
                                validate: validatePasswordMatch,
                            }}
                            render={({ field }) => (
                                <>
                                    <CustomInput
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="rounded-lg w-full text-gray-600 placeholder:text-gray-600 placeholder:opacity-100 p-2 border outline-none  border-black"
                                        {...field}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                                    )}
                                </>
                            )}
                        />

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
