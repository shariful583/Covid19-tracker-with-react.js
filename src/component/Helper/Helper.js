import React from 'react';
import {Circle,Popup} from 'react-leaflet';
import numeral from 'numeral';
const typeColors={
    cases:{
        hex:"#ffff00",
        rgb:"rgb(204,16,52)",
        half_op:"rgb(204,16,52,0.5)",
        multiplier:"800"
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)",
        half_op:"rgb(125,215,29,0.5)",
        multiplier:"1200"
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251,68,67)",
        half_op:"rgb(251,68,67,0.5)",
        multiplier:"2000"
    }
}

export const showDataOnMap=(data,type="cases")=>
     data.map((country)=>(
        <Circle center={[country.countryInfo.lat,country.countryInfo.long]}
                fillOpacity={0.4}
                color={typeColors[type].hex}
                fillColor={typeColors[type].hex}
                radius={Math.sqrt(country[type]) * typeColors[type].multiplier}>

                    <Popup>
                        <div>
                            <div style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
                            <div>{country.country}</div>
                            <div>Cases: {numeral(country.cases).format("0,0")}</div>
                            <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                            <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                        </div>
                    </Popup>
                
                </Circle>
    ));


    export const InfoLine=(info)=>
    info ? `+${numeral(info).format("0.0a")}` : "+0";
     
