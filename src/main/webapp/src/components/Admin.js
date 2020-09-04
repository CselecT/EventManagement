import React, {useEffect, useState} from "react";
import axios from "axios";
import AppNavi from "./AppNavi";
import PaginationTable from "./table/PaginationTable";
import {Button} from "@material-ui/core";
import PlusIcon from '@material-ui/icons/Add';
import AddEventDialog from "./dialog/AddEventDialog";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateEventDialog from "./dialog/UpdateEventDialog";
import ApplicantsTable from "./table/ApplicantsTable";
import {BarChartDemo, EventChart} from "./EventChart";
import MyGoogleMaps from "./MyGoogleMaps";


export default function Admin() {



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
    const [nameToUpdate, updateNameToUpdate]= useState("");
    const [applicantsRows,updateApplicantsRows]= useState([]);
    const [eventNameOfApplicants, updateEventNameOfApplicant]=useState("");


    useEffect(()=>{
        axios.get("/events")
            .then(response => {
                updateTableRows(response.data);
    })},[]);


    const onEventAddSubmit = (inputData) => {
        axios.post("/events/add",inputData).then(response=>{
            console.log(response.data);
            if(response.data.messageType==="SUCCESS"){
                toast.success(response.data.message, toastOptions);
                updateTableRows([...tableRows,inputData]);
            } else{
                toast.error(response.data.message,toastOptions);
            }
        })
        handleClose();
    }

    const onEventDelete=(name)=>{
        axios.delete("/events/admin/"+name).then(response=>{
            if(response.data.messageType==="SUCCESS"){
                updateTableRows(tableRows.filter(event=>event.name!==name));
                toast.success(response.data.message, toastOptions);
            }else{
                toast.error(response.data.message, toastOptions);
            }
        })
    }

    const onEventUpdate=(inputData, name)=>{
        axios.put("events/admin/"+name+"/edit",inputData).then(response=>{
            if(response.data.messageType==="SUCCESS"){
                toast.success(response.data.message,toastOptions);
            }
            else{
                toast.error(response.data.message, toastOptions);
            }
        })
        handleClose();
    }
    const onApplicantDelete=(tcKimlik)=>{
        axios.delete("/events/admin/"+eventNameOfApplicants+"/"+tcKimlik).then(response=>{
            if(response.data.messageType==="SUCCESS"){
                updateApplicantsRows(applicantsRows.filter(app=>app.tcKimlikNo!==tcKimlik))
                toast.success(response.data.message,toastOptions);
            }
            else{
                toast.error(response.data.message, toastOptions);
            }
        })
    }

    const [open, setOpen] =useState(false);
    const [updateOpen, setUpdateOpen]=useState(false);

    const handleUpdateClickOpen=(name)=>{
        setUpdateOpen(true);
        updateNameToUpdate(name);
    }

    const handleApplicantsUpdate=(name)=>{
        updateEventNameOfApplicant(name);
        axios.get("/events/admin/"+name).then(response=>{
            updateApplicantsRows(response.data);
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdateOpen(false);
        setMapOpen(false);
    };

    //map icin
    const [eventToShow, updateEventToShow]=useState({});
    const [mapOpen, setMapOpen]=useState(false) ;

    const handleMapOpen=(eventName)=>{
        axios.get("/events/"+eventName).then(response=>{
            updateEventToShow(response.data);
        })
        setMapOpen(true);
    }
    const tableColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        {id: 'capacity', label: 'Capacity', minWidth: 170, align: 'right',},
        {id: 'availablePlace', label: 'Available Place', minWidth: 170, align: 'right',},
        {id: 'startDate', label: 'Start Date', minWidth: 170, align: 'right',},
        {id: 'endDate', label: 'End Date', minWidth: 170, align: 'right',},
        {id: 'lat', label: 'Lat', minWidth: 100, align: 'right' },
        {id: 'lng', label: 'Lng', minWidth: 100, align: 'right' },
        {id:'delete', label:'Delete Event',align: 'right',onClick:onEventDelete},
        {id:'update', label:'Update Event',align: 'right',onClick:handleUpdateClickOpen},
        {id:'applicants', label:'See Applicants',align: 'right',onClick:handleApplicantsUpdate},
        {id:'map', label:'Show Location',align: 'right',onClick:handleMapOpen}
    ];
    const applicantsColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'surname', label: 'Surname', minWidth: 100 },
        {id: 'tcKimlikNo', label: 'TC Identity Number', minWidth: 170, align: 'right',},
        {id: 'email', label: 'Email', minWidth: 170, align: 'right',},
        {id:'delete',label:'Delete Applicant',align: 'right',onClick:onApplicantDelete}
    ];

    const eventDialogFields = [
        {id:"name",label:"Event Name", type:"text"},
        {id:"description",label:"Description", type:"text"},
        {id:"capacity",label:"Capacity", type:"numeric"},
        {id:"startDate",label:"Starting", type:"datetime-local", defaultValue:"2020-01-01T10:30"},
        {id:"endDate",label:"Ending", type:"datetime-local", defaultValue:"2020-01-01T12:00"},
        {id:"lat",label:"Lat", type:"numeric"},
        {id:"lng",label:"Lng", type:"numeric"}
    ];


    return(

        <div >
            <AppNavi/>
            <h2>Event List</h2>
            <PaginationTable rows={tableRows} columns={tableColumns}/>
            <Button
                variant="contained"
                color="primary"
                style={{float:"right"}}
                onClick={handleClickOpen}
                startIcon={<PlusIcon/>}>Add Event</Button>
            <AddEventDialog onSubmit={onEventAddSubmit} fields={eventDialogFields} open={open} handleClose={handleClose}/>
            <UpdateEventDialog eventName={nameToUpdate} onSubmit={onEventUpdate} fields={eventDialogFields} open={updateOpen} handleClose={handleClose}/>
            <h2>Applicants for the Event: {eventNameOfApplicants}</h2>
            <ApplicantsTable rows={applicantsRows} columns={applicantsColumns} />
            <MyGoogleMaps open={mapOpen} event={eventToShow}/>
            <EventChart />
            <ToastContainer/>
        </div>
    )

};