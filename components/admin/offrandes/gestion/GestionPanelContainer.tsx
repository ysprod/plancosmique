"use client";
import React from "react";

export default function GestionPanelContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8 animate-fade-in">
      {children}
    </section>
  );
}
