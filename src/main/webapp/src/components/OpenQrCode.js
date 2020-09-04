import React, {Suspense, useEffect, useState} from "react";

import QRCode from "qrcode.react";
import axios from "axios";
import MyQrCode from "./MyQrCode";
import Spinner from "reactstrap/lib/Spinner";
import moment from "moment";


export default function OpenQrCode(props) {

    const [event,updateEvent]=useState({});
   // const [applicant,updateApplicant]=useState({});

    useEffect(()=>{
        axios.get("/events/"+ props.eventName)
            .then(response=>{
                updateEvent(response.data)});

       /* axios.get("/events/admin/"+ props.eventName + "/" + props.tcKimlik)
            .then(response=>{
                updateApplicant(response.data)
            });*/

    });
    const myValue=event.name +"\n"+event.description+"\n"+ moment(event.startDate).format("DD/MM/YYYY HH:mm")   +" - "+moment(event.endDate).format("DD/MM/YYYY HH:mm") + "\n \n"
            + props.user.name + " " + props.user.surname + "\n" + props.user.tcKimlikNo + "\n" + props.user.email;


    return (
        <MyQrCode myValue={myValue} open={props.open}/>
    );


}