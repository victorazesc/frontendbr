'use client'
import JobForm from "@/components/jobForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Job() {
    const { data, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch('/api/me');
            const data = await res.json();
            setProfile(data);
        };

        if (status === "authenticated") {
            fetchProfile();
        }
    }, [status]);
    
    return (
        <div className="py-10 px-6">
            <JobForm />
        </div>
    )
}
