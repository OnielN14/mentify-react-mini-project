import style from './SearchBar.module.css'
import closeButtonImg from '../../assets/images/close.png'
import loadingImg from '../../assets/images/loading.svg'
import { useState } from 'react'
import { IMAGE_HOST, searchMovie } from '../../api/movieDbAPI'
import { Link } from 'react-router-dom'

const debouncedSearchMovie = () => {
    let timeoutId = null

    return (query) => new Promise((done, fail) => {
        if (timeoutId) clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            searchMovie(query)
            .then(({ data }) => {
                done(data.results)
            })
            .catch((e) => fail(e))
        }, 300)
    })
}

const searchMovieHandler = debouncedSearchMovie()

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResult] = useState([])

    const handleChangeInput = (ev) => {
        const { value } = ev.target

        if (value) {
            setLoading(true)
            searchMovieHandler(value)
                .then((data) => {
                    setSearchResult(data.map((item) => {   
                        return ({
                          id: item.id,
                          title: item.title,
                          description: item.overview,
                          poster: IMAGE_HOST + item.poster_path,
                          date: item.release_date
                        })
                      }))
                })
                .finally(() => {
                    setLoading(false)
                })
        }

        setInputValue(value)
    }

    const handleClickClear = (ev) => {
        setInputValue("")
        setSearchResult([])
    }

    return (
        <div className={style.SearchBar__Wrapper}>
            <div className={style.SearchBar}>
                <input type='text' placeholder="Search Movie" value={inputValue} onChange={handleChangeInput} />
                {
                    inputValue !== '' ?
                    (
                        <div className={style.SearchBar__Affix}>
                            {
                                loading ?
                                (<img src={loadingImg} />)
                                :
                                (
                                    <button onClick={handleClickClear}>
                                        <img src={closeButtonImg} />
                                    </button>
                                )
                            }
                        </div>
                    )
                    :
                    null
                }
            </div>
            {
                searchResults.length > 0 ? (
                    <div className={style.SearchBar__ResultWrapper}>
                        <div className={style.SearchBar__Result}>
                            {searchResults.map((item) => (
                                <Link to={`/detail/${item.id}`} key={item.id} className={style.SearchBar__ResultItem}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default SearchBar