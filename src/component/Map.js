import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import './Map.css';
const Maps = ({center,zoom})=>{
    return(
        <div className="Map">
            <Map center={center} zoom={zoom}>
                <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution='&copy; <a href="http://osm.org/copyright">OpenstreetMap</a>Contributor'
                />
            </Map>
        </div>
    );
}
export default Maps;