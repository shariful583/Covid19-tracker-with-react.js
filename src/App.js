import React,{useState,useEffect} from 'react';
import {FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core';
import CovidInfo from './component/CovidInfo';
import Maps from './component/Map';
import TableData from './component/Table';
import LineGraph from './component/LineGraph/Linegraph';
import 'leaflet/dist/leaflet.css';
import {InfoLine} from './component/Helper/Helper';


import './App.css';

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:22,lng:91});
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries,setMapCountries]=useState([]);
  const [caseType,setCaseType] = useState("cases");


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
        setMapCountries(data);
        setTableData(data);
        setCountries(countries);
      });
    };

    
    getCountries();
  }, []);

 

  const oncountryChange=async(e)=>{
    const countrycode = e.target.value;
   
    const url = countrycode==="worldwide" ? "https://disease.sh/v3/covid-19/all":
                                    `https://disease.sh/v3/covid-19/countries/${countrycode}`;
    await fetch(url)
    .then(result=>result.json())
    .then((data)=>{
      setCountry(countrycode);
      setCountryInfo(data);
      countrycode==="worldwide"?setMapCenter({lat:22,lng:91}):setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      countrycode==="worldwide"?setMapZoom(3):setMapZoom(4);
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
        <CovidInfo 
              onClick={e=>setCaseType('cases')} 
              active={caseType==='cases'}
              color="cases"
              title="Todays Cases" cases={InfoLine(countryInfo.todayCases)} total={InfoLine(countryInfo.cases)} />
        <CovidInfo 
              onClick={e=>setCaseType('recovered')} 
              color="recovered"
              active={caseType==='recovered'}
              title="Todays Recoverd" cases={InfoLine(countryInfo.todayRecovered)} total={InfoLine(countryInfo.recovered)}/>
        <CovidInfo 
              onClick={e=>setCaseType('deaths')}
              color="deaths" 
              active={caseType==='deaths'}
              title="Todays Deaths" cases={InfoLine(countryInfo.todayDeaths)} total={InfoLine(countryInfo.deaths)}/>
      </div>
      <Maps caseType={caseType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <TableData countries={tableData} />
          <br/>
          <h3>Worldwide {caseType}</h3>
          <LineGraph type={caseType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
