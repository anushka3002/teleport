"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/progressBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleFormDataAction } from "@/app/api/register/route";
import { toast } from "react-toastify";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  address: z
    .string()
    .min(1, "Street address is required")
    .max(100, "Street address cannot exceed 100 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City cannot exceed 50 characters"),
  state: z
    .string()
    .min(1, "State / Province is required")
    .max(50, "State / Province cannot exceed 50 characters"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{6}$/, "Invalid Postal code"),
});

const Step1 = () => {

  const { getSingleFormData,loading } = useSelector(state => state.getSingleFormData)
  const dispatch = useDispatch()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("personalFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (const key in parsedData) {
        setValue(key, parsedData[key]);
      }
    }
  }, [setValue]);

  useEffect(() => {
    const saveData = () => {
      const currentData = getValues();
      localStorage.setItem("emailId", JSON.stringify(currentData.email));
      localStorage.setItem("personalFormData", JSON.stringify(currentData));
    };

    window.addEventListener("beforeunload", saveData);
    return () => {
      window.removeEventListener("beforeunload", saveData);
    };
  }, [getValues]);
  const notifyF = () => toast.error('Email already exists')

  const onSubmit = async (data) => {
    const currentData = getValues();
    const response = await dispatch(getSingleFormDataAction(currentData.email));
    if (response?.data?.emailId == currentData.email) {
      notifyF()
    } else {
      localStorage.setItem("emailId", JSON.stringify(currentData.email));
      localStorage.setItem("personalFormData", JSON.stringify(currentData));
      router.push("/register/step2");
    }
  };

  return (
    <div className="p-4">
      <ProgressBar currentStep={1} />
      <form
        className="border w-[96%] md:w-[80%] lg:w-[45%] mx-auto p-6 rounded-lg mt-4 bg-white shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First name</label>
            <input
              {...register("firstName")}
              className="border p-2 rounded w-full"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Last name</label>
            <input
              {...register("lastName")}
              className="border p-2 rounded w-full"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Email address</label>
          <input
            {...register("email")}
            className="border p-2 rounded w-full"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Street address</label>
          <input
            {...register("address")}
            className="border p-2 rounded w-full"
            placeholder="Street address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              {...register("city")}
              className="border p-2 rounded w-full"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              {...register("state")}
              className="border p-2 rounded w-full"
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          {/* Postal code */}
          <div>
            <label className="block text-sm font-medium mb-1">Postal code</label>
            <input
              {...register("postalCode")}
              className="border p-2 rounded w-full"
              placeholder="Postal code"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {loading ? 'Loading..' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
