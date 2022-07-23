import style from './Button.module.css'

const Button = ({ onClick, children }) => {
    return (
        <button className={style.Button} onClick={onClick} type="button">
            {children}
        </button>
    )
}

export default Button