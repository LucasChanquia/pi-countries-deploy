const { Router } = require("express");
const {getAllCountries, getCountryById, getCountryByName} = require ('../controllers/index');


const countriesRouter = Router();

countriesRouter.get('/', async (req, res)=>{
    const { name } = req.query
    
    try {
        if(name){
            const countryName = await getCountryByName(name)
           
                if(!countryName.length){
                    throw Error(`${name} no representa a ningún país`)
                } else {
                return res.status(200).json(countryName)
                }
        } else {
            const allCountries = await getAllCountries();
            console.log("asasdasda", allCountries);
            return res.status(200).json(allCountries)
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

countriesRouter.get('/:id', async (req, res) => {
    
    const { id } = req.params
        
    try {
        if(id){
        const countryId = await getCountryById(id)
            
            if(!countryId.length) throw Error(`No existe el país ${id}`)
            else {
            return res.status(200).json(countryId)
            }
       } 
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
})

// Handle requests to unknown routes
countriesRouter.all('*', (req, res) => {
    res.status(404).send(`Unknown route: ${req.method} ${req.originalUrl}`);
});

module.exports = countriesRouter;
