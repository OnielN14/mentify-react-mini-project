import Button from '../Button'
import style from './HighlightItem.module.css'
import { useNavigate } from 'react-router-dom'

const HighlightItem = ({ id, title, date, description, poster }) => {
    const navigate = useNavigate()

    return (
        <div className={style.HighlightItem}>
            <div className={style.HighlightItem__Poster}>
                <img src={poster}/>
            </div>
            <div className={style.HighlightItem__Detail}>
                <h3>{title}</h3>
                <span>{date}</span>
                <p>{description.substring(0, 60) + "..."}</p>

                <div style={{ flexGrow: 1 }} />
                <Button onClick={() => {
                    navigate("/detail/"+id, {
                        state: {
                            id, title, date, description, poster
                        }
                    })
                }}>View Detail</Button>
            </div>
        </div>
    )
}

export default HighlightItem