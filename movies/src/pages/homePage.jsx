import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import DefaultActions from "../components/cardIcons/defaultActions"


const HomePage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover'],
    queryFn: getMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

     return (
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <DefaultActions movie={movie}/>
        }}
      />
  );

};
export default HomePage;
