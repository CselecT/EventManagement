import PaginationTable from "./table/PaginationTable";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AppNavi from "./AppNavi";

export default function Home(){


    return(

        <div >
            <AppNavi/>
            <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Welcome to SelectEve!</h2>
        </div>

    )
}