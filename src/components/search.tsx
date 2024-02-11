import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    console.log("searchQuery : ", searchQuery);
    searchQuery
      ? searchParams.set("search", searchQuery)
      : searchParams.delete("search");
    console.log(`${location.pathname}?${searchParams.toString()}`);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, 300);
  return (
    <div className="relative grow">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
      </div>
      <Input
        placeholder="Search..."
        type="text"
        className="pl-11 w-full"
        onChange={(e) => handleSearch(e.target.value)}
        // defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
