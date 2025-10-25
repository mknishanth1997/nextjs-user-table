"use client";
import UserTable from "@/features/users/UserTable";

export default function Home() {
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>
      <UserTable />
    </main>
  );
}
