import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { ChangeEvent, SetStateAction } from "react";

interface SearchBarProps {
  id: string;
  srLabel: string;
  placeholder: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
  searchQuery: string;
  className?: string;
}

function SearchBar({
  id,
  srLabel,
  placeholder,
  setSearchQuery,
  searchQuery,
  className = "",
}: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);
  return (
    <search
      data-testid="search-bar"
      className={`${className} relative flex w-full max-w-80`}
    >
      <label htmlFor={id} className="sr-only">
        {srLabel}
      </label>
      <Input
        value={searchQuery}
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
        aria-hidden="true"
      />
    </search>
  );
}

export default SearchBar;
