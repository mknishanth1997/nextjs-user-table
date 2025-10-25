"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
