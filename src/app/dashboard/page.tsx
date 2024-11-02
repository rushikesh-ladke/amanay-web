// app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/types/auth';
import { Note } from '@/types/note';
import { notesService } from '@/services/notes-service';
import { NoteCard } from '@/components/ui/note-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  console.log('user: ', user);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNoteName, setNewNoteName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchNotes();
  }, [router]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await notesService.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteName.trim()) return;

    setIsCreating(true);
    try {
      const newNote = await notesService.createNote({
        name: newNoteName,
        visibility: 'PRIVATE',
      });
      setNotes((prev) => [newNote, ...prev]);
      setNewNoteName('');
    } catch (error) {
      console.error('Failed to create note:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteNote = async (nameId: string) => {
    try {
      await notesService.deleteNote(nameId);
      setNotes((prev) => prev.filter((note) => note.nameId !== nameId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateNote} className="flex gap-4">
                <Input
                  value={newNoteName}
                  onChange={(e) => setNewNoteName(e.target.value)}
                  placeholder="Enter note name"
                  disabled={isCreating}
                />
                <Button type="submit" disabled={isCreating || !newNoteName.trim()}>
                  {isCreating ? 'Creating...' : 'Create Note'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              key={note.nameId}
              note={note}
              onDelete={handleDeleteNote}
            />
          ))}
          {notes.length === 0 && (
            <Card className="col-span-2">
              <CardContent className="p-6 text-center text-muted-foreground">
                No notes yet. Create your first note above!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}