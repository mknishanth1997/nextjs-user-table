// @ts-nocheck
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
import { X } from "lucide-react";

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
    if (existingUser) dispatch(editUser({ ...data, id: existingUser.id }));
    else dispatch(addUser({ ...data, id: uuidv4() }));
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl border-2 border-purple-500/50 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-purple-500/30 bg-gradient-to-r from-purple-600 to-pink-600">
          <h2 className="text-3xl font-black text-white drop-shadow-lg">
            {existingUser ? "✏️ Edit User" : "➕ Add New User"}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 backdrop-blur-sm border border-white/30"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 bg-slate-900/95">
          <div className="p-6">
            <div className="space-y-5">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 text-sm font-bold mb-2">
                    Full Name *
                  </label>
                  <input
                    placeholder="John Doe"
                    {...register("name")}
                    className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 font-semibold">
                      ⚠️ {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-300 text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    placeholder="john@example.com"
                    {...register("email")}
                    className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 font-semibold">
                      ⚠️ {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-purple-300 text-sm font-bold mb-2">
                  LinkedIn URL *
                </label>
                <input
                  placeholder="https://linkedin.com/in/johndoe"
                  {...register("linkedin")}
                  className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                />
                {errors.linkedin && (
                  <p className="text-red-400 text-sm mt-1 font-semibold">
                    ⚠️ {errors.linkedin.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-purple-300 text-sm font-bold mb-2">
                  Gender *
                </label>
                <select
                  {...register("gender")}
                  className="w-full bg-slate-800 border-2 border-purple-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                >
                  <option value="" className="bg-slate-800">
                    Select Gender
                  </option>
                  <option value="Male" className="bg-slate-800">
                    Male
                  </option>
                  <option value="Female" className="bg-slate-800">
                    Female
                  </option>
                  <option value="Other" className="bg-slate-800">
                    Other
                  </option>
                </select>
                {errors.gender && (
                  <p className="text-red-400 text-sm mt-1 font-semibold">
                    ⚠️ {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Address Section */}
              <div className="pt-4 border-t-2 border-purple-500/30">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  📍 Address Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <input
                      placeholder="Address Line 1 *"
                      {...register("address.line1")}
                      className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                    />
                    {errors.address?.line1 && (
                      <p className="text-red-400 text-sm mt-1 font-semibold">
                        ⚠️ {errors.address.line1.message}
                      </p>
                    )}
                  </div>

                  <input
                    placeholder="Address Line 2 (Optional)"
                    {...register("address.line2")}
                    className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <select
                        {...register("address.state")}
                        className="w-full bg-slate-800 border-2 border-purple-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                      >
                        <option value="" className="bg-slate-800">
                          Select State *
                        </option>
                        {Object.keys(states).map((s) => (
                          <option key={s} value={s} className="bg-slate-800">
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.address?.state && (
                        <p className="text-red-400 text-sm mt-1 font-semibold">
                          ⚠️ {errors.address.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <select
                        {...register("address.city")}
                        className="w-full bg-slate-800 border-2 border-purple-500/40 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                      >
                        <option value="" className="bg-slate-800">
                          Select City *
                        </option>
                        {cities?.map((c) => (
                          <option key={c} value={c} className="bg-slate-800">
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.address?.city && (
                        <p className="text-red-400 text-sm mt-1 font-semibold">
                          ⚠️ {errors.address.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      placeholder="PIN Code (6 digits) *"
                      {...register("address.pin")}
                      className="w-full bg-slate-800 border-2 border-purple-500/40 text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition font-medium"
                    />
                    {errors.address?.pin && (
                      <p className="text-red-400 text-sm mt-1 font-semibold">
                        ⚠️ {errors.address.pin.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold border-2 border-slate-600 hover:border-slate-500 shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-bold border-2 border-purple-500 hover:scale-105"
                >
                  {existingUser ? "💾 Update" : "➕ Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
