import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Survey = () => {
    const [survey, setSurvey] = useState();
    const [locations, setLocations] = useState();
    const [countries, setCountries] = useState();

  
    useEffect(() => {
      getSurvey();
    }, []);
  
    const getSurvey = () => {
      let url = "http://104.248.0.49/api/v1/recruitment/forms/?node_type=Both";
      axios({
        method: "get",
        url: url,
        crossdomian: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("AccessToken")
          )}`,
        },
        timeout: 90000,
      })
        .then((res) => {
        //   console.log(res.data.locations);
          setSurvey(res.data);
          setLocations(res.data.locations)
          let countries_clean = res.data.locations
        //   .forEach(element => {
        //       return element.country
        //   })
          localStorage.setItem("Survey", JSON.stringify(res.data));
        //   console.log(countries_clean)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return ( 
        <div className="content-wrapper">
            <h2>
                Survey
            </h2> 

        </div>
     );
}
 
export default Survey;