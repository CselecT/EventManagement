/*import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";


export default function TableContent(props){


return(
    <TableBody>
        {props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row) => {
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {value}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        })}
    </TableBody>
)

}*/
import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import {AccountCircle} from "@material-ui/icons";

export default function ApplicantsContent(props) {

    let iconMap = {
        "update": <CreateIcon/>,
        "delete": <DeleteIcon/>,
        "applicants": <AccountCircle/>
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
            <TableRow hover role="checkbox" key={row.tcKimlikNo}>
                {props.columns.map(column => createTableCell(column, row))}
            </TableRow>
        );
    }

    function createTableCell(column, row) {

        let cellValue = row[column.id];
        if (column.id === "update" || column.id === "delete" || column.id === "applicants") {
            cellValue = createIcon(column.id, column.onClick, row.tcKimlikNo);
        }

        return (
            <TableCell key={column.id} align={column.align}>
                {cellValue}
            </TableCell>
        );
    }

    function createIcon(key, onClick, tcKimlikNo) {
        return (
            <IconButton aria-label={key} color="primary" onClick={() => onClick(tcKimlikNo)}>
                {iconMap[key]}
            </IconButton>
        )
    }

}
