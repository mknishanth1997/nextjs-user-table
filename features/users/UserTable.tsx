"use client";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { deleteUser } from "./userSlice";
import { useState } from "react";
import UserForm from "./UserForm";
import { config } from "@/data/config";

export default function UserTable() {
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?"))
      dispatch(deleteUser(id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <button
          onClick={() => {
            setEditUser(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">LinkedIn</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No users yet
              </td>
            </tr>
          )}
          {users.map((u) => (
            <>
              <tr key={u.id} className="hover:bg-gray-50">
                <td
                  className="border p-2 cursor-pointer"
                  onClick={() => setExpanded(expanded === u.id ? null : u.id)}
                >
                  {u.name}
                </td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">
                  <a
                    href={u.linkedin}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="border p-2">{u.gender}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => setExpanded(expanded === u.id ? null : u.id)}
                    className="text-blue-600 underline"
                  >
                    {expanded === u.id ? "Hide" : "Show"}
                  </button>
                </td>
                <td className="border p-2 text-center">
                  {config.editable && (
                    <>
                      <button
                        onClick={() => {
                          setEditUser(u);
                          setShowForm(true);
                        }}
                        className="text-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {expanded === u.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 border p-3 text-sm">
                    <strong>Address:</strong> {u.address.line1},{" "}
                    {u.address.line2}, {u.address.city}, {u.address.state} -{" "}
                    {u.address.pin}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {showForm && (
        <UserForm onClose={() => setShowForm(false)} existingUser={editUser} />
      )}
    </div>
  );
}
