import style from './Detail.module.css'
import Header from '../../components/Header'
import homeImg from "../../assets/images/home.png"
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMoveDetail, IMAGE_HOST } from '../../api/movieDbAPI'

const Detail = () => {
    const param = useParams()
    const location = useLocation()
    const [detail, setDetail] = useState(location.state)
    
    useEffect(() => {
        if (location.state === null && param.id) {
            getMoveDetail(param.id)
                .then((response) => {
                    const { title, overview, poster_path, id, release_date } = response.data
                    setDetail({
                        id,
                        title,
                        description: overview,
                        poster: `${IMAGE_HOST}${poster_path}`,
                        date: release_date
                    })
                })
        }
    }, [param, location])
    
    return (
        <div>
            <Header/>
            
            {
                detail !== null && (
                    <div className={[style.Detail,'container'].join(" ")}>
                        <div className={style.Detail__Breadcrumb}>
                            <Link to="/">
                                <img src={homeImg} />
                            </Link>
                            <div>/</div>
                            <div>Detail</div>
                            <div>/</div>
                            <div className={style.Title}>{detail.title}</div>
                        </div>
                        <div className={style.Detail__Content}>
                            <div className={style.Detail__Poster}>
                                <img src={detail.poster}/>
                            </div>
                            <div className={style.Detail__Info}>
                                <h1>{detail.title}</h1>

                                <h3>Overview</h3>
                                <p>{detail.description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Detail