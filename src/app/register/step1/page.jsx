"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/progressBar";
import { useEffect } from "react";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  streetAddress: z
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
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP / Postal code"),
});

const Step1 = () => {
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
      country: "United States",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
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
      localStorage.setItem("personalFormData", JSON.stringify(currentData));
    };

    window.addEventListener("beforeunload", saveData); // Save on tab close
    return () => {
      window.removeEventListener("beforeunload", saveData);
    };
  }, [getValues]);

  const onSubmit = async (data) => {
    console.log(data, 'data')
    // try {
    //   const response = await fetch("https://airbnb-backend-eight-omega.vercel.app/api/register/personal", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save personal details.");
    //   }

      router.push("/register/step2");
    // } catch (error) {
    //   console.error(error.message);
    //   alert("An error occurred while saving personal details.");
    // }
  };

  return (
    <div className="p-4">
      <ProgressBar currentStep={1} />
      <form
        className="border w-[45%] mx-auto p-6 rounded-lg mt-4 bg-white shadow"
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

        {/* Country Dropdown */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            {...register("country")}
            className="border p-2 rounded w-full"
            defaultValue="United States"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Street address</label>
          <input
            {...register("streetAddress")}
            className="border p-2 rounded w-full"
            placeholder="Street address"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>
          )}
        </div>

        {/* City, State, and ZIP */}
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
            <label className="block text-sm font-medium mb-1">State / Province</label>
            <input
              {...register("state")}
              className="border p-2 rounded w-full"
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          {/* ZIP */}
          <div>
            <label className="block text-sm font-medium mb-1">ZIP / Postal code</label>
            <input
              {...register("zip")}
              className="border p-2 rounded w-full"
              placeholder="ZIP / Postal code"
            />
            {errors.zip && (
              <p className="text-red-500 text-sm">{errors.zip.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </form>

    </div>
  );
};

export default Step1;
