import style from './Header.module.css'

const Header = () => (
    <header className={style.Header}>
        <h1 className={style.Header__Title}><span>Mov</span>Lib</h1>
        <span className={style.Header__TagLine}>Powered by <span>https://www.themoviedb.org</span></span>
    </header>
)

export default Header