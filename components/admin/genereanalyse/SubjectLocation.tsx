"use client";
import { MapPin } from "lucide-react";

interface SubjectLocationProps {
    lieuNaissance: string;
}

export default function SubjectLocation({ lieuNaissance }: SubjectLocationProps) {
    return (
        <div className="flex items-center gap-1 text-xs opacity-90">
            <MapPin className="w-3 h-3" />
            {lieuNaissance}
        </div>
    );
}