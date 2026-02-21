'use client';

import type { Quiz } from '@/types';

import { useRouter } from 'next/navigation';
import { Pencil, Trash2, HelpCircle, Clock, CheckCircle2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface QuizCardProps {
    quiz: Quiz;
    onEdit?: (quiz: Quiz) => void;
    onDelete?: (id: number) => void;
}

export const QuizCard = ({ quiz, onEdit, onDelete }: QuizCardProps) => {
    const router = useRouter();

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-xl line-clamp-1">{quiz.title}</CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{quiz.subjectName || 'General'}</Badge>
                        {quiz.isActive ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                    {quiz.description || 'No description provided.'}
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                        <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                        <span>{quiz.questions?.length || 0} Questions</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        <span>{quiz.durationMinutes} Mins</span>
                    </div>
                    <div className="flex items-center text-sm col-span-2">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                        <span>Total Marks: {quiz.totalMarks}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/admin/quizzes/${quiz.id}/questions`)}
                >
                    Manage Questions
                </Button>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit?.(quiz)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete?.(quiz.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
