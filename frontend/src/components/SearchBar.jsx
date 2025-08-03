import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name or specialization..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 w-full rounded mb-4"
  />
);

export default SearchBar;
