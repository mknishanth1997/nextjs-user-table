// @ts-nocheck
"use client";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { deleteUser } from "./userSlice";
import { useState } from "react";
import UserForm from "./UserForm";
import { config } from "@/data/config";
import {
  Trash2,
  Edit2,
  Plus,
  Users,
  Mail,
  Linkedin,
  MapPin,
  User,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

export default function UserTable() {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users.filter(
    (u: any) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-12 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl animate-pulse">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-2">
            User Management
          </h1>
          <p className="text-purple-300 text-lg">Manage your team with style</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-6 mb-6 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-purple-300 px-6 py-3 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
            </div>
            <button
              onClick={() => {
                setEditUser(null);
                setShowForm(true);
              }}
              className="group w-full md:w-auto relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-1">
                  Total Users
                </p>
                <p className="text-4xl font-black text-white">{users.length}</p>
              </div>
              <div className="w-14 h-14 bg-purple-500/30 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-purple-300" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-6 border border-pink-500/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-300 text-sm font-medium mb-1">Active</p>
                <p className="text-4xl font-black text-white">{users.length}</p>
              </div>
              <div className="w-14 h-14 bg-pink-500/30 rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 text-pink-300" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/30 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">
                  Departments
                </p>
                <p className="text-4xl font-black text-white">4</p>
              </div>
              <div className="w-14 h-14 bg-blue-500/30 rounded-2xl flex items-center justify-center">
                <Mail className="w-7 h-7 text-blue-300" />
              </div>
            </div>
          </div>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10">
              <Users className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
              <p className="text-purple-300 text-lg">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user: any) => (
              <div
                key={user.id}
                className="group bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {user.name}
                      </h3>
                      <p className="text-purple-300 text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {config.editable && (
                      <button
                        onClick={() => {
                          setEditUser(user);
                          setShowForm(true);
                        }}
                        className="w-10 h-10 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-amber-500/30"
                      >
                        <Edit2 className="w-4 h-4 text-amber-300" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </button>
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-blue-300" />
                    </div>
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 transition flex-1 truncate underline underline-offset-2"
                    >
                      LinkedIn Profile
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-300" />
                    </div>
                    <span className="text-purple-200">{user.gender}</span>
                  </div>

                  {/* Address Toggle */}
                  <button
                    onClick={() =>
                      setExpanded(expanded === user.id ? null : user.id)
                    }
                    className="w-full flex items-center justify-between gap-3 text-sm bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-pink-300" />
                      </div>
                      <span className="text-pink-200 font-medium">
                        {expanded === user.id ? "Hide" : "Show"} Address
                      </span>
                    </div>
                    {expanded === user.id ? (
                      <ChevronUp className="w-4 h-4 text-pink-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-pink-300" />
                    )}
                  </button>

                  {/* Expanded Address */}
                  {expanded === user.id && (
                    <div className="bg-white/5 rounded-xl p-4 text-sm text-purple-200 space-y-1">
                      <p>{user.address.line1}</p>
                      {user.address.line2 && <p>{user.address.line2}</p>}
                      <p>
                        {user.address.city}, {user.address.state}
                      </p>
                      <p className="font-mono text-purple-300">
                        PIN: {user.address.pin}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <UserForm
            onClose={() => setShowForm(false)}
            existingUser={editUser}
          />
        )}
      </div>
    </div>
  );
}
