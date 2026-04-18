export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input 
        type="text" 
        placeholder="Cari produk berdasarkan nama..." 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', 
          borderRadius: '20px', border: '1px solid #ccc',
          fontSize: '1rem', outline: 'none'
        }}
      />
    </div>
  );
}
