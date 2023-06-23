import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import Filters from '../Filters/Filters'
import style from './Home.module.css'
import Cards from '../Cards/Cards'




const Home = () =>{

    const allCountries = useSelector((state) => state.allCountriesFilter)
    const allActivities = useSelector((state)=> state.allActivitiesFilter)

    const [currentPage, setCurrentPage] = useState(1)
    const [countryPerPage, setCountryPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countryPerPage
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    const currentActivities = allActivities.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

     return (
         <div>
            <div>
                <Filters />
            </div>
            <div>
                <Paginado countryPerPage={countryPerPage}  allCountries={allCountries.length} paginado={paginado} currentPage={currentPage} allActivities={allActivities.length}  />
            </div>
            <div className={style.card}>
                {
                    currentCountry?.map( coun =>{
                        return ( 
                        <div className={style.tarjet}>
                        <Card name={coun.name} image={coun.image} continent={coun.continent} id={coun.id}/>
                        </div>
                        )
                    })
                }
            </div>
            <div className={style.cards}>
            {
                    currentActivities?.map( coun =>{
                        return ( 
                        <div className={style.tarjet}>
                        <Cards name={coun.name}  difficulty={coun.difficulty} duration={coun.duration} season={coun.season} Countries={coun.Countries} id={coun.id}/>
                        </div>
                        )
                    })
                }
            </div>
         </div>
    )
}



export default Home;