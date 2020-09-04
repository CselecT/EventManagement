import React, {useEffect, useState} from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import axios from "axios";



export default function MyGoogleMaps(props) {

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    if(props.open){
        return (
            <div>
            <LoadScript
                googleMapsApiKey="AIzaSyBUYY8t4ANUcLUaPWvt4wzxGgVwYZ9vbPE"
            >
                <h3> Location of {props.event.name}</h3>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat:props.event.lat,lng:props.event.lng}}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <Marker position={{lat:props.event.lat,lng:props.event.lng}}
                    />

                </GoogleMap>
            </LoadScript>
            </div>
        )  ;
    }
    else{
        return (
            <div/>
        );
    }

}

    //apiKey: 'AIzaSyBUYY8t4ANUcLUaPWvt4wzxGgVwYZ9vbPE'
