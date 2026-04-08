"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product-store";
import { debounce } from "@/lib/utils";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilters, filters } = useProductStore();

  const debouncedSearch = debounce((term: string) => {
    setFilters({
      ...filters,
      searchTerm: term || undefined,
      pageNumber: 1,
    });
  }, 300);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilters({
      ...filters,
      searchTerm: undefined,
      pageNumber: 1,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Ürün Ara</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ürün adı, kategori..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
