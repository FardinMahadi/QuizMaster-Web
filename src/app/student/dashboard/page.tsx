'use client';

import type { Quiz,Subject } from '@/types';
import axios from 'axios';
import { toast } from 'sonner';
import { studentApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState,useEffect, useCallback } from 'react';
import { Trophy,BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardFooter, CardHeader,CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentDashboard() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
    const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
    const router = useRouter();

    const fetchSubjects = useCallback(async () => {
        setIsLoadingSubjects(true);
        try {
            const res = await studentApi.getAllSubjects();
            setSubjects(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch subjects');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoadingSubjects(false);
        }
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    const handleSelectSubject = async (subject: Subject) => {
        if (selectedSubject?.id === subject.id) return;
        setSelectedSubject(subject);
        setIsLoadingQuizzes(true);
        try {
            const res = await studentApi.getAvailableQuizzes(subject.id);
            setQuizzes(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch quizzes');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoadingQuizzes(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h1>
                        <p className="text-gray-600">Choose a subject to see available quizzes.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {isLoadingSubjects ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="h-[200px]">
                                <CardHeader className="space-y-2">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-3 w-1/4" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-12 w-full" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-9 w-full" />
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        subjects.map((subject) => (
                            <Card 
                                key={subject.id} 
                                className={`cursor-pointer transition-all hover:shadow-md ${selectedSubject?.id === subject.id ? 'border-primary ring-1 ring-primary' : ''}`}
                                onClick={() => handleSelectSubject(subject)}
                            >
                                <CardHeader className="flex flex-row items-center space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                        <BookOpen />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg sm:text-xl truncate">{subject.name}</CardTitle>
                                        <CardDescription>{subject.code}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 line-clamp-2">{subject.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" className="w-full justify-between">
                                        View Quizzes <ArrowRight size={16} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>

                {(selectedSubject || isLoadingQuizzes) && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2">
                            <Trophy className="text-yellow-500" />
                            <h2 className="text-2xl font-bold">
                                {isLoadingQuizzes ? <Skeleton className="h-8 w-64" /> : `Quizzes for ${selectedSubject?.name}`}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoadingQuizzes ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Card key={i} className="h-[180px]">
                                        <CardHeader className="space-y-2">
                                            <Skeleton className="h-5 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </CardHeader>
                                        <CardContent>
                                            <Skeleton className="h-10 w-full" />
                                        </CardContent>
                                        <CardFooter>
                                            <Skeleton className="h-9 w-full" />
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                quizzes.map((quiz) => (
                                    <Card key={quiz.id} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{quiz.title}</CardTitle>
                                            <CardDescription>{quiz.durationMinutes} minutes | {quiz.totalMarks} marks</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-sm text-gray-600">{quiz.description}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full" onClick={() => router.push(`/student/quiz/${quiz.id}`)}>
                                                Start Quiz
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            )}
                            {!isLoadingQuizzes && quizzes.length === 0 && (
                                <p className="text-gray-500 italic">No quizzes available for this subject yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
