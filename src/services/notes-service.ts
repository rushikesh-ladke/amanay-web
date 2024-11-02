// services/notes-service.ts

import { CreateNoteInput, Note } from '@/types/note';

export const notesService = {
  async createNote(input: CreateNoteInput): Promise<Note> {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    return response.json();
  },

  async getNotes(): Promise<Note[]> {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:3000/notes', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    return response.json();
  },

  async deleteNote(nameId: string): Promise<void> {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost:3000/notes/${nameId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  },
};