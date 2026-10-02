import React from 'react';

function NoteSearch({ searchKeyword, onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        className="note-search__input"
        placeholder="Cari catatan..."
        value={searchKeyword}
        onChange={(e) => onSearch(e.target.value)}
        data-testid="note-search-input"
      />
      {searchKeyword && (
        <button
          type="button"
          className="note-search__clear"
          onClick={() => onSearch('')}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default NoteSearch;