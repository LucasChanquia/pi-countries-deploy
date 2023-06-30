import axios from "axios";

export const getCountries = () => {
  try {
    return async  (dispatch) => {
      const { data } = await axios.get("countries");
      console.log(data);
      if(data.length)
      return dispatch({ type: "GET_COUNTRIES", payload: data });
    };
  } catch (error) {
    alert("Error: " + error.response.data.error);
  }
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`countries/${id}`);

      if (data.length) {
        return dispatch({
          type: "GET_COUNTRIES_DETAIL",
          payload: data,
        });
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const cleanDetail = () => {
  return {
    type: "CLEAN_DETAIL",
  };
};

export const addActivity = (activities) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "activities",
        activities
      );
      return dispatch({ type: "ADD_ACTIVITIES", payload: data });
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const getActivities = () =>{
    return async (dispatch)=> {
        try {
            const { data } = await axios.get("activities");
            return dispatch({ type: 'GET_ACTIVITIES', payload: data});
        } catch (error) {
            alert("Error: " + error.response.data.error);
        }
    }
}

export const onSearch = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `countries?name=${name}`
      );

      if (data.length) {
        return dispatch({
          type: "SEARCH_COUNTRIES",
          payload: data,
        });
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const deleteActivities = (id) => {

  return async (dispatch) =>{
    try {
      const { data } = await axios.delete(`activities/${id}`);

      console.log(data);

    
      if(data === 1){
        console.log("sdsdf",id);
        return dispatch({
          type: "DELETE_ACTIVITIES",
          payload: id
        })
      }
    } catch (error) {
      // alert("Error: " + error.response);
    }
  }
}

export const filterCountryByContinent = (payload) => {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
};

export const filterActivities = (payload) => {
  return {
    type: "FILTER_ACTIVITIES",
    payload,
  };
};

export const filterOrder = (payload) => {
  return {
    type: "FILTER_ORDER",
    payload,
  };
};
