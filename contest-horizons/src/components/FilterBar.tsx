import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterBarProps {
  filters: {
    platforms: string[];
    status: string[];
    searchQuery: string;
  };
  setFilters: (filters: {
    platforms: string[];
    status: string[];
    searchQuery: string;
  }) => void;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, setFilters]);

  const togglePlatform = (platform: string) => {
    const updatedPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];

    setFilters({ ...filters, platforms: updatedPlatforms });
  };

  const toggleStatus = (status: string) => {
    const updatedStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    setFilters({ ...filters, status: updatedStatus });
  };

  const clearFilters = () => {
    setFilters({ platforms: [], status: [], searchQuery: "" });
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters.platforms.length > 0 ||
    filters.status.length > 0 ||
    filters.searchQuery;

  return (
    <Card className="p-4 mb-6 bg-black text-white">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full h-10 bg-gray-800 text-yellow-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Search contests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-5 w-5 text-yellow-400 hover:text-yellow-500" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm font-medium text-yellow-400">
            <FilterIcon className="h-4 w-4" />
            <span>Platform Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                />
                <label htmlFor={`platform-${platform}`} className="text-yellow-400">
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm font-medium text-yellow-400">
            <span>Contest Status:</span>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {[
                { label: "All", value: [] },
                { label: "Upcoming", value: ["UPCOMING"] },
                { label: "Past", value: ["PAST"] }
              ].map(({ label, value }) => (
                <TabsTrigger
                  key={label}
                  value={label.toLowerCase()}
                  onClick={() => setFilters({ ...filters, status: value })}
                  className={filters.status.join() === value.join() ? "bg-yellow-400 text-black" : ""}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-black"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FilterBar;
