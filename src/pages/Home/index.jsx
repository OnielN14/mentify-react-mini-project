import { useEffect, useRef, useState } from 'react';
import { getPopular, getUpcoming, IMAGE_HOST } from '../../api/movieDbAPI';
import style from './Home.module.css'
import Header from "../../components/Header";
import HighlightItem from "../../components/HighlightItem";
import SearchBar from "../../components/SearchBar";
import NormalItem from '../../components/NormalItem';

function Home() {
  const isMounted = useRef(false)
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])

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

      getPopular()
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

          console.log({ transformed })

          setPopularMovies(transformed)
        })
    }

    isMounted.current = true
  }, [])

  return (
    <div>
      <Header/>
      <div className='container'>
        <SearchBar/>
      </div>
      <div className={[style.Home__HighlightContainer, 'container'].join(" ")}>
        {
          upcomingMovies.map((item, index) => (
            <HighlightItem key={index} {...item} />
          ))
        }
      </div>
        
      <div className={style.Home__PopularContainerWrapper}>
        <div className={[style.Home__PopularContainer, 'container'].join(" ")}>
          <h1>Popular</h1>
          <div className={style.Home__PopularItems}>
            {
              popularMovies.map((item, index) => <NormalItem key={index} {...item} />)
            }
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default Home;
