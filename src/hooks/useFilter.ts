import { useEffect, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

import Filter from "classes/filter.class";

import removeEmptyProps from "helpers/removeEmptyProps";

import IFilter from "interfaces/Filter";

const useFilter = (
  initSearch?: URLSearchParamsInit
): [Filter, (filter: Partial<Filter>) => void] => {
  const [searchParams, setSearchParams] = useSearchParams(initSearch);

  const filterFromSearch = new Filter();

  for (const key of Object.keys(filterFromSearch)) {
    if (searchParams.has(key)) {
      filterFromSearch[key as keyof Filter] = searchParams.get(key) || "";
    }
  }

  const [filter, setFilterState] = useState(filterFromSearch);

  const setFilter = (filter: Partial<Filter>) => {
    setFilterState((prev) => {
      return {
        ...prev,
        ...filter,
      };
    });
  };

  useEffect(() => {
    const newFilter = removeEmptyProps({ ...filter }) as unknown as IFilter;
    setSearchParams({ ...newFilter });
  }, [filter]);

  return [filter, setFilter];
};

export default useFilter;
