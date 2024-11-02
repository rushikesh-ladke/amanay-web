// components/note-card.tsx

import { Note } from '@/types/note';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onDelete: (nameId: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{note.name}</CardTitle>
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">
            {note.visibility.toLowerCase()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {note.content || 'No content'}
        </p>
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
        </span>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(note.nameId)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}