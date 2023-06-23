import {useState, useEffect} from 'react';
import style from './SearchBar.module.css'
import * as actions from '../../Redux/actions'
import { useDispatch } from 'react-redux';
import {onSearch} from '../../Redux/actions'



const SearchBar = () => {
    
    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleClick = async() =>{
        await dispatch(onSearch(name))
    }
    return(
        <div className={style.container}>
            <input className={style.input} type="search" placeholder='Ingresa un país' onChange={handleChange} value={name}/>

            <button className={style.button} onClick={() =>{handleClick();setName('')}}>Buscar / Traer Todos</button>
        </div>
    )
}

export default SearchBar;