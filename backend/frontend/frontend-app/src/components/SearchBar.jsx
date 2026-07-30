function SearchBar({ setSearch }) {
  return (
    <input
      placeholder="Search places..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;