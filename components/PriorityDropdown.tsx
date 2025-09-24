"use client";
import { useState } from "react";
import Image from "next/image";

export default function PriorityDropdown({ value, onChange }: { value: string, onChange: (newValue: string) => void }) {
    const [open, setOpen] = useState(false);

    const options = ["High", "Medium", "Low"];

    const handleSelect = (value: string) => {
        onChange(value);
        setOpen(false);
    };

    return (
        <div className="relativeinline-block text-left">
            {/* Dropdown button */}
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 cursor-pointer bg-[#884cf7] rounded-md shadow flex justify-between items-center w-32"
            >
                {value || "Priority"}
                <Image className={`transition-all duration-400 ${open? "rotate-[-180deg]": "rotate-[0deg]"}`} src="keyboard_arrow_down_24dp_E3E3E3_FILL0_wght700_GRAD0_opsz24.svg" alt="arrow-down" height={25} width={25}></Image>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute duration-300 transition-all mt-2 w-32 rounded-md shadow bg-[#884cf7] ring-1 ring-black ring-opacity-5 z-10">
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
