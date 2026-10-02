import React from 'react';
import NoteItem from './NoteItem';

function groupNotesByMonthYear(notes) {
  return notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYearKey = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    if (!groups[monthYearKey]) {
      groups[monthYearKey] = [];
    }
    groups[monthYearKey].push(note);
    return groups;
  }, {});
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword = '',
  dataTestId = 'notes-list',
}) {
  // TODO [Basic] validasi notes agar tidak kosong.
  const hasNotes = notes && notes.length > 0;

  if (!hasNotes) {
    return (
      /* Sesuai Gambar: Empty State Pattern */
      <div
        data-testid={`${dataTestId}-empty`}
        className="notes-list__empty-message"
      >
        Tidak ada catatan
      </div>
    );
  }

  const groupedNotes = groupNotesByMonthYear(notes);

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {/* TODO [Basic] gunakan array.map untuk merender NoteItem untuk setiap catatan. */}
      {/* TODO [Skilled] ekstrak tombol aksi menjadi komponen reusable agar dipakai NoteItem. */}
      {/* TODO [Advanced] kelompokkan catatan per bulan-tahun dan render tiap grup dalam <section className="notes-group">. */}
      {/* Sesuai Gambar: Dynamic Data-testid Pattern */}
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section
          key={groupKey}
          data-testid={`${groupKey}-group`}
          className="notes-group"
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{groupKey}</h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {groupNotes.length} catatan
            </span>
          </div>

          <div className="notes-group__items">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;