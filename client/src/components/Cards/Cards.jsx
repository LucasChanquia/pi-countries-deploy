import style from "../Cards/Cards.module.css";
import {deleteActivities} from '../../Redux/actions'
import { useDispatch } from "react-redux";


const Cards = ({ name, difficulty, duration, season, Countries,id }) => {
        console.log(Countries);
    const dispatch = useDispatch();


    const onClose = () =>{
        dispatch(deleteActivities(id))
    }


  return (
      <div className={style.container}>
       
      <div className={style.card}>
        <h2 className={style.title}>{`Actividad: ${name}`}</h2>
        <h3 className={style.title}>{`Dificultad: ${difficulty}`}</h3>
        <h3 className={style.title}>{`Duración: ${duration} Hs`}</h3>
        <h3 className={style.title}>{`Temporada: ${season}`}</h3>
        <h3>Paises: {Countries?.map(e =>{
            return <p className={style.title1}>{`- ${e.name}`}</p>
        })}</h3>
        <button onClick={()=> onClose({id})}>Eliminar</button>
      </div>
    </div>
  );
};

export default Cards;
