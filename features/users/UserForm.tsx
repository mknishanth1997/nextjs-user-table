"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/redux/store";
import { addUser, editUser } from "./userSlice";
import states from "@/data/states.json";
import { config } from "@/data/config";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(config.name.min)
    .max(config.name.max)
    .required("Name is required"),
  email: yup.string().email().required("Email is required"),
  linkedin: yup.string().url().required("LinkedIn URL is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.object().shape({
    line1: yup.string().required(),
    line2: yup.string(),
    state: yup.string().required(),
    city: yup.string().required(),
    pin: yup.string().matches(/^\d{6}$/, "PIN must be 6 digits"),
  }),
});

export default function UserForm({ onClose, existingUser }: any) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingUser || {},
  });

  const [cities, setCities] = useState<string[]>([]);

  const selectedState = watch("address.state");

  useEffect(() => {
    if (selectedState) setCities(states[selectedState]);
  }, [selectedState]);

  const onSubmit = (data: any) => {
    if (existingUser) {
      dispatch(editUser({ ...data, id: existingUser.id }));
    } else {
      dispatch(addUser({ ...data, id: uuidv4() }));
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {existingUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            placeholder="Name"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            placeholder="Email"
            {...register("email")}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            placeholder="LinkedIn URL"
            {...register("linkedin")}
            className="w-full border p-2 rounded"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">{errors.linkedin.message}</p>
          )}

          <select {...register("gender")} className="w-full border p-2 rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}

          <h3 className="font-semibold mt-4">Address</h3>

          <input
            placeholder="Line 1"
            {...register("address.line1")}
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Line 2"
            {...register("address.line2")}
            className="w-full border p-2 rounded"
          />

          <select
            {...register("address.state")}
            className="w-full border p-2 rounded"
          >
            <option value="">Select State</option>
            {Object.keys(states).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            {...register("address.city")}
            className="w-full border p-2 rounded"
          >
            <option value="">Select City</option>
            {cities?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            placeholder="PIN"
            {...register("address.pin")}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {existingUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
