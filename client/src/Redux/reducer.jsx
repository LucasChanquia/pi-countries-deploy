

const initialState = {
    allCountries: [], // Estado local que contiene todos los países
    allCountriesFilter: [],  // estado local donde se van actualizando los filtros
    countryDetail: [],
    allActivities: [],
    allActivitiesFilter: []
}

const reducer = (state = initialState, action) => {
    
    switch(action.type){

        case 'GET_COUNTRIES':

        return {
            ...state,
            allCountries: action.payload,
            allCountriesFilter: action.payload,
            allActivitiesFilter: []
        }

        case 'GET_COUNTRIES_DETAIL':
        return{
            ...state,
            countryDetail: action.payload
        }

        case 'CLEAN_DETAIL':
            return{
                ...state, 
                countryDetail: []
            }

        case 'ADD_ACTIVITIES':
            return{
                ...state,
                allCountriesFilter: [],
                allActivities: action.payload,
                allActivitiesFilter: action.payload
            }
            
        case 'GET_ACTIVITIES':
            return{
                ...state,
                allActivities: action.payload
            }

        case 'SEARCH_COUNTRIES':
            
            return {
                ...state,
                allCountriesFilter: action.payload,
                allActivitiesFilter: [],
               
            }

        case 'FILTER_BY_CONTINENT':
            const allCountries = [...state.allCountries]
            
            const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(coun => coun.continent === action.payload)
            
            return {
                ...state,
                allActivitiesFilter: [],
                allCountriesFilter: continentFiltered

            }

        case 'FILTER_ACTIVITIES':
            const allActivities = [...state.allActivities]
            
            
            const allActivitiesFiltered = action.payload === 'All' ? allActivities : allActivities.filter(coun => coun.name === action.payload)
        
            return {
                ...state,
                allCountriesFilter: [],
                allActivitiesFilter: allActivitiesFiltered
                // ...state,
                // allCountries: allActivitiesFilter.filter(coun => coun.Activities[0].name === action.payload)
            }

        case 'FILTER_ORDER':
            const allCountries1 = state.allCountriesFilter
            console.log(allCountries1);

             let allCountriesFilterByOrder
            
            if(action.payload === 'A'){
                allCountriesFilterByOrder = allCountries1.sort((a,b) => a.name.localeCompare(b.name))
            }

            if(action.payload === 'D'){
                allCountriesFilterByOrder = allCountries1.sort((a,b) => b.name.localeCompare(a.name))
            }

            if(action.payload === 'P'){
                allCountriesFilterByOrder = allCountries1.sort((a,b) => a.population - b.population)
            }

            if(action.payload === 'G'){
                allCountriesFilterByOrder = allCountries1.sort((a,b) => b.population - a.population)
            }
            
            return{
                ...state,
                allCountriesFilter: [...allCountriesFilterByOrder]
            }

            case "DELETE_ACTIVITIES":
            const allActivities1 = state.allActivities.filter(e => e.id !== action.payload)

            return{
                ...state,
                allActivitiesFilter: [...allActivities1],
                allActivities: [...allActivities1]
            }

            
        default : return {...state}
    }

}
    
   

export default reducer;