'use client';

import { useState,useEffect, useCallback } from 'react';

export function useQuizTimer(initialMinutes: number, onTimeUp: () => void) {
    const [timeLeft, setTimeLeft] = useState<number | null>(initialMinutes * 60);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }
        
        if (timeLeft === null) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : prev));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft === 0, onTimeUp]);

    return {
        timeLeft,
        formattedTime: timeLeft !== null ? formatTime(timeLeft) : '--:--',
        isCritical: timeLeft !== null && timeLeft < 60
    };
}
