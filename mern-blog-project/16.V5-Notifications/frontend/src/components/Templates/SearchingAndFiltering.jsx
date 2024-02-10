<form
  onSubmit={handleSearchSubmit}
  className="flex flex-col md:flex-row items-center gap-2 mb-4"
>
  <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="flex-grow p-2 text-sm focus:outline-none"
    />
    <button
      type="submit"
      className="p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg"
    >
      <FaSearch className="h-5 w-5" />
    </button>
  </div>
  <button
    onClick={clearFilters}
    className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
  >
    <MdClear className="h-4 w-4" />
    Clear Filters
  </button>
</form>;
