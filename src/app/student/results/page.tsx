'use client';

import type { Result } from '@/types';

import axios from 'axios';
import { toast } from 'sonner';
import { studentApi } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardTitle,CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from '@/components/ui/table';

// Badge is not installed yet, I'll use a simple div if badge fails or install it.
// Actually, I'll just use a styled div for now to avoid another install step if not strictly needed.

import { useAppSelector } from '@/lib/redux/hooks';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentResultsPage() {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const [results, setResults] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const res = await studentApi.getMyResults(user.id);
                setResults(res.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message || 'Failed to fetch results');
                } else {
                    toast.error('An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchResults();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Results</h1>
                        <p className="text-gray-600">Track your performance across all quizzes</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Attempt History</CardTitle>
                    </CardHeader>
                        <CardContent className="p-0 sm:p-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Quiz Title</TableHead>
                                            <TableHead className="hidden sm:table-cell">Score</TableHead>
                                            <TableHead>Percentage</TableHead>
                                            <TableHead className="hidden md:table-cell">Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                                    <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                                                </TableRow>
                                            ))
                                        ) : results.length > 0 ? (
                                            results.map((result) => {
                                                const percentage = (result.score / result.totalMarks) * 100;
                                                return (
                                                    <TableRow key={result.id}>
                                                        <TableCell className="font-medium">{result.quizTitle}</TableCell>
                                                        <TableCell className="hidden sm:table-cell">{result.score} / {result.totalMarks}</TableCell>
                                                        <TableCell>{percentage.toFixed(1)}%</TableCell>
                                                        <TableCell className="hidden md:table-cell">{new Date(result.submittedAt).toLocaleDateString()}</TableCell>
                                                        <TableCell>
                                                            <div className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${percentage >= 40 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {percentage >= 40 ? 'PASSED' : 'FAILED'}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button size="sm" variant="ghost" onClick={() => router.push(`/student/results/${result.id}`)}>
                                                                View Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                    You haven&apos;t taken any quizzes yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                </Card>
            </main>
        </div>
    );
}
