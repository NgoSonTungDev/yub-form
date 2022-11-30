import React from "react";
import { useSearchParams } from "react-router-dom";
const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = React.useMemo(() => Object.fromEntries([...searchParams]), []);
  return [query, setSearchParams];
};

export default useQuery;
