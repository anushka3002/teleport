"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "@/components/progressBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formData } from "@/app/api/register/route";
import { toast } from "react-toastify";

const schema = z.object({
  notifications: z
    .string()
    .nonempty("Notification preference is required")
    .refine(
      (value) => ["email", "sms", "none"].includes(value),
      "Invalid notification preference"
    ),
  theme: z
    .string()
    .nonempty("Theme preference is required")
    .refine(
      (value) => ["light", "dark", "system"].includes(value),
      "Invalid theme preference"
    ),
  language: z
    .string()
    .nonempty("Language preference is required")
    .refine(
      (value) => ["en", "es", "fr", "de", "zh"].includes(value),
      "Invalid language preference"
    ),
});

const Step3 = () => {
  const router = useRouter();
  const dispatch  = useDispatch()
  const {loading} = useSelector(state => state.formData)
  const [completeForm, setCompleteForm] = useState(false)
  const notify = (msg) => msg.includes('wrong') ? toast.error(msg) : toast.success(msg);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      notifications: "",
      theme: "",
      language: "",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("preferencesData");
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
      localStorage.setItem("preferencesData", JSON.stringify(currentData));
    };

    window.addEventListener("beforeunload", saveData);
    return () => {
      window.removeEventListener("beforeunload", saveData);
    };
  }, [getValues]);

  const onSubmit = async (data) => {
    try {
      const currentData = getValues();
      localStorage.setItem("preferencesData", JSON.stringify(currentData));

      await Promise.all([
        dispatch(formData(router, notify)),
      ]);
      setCompleteForm(true)
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="p-4">
      <ProgressBar currentStep={completeForm ? 4 : 3} />
      <form
        className="border w-[96%] md:w-[80%] lg:w-[45%] mx-auto p-6 rounded-lg mt-4 bg-white shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Notification Preferences */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Notifications</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                {...register("notifications")}
                type="radio"
                value="email"
                className="mr-2"
              />
              Email
            </label>
            <label className="flex items-center">
              <input
                {...register("notifications")}
                type="radio"
                value="sms"
                className="mr-2"
              />
              SMS
            </label>
            <label className="flex items-center">
              <input
                {...register("notifications")}
                type="radio"
                value="none"
                className="mr-2"
              />
              None
            </label>
          </div>
          {errors.notifications && (
            <p className="text-red-500 text-sm">{errors.notifications.message}</p>
          )}
        </div>

        {/* Theme Preference */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Theme Preference</label>
          <select
            {...register("theme")}
            className="border p-2 rounded w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select a theme
            </option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
          {errors.theme && (
            <p className="text-red-500 text-sm">{errors.theme.message}</p>
          )}
        </div>

        {/* Language Preference */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Additional Language</label>
          <select
            {...register("language")}
            className="border p-2 rounded w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select a language
            </option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
          {errors.language && (
            <p className="text-red-500 text-sm">{errors.language.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
        <div onClick={()=>router.back()} className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg mr-4">Back</div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {loading ? 'Loading..': 'Submit'}
          </button>
        </div>
      </form>

    </div>
  );
};

export default Step3;
