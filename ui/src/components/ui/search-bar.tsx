import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Input } from './input';
import { Search, X } from 'lucide-react'; // ✕ icon
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  placeholder?: string;
  isSearching: boolean;
  searchValue: string;
}

export function SearchBar({
  searchValue,
  onSearch,
  isSearching,
  placeholder = 'Search...',
}: SearchBarProps) {
  const [query, setQuery] = useState(searchValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className='relative flex max-w-lg'>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 left-3 flex items-center pl-1 pointer-events-none'>
          <Search className='h-4 w-4 text-muted-foreground' />
        </div>

        {query && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute inset-y-0 right-3 flex items-center pr-1 text-muted-foreground hover:text-foreground'
            aria-label='Clear search'
          >
            <X className='h-4 w-4' />
          </button>
        )}

        <Input
          type='search'
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'pl-10 pr-10  h-10 rounded-lg border-input focus-visible:ring-2',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
          disabled={isSearching}
        />
      </div>
    </div>
  );
}
