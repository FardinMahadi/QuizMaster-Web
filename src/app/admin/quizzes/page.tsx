'use client';

import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { Plus, Search, Loader2, ClipboardList } from 'lucide-react';

import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuizzes } from '@/hooks/useQuizzes';
import { QuizCard } from '@/components/admin/QuizCard';

export default function AdminQuizzesPage() {
    const { quizzes, isLoading, removeQuiz } = useQuizzes();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredQuizzes = useMemo(() => quizzes.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.subjectName && q.subjectName.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [quizzes, searchTerm]);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this quiz? All associated questions will also be removed.")) {
            await removeQuiz(id);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Quiz Management</h1>
                        <p className="text-muted-foreground">Create and manage quizzes across different subjects.</p>
                    </div>
                    <Button onClick={() => toast.info("Add Quiz feature coming soon!")}>
                        <Plus className="mr-2 h-4 w-4" /> Add New Quiz
                    </Button>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search quizzes by title or subject..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredQuizzes.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                        <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold">No quizzes found</h2>
                        <p className="text-muted-foreground">Try a different search term or add a new quiz.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                onEdit={(q) => toast.info(`Editing ${q.title} coming soon!`)}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
