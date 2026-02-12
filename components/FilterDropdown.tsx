"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ value, onChange }: { value: string, onChange: (newValue: string) => void }) {
    const [open, setOpen] = useState(false);

    const options = ["All", "Completed", "Incomplete"];

    const handleSelect = (value: string) => {
        onChange(value);
        setOpen(false);
    };

    return (
        <div className="relativeinline-block text-left">
            {/* Dropdown button */}
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 text-gray-200 cursor-pointer bg-[#884cf7] rounded-md shadow flex justify-between items-center w-30 h-12"
            >
                {value}
                <ChevronDown className={`transition-all duration-400 ${open ? "rotate-180" : "rotate-0"} w-6 h-6`} />
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute text-gray-200 duration-300 transition-all mt-2 w-35 rounded-md shadow bg-[#884cf7]  z-10">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="block cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-[#753eda]"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
