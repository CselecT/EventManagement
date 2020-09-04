
import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import {AccountCircle} from "@material-ui/icons";
import RoomIcon from '@material-ui/icons/Room';
import Moment from "react-moment";

export default function TableContent(props) {

    let iconMap = {
        "update": <CreateIcon/>,
        "delete": <DeleteIcon/>,
        "applicants": <AccountCircleIcon/>,
        "booking":<AddIcon/>,
        "map":<RoomIcon/>
    }


    return (
        <TableBody>
            {getRowSlice().map(row => createTableRow(row))}
        </TableBody>

    );

    function getRowSlice() {
        return props
            .rows
            .slice(calculatePageBeginning(), calculatePageEnd());
    }

    function calculatePageBeginning() {
        return props.page * props.rowsPerPage;
    }

    function calculatePageEnd() {
        return props.page * props.rowsPerPage + props.rowsPerPage;
    }


    function createTableRow(row) {
        return (
            <TableRow hover role="checkbox" key={row.name}>
                {props.columns.map(column => createTableCell(column, row))}
            </TableRow>
        );
    }

    function createTableCell(column, row) {

        let cellValue = row[column.id];
        if(column.id=="startDate" || column.id=="endDate") {
            cellValue=
                <Moment format="DD/MM/YYYY HH:mm"  date={cellValue}/>

        }
        if (column.id === "update" || column.id === "delete" || column.id === "applicants" || column.id === "booking" || column.id==="map") {
            cellValue = createIcon(column.id, column.onClick, row.name);
        }

        return (
            <TableCell key={column.id} align={column.align}>
                {cellValue}
            </TableCell>
        );
    }

    function createIcon(key, onClick, name) {
        return (
            <IconButton aria-label={key} color="primary" onClick={() => onClick(name)}>
                {iconMap[key]}
            </IconButton>
        )
    }

}
