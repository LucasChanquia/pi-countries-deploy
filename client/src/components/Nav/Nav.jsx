import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import * as actions from '../../Redux/actions'
import style from './Nav.module.css'

const Nav = () => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(actions.getCountries())
    },[])

    const handlerClick = (event) => {
        event.preventDefault();
        dispatch(actions.getCountries())
    }

    return(
        <div>
            <Link to="/home">
                <button className={style.button}>HOME</button>
            </Link>
            <Link to="/activities">
                <button className={style.button}>ACTIVIDADES</button>
            </Link>
            <Link to="/">
                <button className={style.button}>LOGOUT</button>
            </Link>
            <button className={style.button} onClick={handlerClick}>Reset Countries</button>
        </div>
    )
};

export default Nav;