import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormEvent, useEffect, useState } from "react";
import { SearchFilters } from "@/lib/types";

interface SearchBarProps {
  onSearchChange: (filters: SearchFilters) => void;
  genres: string[];
}

export default function SearchBar({ onSearchChange, genres }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    // Debounce search to avoid too many API calls
    const handler = setTimeout(() => {
      onSearchChange({ query, genre });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, genre, onSearchChange]);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  return (
    <div className="mb-6 flex items-center flex-col sm:flex-row gap-4">
      <div className="relative flex-grow w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="material-icons text-gray-500">search</span>
        </div>
        <Input
          type="text"
          placeholder="Rechercher des livres..."
          className="w-full pl-10"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full sm:w-auto">
        <Select value={genre} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tous les genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les genres</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
