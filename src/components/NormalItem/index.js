import style from './NormalItem.module.css'
import { Link } from 'react-router-dom'

const NormalItem = ({ id, title, date, description, poster }) => {

    return (
        <Link to={`/detail/${id}`} className={style.NormalItem}>
            <div className={style.NormalItem__Poster}>
                <img src={poster} />
            </div>

            <div className={style.NormalItem__Info}>
                <h2>{title}</h2>
                <p>{date}</p>
            </div>
        </Link>
    )
}

export default NormalItem;