import React,{useState,useEffect} from 'react';
import {FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core';
import CovidInfo from './component/CovidInfo';
import Maps from './component/Map';
import TableData from './component/Table';
import LineGraph from './component/LineGraph/Linegraph';
import 'leaflet/dist/leaflet.css';

import './App.css';

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:22.8016844,lng:94.4467525});
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(result=>{
      return result.json();
    })
    .then(data=>{
      setCountryInfo(data)
    })
  },[])
  useEffect(() => {
    const getCountries =async ()=>{
       await fetch("https://disease.sh/v3/covid-19/countries")
      .then((result)=> result.json()
      )
      .then(data=>{
       
        const countries = data.map((country)=>(
          {
            name:country.country,
            code:country.countryInfo.iso2
          }
        ));
        setTableData(data);
        setCountries(countries);
      });
    };

    
    getCountries();
  }, [])

  const oncountryChange=async(e)=>{
    const countrycode = e.target.value;
   
    const url = countrycode==="worldwide" ? "https://disease.sh/v3/covid-19/all":
                                    `https://disease.sh/v3/covid-19/countries/${countrycode}`;
    await fetch(url)
    .then(result=>result.json())
    .then((data)=>{
      setCountry(countrycode);
      setCountryInfo(data);
    })
   
  }
  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={country} onChange={oncountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country)=>(
             <MenuItem key={country.name} value={country.code}>{country.name}</MenuItem>
          ))}
        </Select> 
      </FormControl>
      </div>
      <div className="Covid">
        <CovidInfo title=" Todays Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <CovidInfo title="Todays Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <CovidInfo title=" Todays Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
      <Maps center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <TableData countries={tableData} />
          <br/>
          <h3>Worldwide Cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
