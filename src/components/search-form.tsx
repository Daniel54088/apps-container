"use client";
import React from "react";
import { usePetContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleSearchQueryChange } = usePetContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        placeholder="Search pet"
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
      />
    </form>
  );
}
