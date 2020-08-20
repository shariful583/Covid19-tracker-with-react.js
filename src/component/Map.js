import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import {showDataOnMap} from './Helper/Helper';
import './Map.css';
const Maps = ({countries,caseType,center,zoom})=>{
    return(
        <div className="Map">
            <Map center={center} zoom={zoom}>
                <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="http://osm.org/copyright">OpenstreetMap</a>Contributor'
                />
                {showDataOnMap(countries,caseType)}
            </Map>
        </div>
    );
}
export default Maps;