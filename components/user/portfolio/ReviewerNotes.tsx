'use client';

interface ReviewerNotesProps {
  notes: string[];
}

export function ReviewerNotes({ notes }: ReviewerNotesProps) {
  return (
    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4">
      <h3 className="text-white text-lg font-semibold mb-3">Catatan Reviewer</h3>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex gap-3 text-white p-3 rounded-lg text-md"
          >
            <span className="flex-shrink-0">•</span>
            <div className="flex-grow">{note}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 