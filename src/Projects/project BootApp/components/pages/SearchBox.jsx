import { ImSearch } from 'react-icons/im';
import { createQueryObject } from '../../helpers/helper';

export default function SearchBox({ search, setSearch, searchHandler,setQuery,searchInput }) {
  function getValue(event) {
    const value=event.target.value.toLowerCase()
    setSearch(value)
    // ساخت سرچ اتومات
    setQuery((query)=>(createQueryObject(query,{search:value})))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') searchHandler();
  }

  return (
    <div className="flex items-center justify-start w-full my-6">
      <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-[400px] border border-gray-200">
        <input
        ref={searchInput}
          type="text"
          value={search}
          onChange={getValue}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="flex-grow px-5 py-2 outline-none text-gray-700 placeholder:text-gray-400"
        />
      
      </div>
    </div>
  );
}
