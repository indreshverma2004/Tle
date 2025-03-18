import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
      <div className="space-y-6">
        {/* Search Field */}
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

        {/* Platform Filters - Vertical List */}
        <div className="space-y-2">
          <div className="flex items-center text-sm font-medium text-yellow-400">
            <FilterIcon className="h-4 w-4 mr-2" />
            <span>Platform Filters:</span>
          </div>
          <div className="flex flex-col space-y-3">
            {["Codeforces", "CodeChef", "LeetCode"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={() => togglePlatform(platform)}
                />
                <label
                  htmlFor={`platform-${platform}`}
                  className="text-yellow-400"
                >
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Contest Status Options - Displayed only when at least one platform is selected */}
        {filters.platforms.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-yellow-400">
              Contest Status:
            </div>
            <div className="flex flex-col space-y-3">
              {["All", "Upcoming", "Past"].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      status:
                        status === "All"
                          ? []
                          : [status.toUpperCase()],
                    })
                  }
                  className={
                    filters.status.join() ===
                    (status === "All" ? "" : status.toUpperCase())
                      ? "bg-yellow-400 text-black px-4 py-2 rounded-md"
                      : "bg-gray-800 text-yellow-400 px-4 py-2 rounded-md hover:bg-gray-700"
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
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
