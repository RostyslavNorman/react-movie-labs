import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import DefaultActions from "../components/cardIcons/defaultActions"
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const TmdbListPage = ({ title, queryName, queryFn }) => {
  const [page, setPage] = useState(1);
const { data, error, isPending, isError } = useQuery({
  queryKey: [queryName, { page }],
  queryFn,
  placeholderData: keepPreviousData,
});

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return ( 
    <>
      <PageTemplate
        title={title}
        movies={data.results}
        action={(movie) => <DefaultActions movie={movie}/>}
      />
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={page}
          color="primary"
          onChange={(e, value) => {
            setPage(value);
            window.scrollTo(0, 0);
          }}
        />
      </Box>
    </>
  );
};
export default TmdbListPage;