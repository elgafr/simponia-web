'use client';

interface ReviewerNotesProps {
  notes: string[];
}

export function ReviewerNotes({ notes }: ReviewerNotesProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
      <h2 className="text-white font-semibold mb-4">Catatan dari Reviewer</h2>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-blue-500/20 text-white p-3 rounded-lg text-sm"
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
} 