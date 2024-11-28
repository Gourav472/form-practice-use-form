"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormPracticeUseForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
    setValue,
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
    setSubmittedData(data); 
    reset(); 
    clearErrors();
  };

  const validatePasswordMatch = (value: string) => {
    const password = watch("password");
    if (password !== value) {
      return "Passwords must match";
    }
    return true;
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (submittedData) {
      setValue("firstName", submittedData.firstName);
      setValue("lastName", submittedData.lastName);
      setValue("email", submittedData.email);
      setValue("password", submittedData.password);
      setValue("confirmPassword", submittedData.confirmPassword);
    }
  };

  const handleDelete = () => {
    setSubmittedData(null);
    reset();
    clearErrors();
  };

  return (
    <div className="flex py-20 justify-center items-center">
      <div className="container px-4">
        <div className="max-w-[600px] mx-auto w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col shadow-lg p-10 rounded-lg"
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
                    {...field}
                    disabled={!isEditing} 
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
                    {...field}
                    disabled={!isEditing} 
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
                    {...field}
                    disabled={!isEditing} 
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
                    {...field}
                    disabled={!isEditing} 
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
                    {...field}
                    disabled={!isEditing} 
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
              {isEditing ? "Save" : "Confirm"}
            </button>
          </form>

          {submittedData && (
            <div className="mt-10">
              <div className="flex justify-between gap-5 items-center">
                <h2 className="text-xl font-semibold text-gray-700">Submitted Data:</h2>
                <div className="flex items-center gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-xl"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-xl"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <table className="min-w-full mt-4 border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-gray-600">Field</th>
                    <th className="px-4 py-2 text-left text-gray-600">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600">First Name</td>
                    <td className="px-4 py-2 text-gray-600">{submittedData.firstName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600">Last Name</td>
                    <td className="px-4 py-2 text-gray-600">{submittedData.lastName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600">Email</td>
                    <td className="px-4 py-2 text-gray-600">{submittedData.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600">Password</td>
                    <td className="px-4 py-2 text-gray-600">{submittedData.password}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600">Confirmed Password</td>
                    <td className="px-4 py-2 text-gray-600">{submittedData.confirmPassword}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPracticeUseForm;
