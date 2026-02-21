'use client';

import type { Quiz } from '@/types';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '@/lib/api/quizzes';

export const useQuizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuizzes = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getQuizzes();
            setQuizzes(data || []);
        } catch {
            toast.error('Failed to load quizzes');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    const addQuiz = async (data: Partial<Quiz>) => {
        try {
            const newQuiz = await createQuiz(data);
            setQuizzes((prev) => [...prev, newQuiz]);
            toast.success('Quiz created successfully');
            return true;
        } catch {
            toast.error('Failed to create quiz');
            return false;
        }
    };

    const editQuiz = async (id: number, data: Partial<Quiz>) => {
        try {
            const updated = await updateQuiz(id, data);
            setQuizzes((prev) => prev.map((q) => (q.id === id ? updated : q)));
            toast.success('Quiz updated successfully');
            return true;
        } catch {
            toast.error('Failed to update quiz');
            return false;
        }
    };

    const removeQuiz = async (id: number) => {
        try {
            await deleteQuiz(id);
            setQuizzes((prev) => prev.filter((q) => q.id !== id));
            toast.success('Quiz deleted successfully');
            return true;
        } catch {
            toast.error('Failed to delete quiz');
            return false;
        }
    };

    return {
        quizzes,
        isLoading,
        addQuiz,
        editQuiz,
        removeQuiz,
        refreshQuizzes: fetchQuizzes
    };
};
