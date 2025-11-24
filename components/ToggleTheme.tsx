"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            type="button"
            className="cursor-pointer hover:bg-[#2B2A38] ease-in-out duration-300 flex justify-center items-center p-2 w-fit h-fit rounded-3xl"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "light" ? (
                <Sun />
            ) : (
                <Moon />
            )}
        </button>
    );
}