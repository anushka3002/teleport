"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/progressBar";
import { useEffect } from "react";

const schema = z.object({
  bankName: z
    .string()
    .min(2, "Bank Name must be at least 2 characters")
    .nonempty("Bank Name is required"),
  accountNumber: z
    .string()
    .regex(/^\d+$/, "Account Number must contain only numbers")
    .min(10, "Account Number must be at least 10 digits")
    .max(18, "Account Number must not exceed 18 digits"),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code format")
    .nonempty("IFSC Code is required"),
  accountType: z
    .string()
    .nonempty("Account Type is required")
    .refine(
      (value) => ["savings", "current", "business"].includes(value),
      "Invalid account type"
    ),
});

const Step2 = () => {
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
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("accountFormData");
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
      localStorage.setItem("accountFormData", JSON.stringify(currentData));
    };

    window.addEventListener("beforeunload", saveData);
    return () => {
      window.removeEventListener("beforeunload", saveData);
    };
  }, [getValues]);

  const onSubmit = async (data) => {
      const currentData = getValues();
      localStorage.setItem("accountFormData", JSON.stringify(currentData));
      router.push("/register/step3");
  };

  return (
    <div className="p-4">
      <ProgressBar currentStep={2} />
      <form
        className="border w-[45%] mx-auto p-6 rounded-lg mt-4 bg-white shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input
            {...register("bankName")}
            className="border p-2 rounded w-full"
            placeholder="Enter your bank name"
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Account Number</label>
          <input
            {...register("accountNumber")}
            className="border p-2 rounded w-full"
            placeholder="Enter your account number"
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">IFSC Code</label>
          <input
            {...register("ifscCode")}
            className="border p-2 rounded w-full"
            placeholder="Enter your IFSC code"
          />
          {errors.ifscCode && (
            <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Account Type</label>
          <select
            {...register("accountType")}
            className="border p-2 rounded w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select account type
            </option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
            <option value="business">Business</option>
          </select>
          {errors.accountType && (
            <p className="text-red-500 text-sm">{errors.accountType.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
        <div onClick={()=>router.back()} className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg mr-4">Back</div>
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

export default Step2;
