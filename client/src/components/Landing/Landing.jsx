import {NavLink} from 'react-router-dom'
import style from './Landing.module.css'

const Landing = () => {
    return(
        <div>
            <h1 className={style.title}>Bienvenidos</h1>
            <NavLink to='/home'>
            <button className={style.button}>INGRESAR</button>
            </NavLink>
        </div>
    )
}

export default Landing;