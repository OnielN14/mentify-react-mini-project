
import axios from 'axios'

const IMAGE_HOST = "https://image.tmdb.org/t/p/w500"

const movieDbAPI = axios.create({
    params: {
        /**
         * Education Purpose
         */
        api_key: process.env.REACT_APP_TMDB_API_KEY
    },
    baseURL: 'https://api.themoviedb.org/3/'
})

const getUpcoming  = () => movieDbAPI.get("/movie/upcoming")
const getMoveDetail = (id) => movieDbAPI.get(`/movie/${id}`)
const getPopular = () => movieDbAPI.get('/movie/popular')
const searchMovie = (query) => movieDbAPI.get('/search/movie', {
    params: {
        query,
        languange: "en-US"
    }
})

export {
    IMAGE_HOST,
    getUpcoming,
    getMoveDetail,
    getPopular,
    searchMovie
}

export default movieDbAPI;