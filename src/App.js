import React, { useState } from 'react';
import CitySearch from './CitySearch';
import AirQualityCard from './AirQualityCard';
import PollutantInfo from './PollutantInfo';
import AirQualityLevelsTable from './AirQualityLevelsTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);

  const getAirQuality = async (city) => {
    try {
      //Get your own free token from the from the World Air Quality Index Project API. Visit the link at the bottom of this page.
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_AQI_API_TOKEN}`);
      const data = await response.json();
      console.log(data)
      
      if (response.ok && data.status === 'ok') {
        setAirQualityData(data.data);
        setError(null);
      } else {
        setError("Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct.");
        setAirQualityData(null);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Sorry, something went wrong. Please try again later.');
      setAirQualityData(null);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Air Quality Index Checker</h1>
      
      <CitySearch getAirQuality={getAirQuality} />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {airQualityData && (
        <>
          <AirQualityCard data={airQualityData} />
          <PollutantInfo pollutant={airQualityData.dominentpol} />
        </>
      )}

      <AirQualityLevelsTable />
      <p>Location-specific API data sourced from the World Air Quality Index Project. <a href='https://aqicn.org/api/'>LINK</a></p>
    </div>
  );
}

export default App;