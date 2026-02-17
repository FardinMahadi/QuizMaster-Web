'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/lib/redux/hooks';

export default function LandingPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else {
                router.push('/student/dashboard');
            }
        } else {
            router.push('/login');
        }
    }, [router, user, isAuthenticated]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-xl font-semibold">Loading...</div>
        </div>
    );
}
