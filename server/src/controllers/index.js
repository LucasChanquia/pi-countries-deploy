const fs = require('fs');
const { Country, Activity } = require('../db')
const { Op } = require('sequelize');
const axios = require('axios');











const getAllCountries = async () => {

  fs.readFile('\api\\db.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return;
    } else {
      const countries = JSON.parse(data);
      
      const infoApi = countries.countries.map((e) => {
        return {
          id: e.cca3,
          name: e.name.common,
          image: e.flags.svg,
          continent: e.continents[0],
          capital: e.capital ? e.capital[0] : 'Not Found',
          subregion: e.subregion ? e.subregion : 'Not Found',
          area: e.area,
          population: e.population,
        }  
      }
      )

      for (let i = 0; i < infoApi.length; i++) {
        await Country.findOrCreate({
          where: { name: infoApi[i].name },
          defaults: infoApi[i],
        })
      }
    }

    const dbCountry = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: {
          attributes: []
        }
      }
    });
    console.log("dvb country", dbCountry);
    return dbCountry;
  }
  )

  //   const dbCountries = Country.findAll()

  //     if(!dbCountries.length){
  //       const urlApi = await axios.get('http://localhost:5000/countries')
  //       const infoApi = await urlApi.data.map((e)=>{
  //         return {
  //           id: e.cca3,
  //           name: e.name.common,
  //           image: e.flags.svg,
  //           continent: e.continents[0],
  //           capital: e.capital ? e.capital[0] : 'Not Found',
  //           subregion: e.subregion ? e.subregion: 'Not Found',
  //           area: e.area,
  //           population: e.population,
  //         }
  //       });

  //       for (let i = 0; i < infoApi.length; i++) {
  //         await Country.findOrCreate({ 
  //           where: {name: infoApi[i].name}, 
  //           defaults: infoApi[i],
  //         })
  //       }
  //     }

  //    const dbCountry =  await Country.findAll({
  //     include: {
  //       model: Activity,
  //       attributes: ["name","difficulty","duration","season"],
  //       through: {
  //         attributes: []
  //       }
  //     }
  //  });
  //    return dbCountry;
}

const getCountryById = async (id) => {

  const countryFilter = await Country.findAll({
    where: { id },
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: []
      }
    }
  })

  return countryFilter

}
const getCountryByName = async (name) => {

  const countryFiltered = await Country.findAll({
    where:
    {
      name:
      {
        [Op.iLike]:
        `%${name}%`
      }
    }
  })

  return countryFiltered
}

const postActivities = async (name, difficulty, duration, season, pais) => {

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  })

  for (let i = 0; i < pais.length; i++) {

    const findCountry = await Country.findAll({ where: { name: pais[i] } })

    await newActivity.addCountries(findCountry)
  }

  const activity = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }
  })

  return activity

}

const getAllActivities = async () => await Activity.findAll({
  include: {
    model: Country,
    attributes: ["name"],
    through: {
      attributes: []
    }
  }
});

const deleteActivities = async (id) => await Activity.destroy({ where: { id } })

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
  postActivities,
  getAllActivities,
  deleteActivities,
};