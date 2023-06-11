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
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=1acab2af9421d362c35d95dd34b3b3292dc124e7`);
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
    </div>
  );
}

export default App;