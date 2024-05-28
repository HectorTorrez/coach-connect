"use client";

import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {SearchIcon} from "lucide-react";

import {Input} from "../ui/input";

export function SearchClients() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form>
      <div className="relative ">
        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search clients..."
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
