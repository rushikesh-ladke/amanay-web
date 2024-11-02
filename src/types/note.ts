// types/note.ts

export type NoteVisibility = 'PRIVATE' | 'PUBLIC';
export type NoteType = 'NOTE';
export type NoteStatus = string | null;

export interface Note {
  name: string;
  nameId: string;
  content: string | null;
  createdAt: string;
  createdBy: string;
  noteType: NoteType;
  relatedLinks: string[] | null;
  dependencies: string[] | null;
  blockedBy: string[] | null;
  questions: string[] | null;
  tags: string[] | null;
  status: NoteStatus;
  startDate: string | null;
  endDate: string | null;
  discussedWith: string[] | null;
  sharedWith: string[] | null;
  visibility: NoteVisibility;
}

export interface CreateNoteInput {
  name: string;
  content?: string;
  visibility?: NoteVisibility;
}