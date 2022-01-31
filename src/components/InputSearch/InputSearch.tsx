import { useEffect, useState } from "react";
import { Input } from "@material-ui/core";

import useDebounce from "hooks/useDebounce";

interface IInputSearch {
  placeholder?: string;
  className?: string;
  searchHandler: (search: string) => void;
}

const InputSearch = ({
  placeholder = "",
  className = "",
  searchHandler,
}: IInputSearch) => {
  const [search, setSearch] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 700);

  useEffect(() => {
    if (debouncedSearch) {
      searchHandler(debouncedSearch);
    }
  }, [debouncedSearch]);
  return (
    <Input
      placeholder={placeholder}
      className={className}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
};

export default InputSearch;
