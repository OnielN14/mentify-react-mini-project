import { useEffect, useRef, useState } from 'react';
import { getUpcoming, IMAGE_HOST } from '../../api/movieDbAPI';
import style from './Home.module.css'
import Header from "../../components/Header";
import HighlightItem from "../../components/HighlightItem";
import SearchBar from "../../components/SearchBar";

function Home() {
  const isMounted = useRef(false)
  const [upcomingMovies, setUpcomingMovies] = useState([])

  useEffect(() => {
    if (!isMounted.current) {
      getUpcoming()
        .then((response) => {
          const { results } = response.data

          const transformed = results.map((item) => {
            return ({
              id: item.id,
              title: item.title,
              description: item.overview,
              poster: IMAGE_HOST + item.poster_path,
              date: item.release_date
            })
          })

          setUpcomingMovies(transformed)
        })
    }

    isMounted.current = true
  }, [])

  return (
    <div>
      <Header/>
      <div className="container">
        <SearchBar/>

        <div className={style.Home__HighlightContainer}>
          {
            upcomingMovies.map((item, index) => (
              <HighlightItem key={index} {...item} />
            ))
          }
        </div>
      </div>

    
    </div>
  );
}

export default Home;
