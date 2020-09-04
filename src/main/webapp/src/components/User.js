import React, {useEffect, useState} from "react";
import axios from "axios";
import AppNavi from "./AppNavi";
import PaginationTable from "./table/PaginationTable";
import {toast, ToastContainer} from "react-toastify";
import BookingDialog from "./dialog/BookingDialog";
import OpenQrCode from "./OpenQrCode";
import GoogleApiWrapper from "./MyGoogleMaps";
import MyGoogleMaps from "./MyGoogleMaps";

export default function User(){

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };


    const [tableRows,updateTableRows]= useState([]);


    useEffect(()=>{
        axios.get("/events/users")
            .then(response => {
                updateTableRows(response.data);
            })
    },[]);

    const [open, setOpen] =useState(false);
    const [eventToApply, updateEventToApply]=useState("");

    //bu qr code icin
    const [openQr,setOpenQr]=useState(false);
    const [userInfo,updateUserInfo]=useState({});

    //map icin
    const [eventToShow, updateEventToShow]=useState({});
    const [mapOpen, setMapOpen]=useState(false) ;


    const handleClickOpen = (eventName) => {
        updateEventToApply(eventName);
        setOpen(true);
        setMapOpen(false);
    };

    const handleMapOpen=(eventName)=>{
        axios.get("/events/"+eventName).then(response=>{
            updateEventToShow(response.data);
        })
        setMapOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const onBookingSubmit = (inputData,eventName) => {

        axios.post("/events/"+eventName+"/booking",inputData).then(response=>{
            console.log(response.data);
            if(response.data.messageType==="SUCCESS"){
                updateUserInfo(inputData);
                setOpenQr(true);
                toast.success(response.data.message, toastOptions);
            } else{
                toast.error(response.data.message,toastOptions);
            }
        })
        handleClose();
    }

    const tableColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        {id: 'capacity', label: 'Capacity', minWidth: 170, align: 'right',},
        {id: 'availablePlace', label: 'Available Place', minWidth: 170, align: 'right',},
        {id: 'startDate', label: 'Start Date', minWidth: 170, align: 'right',},
        {id: 'endDate', label: 'End Date', minWidth: 170, align: 'right',},
        {id:'booking', label:'Apply for the Event',align: 'right',onClick:handleClickOpen},
        {id:'map', label:'Show Location',align: 'right',onClick:handleMapOpen}
    ];
    const bookingFields = [
        {id:"name",label:"Name", type:"text"},
        {id:"surname",label:"Surname", type:"text"},
        {id:"tcKimlikNo",label:"TC Identity Number", type:"text"},
        {id:"email",label:"Email", type:"email"},
    ]
    return(

        <div >
            <AppNavi/>
            <h2>Event List</h2>
            <PaginationTable rows={tableRows} columns={tableColumns}/>
            <BookingDialog onSubmit={onBookingSubmit} fields={bookingFields} eventName={eventToApply} open={open} handleClose={handleClose}/>
            <OpenQrCode open={openQr} eventName={eventToApply} user={userInfo}/>

            <MyGoogleMaps open={mapOpen} event={eventToShow}/>

            <ToastContainer/>
        </div>
    )


}