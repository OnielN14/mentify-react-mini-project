import style from './SearchBar.module.css'
import closeButtonImg from '../../assets/images/close.png'
import { useState } from 'react'

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")

    const handleChangeInput = (ev) => {
        setInputValue(ev.target.value)
    }

    return (
        <div className={style.SearchBar}>
            <input type='text' placeholder="Search Movie" value={inputValue} onChange={handleChangeInput} />
            {
                inputValue !== '' ? (
                    <div className={style.SearchBar__Affix}>
                        <button onClick={() => {
                            setInputValue("")
                        }}>
                            <img src={closeButtonImg} />
                        </button>
                    </div>
                ): null
            }
            
        </div>
    )
}

export default SearchBar