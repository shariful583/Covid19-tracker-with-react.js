import React from 'react';
import {TableContainer,Table,TableHead,TableRow,TableBody,TableCell} from '@material-ui/core';
import './Table.css';

const TableData = ({countries})=>{
    return(   
        <TableContainer className="Table">
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>Total Cases</TableCell>
                        <TableCell>Total Recovered</TableCell>
                        <TableCell>Total Deaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countries.map(data=>(
                        <TableRow hover>
                        <TableCell>{data.country}</TableCell>
                        <TableCell>{data.cases}</TableCell>
                        <TableCell>{data.recovered}</TableCell>
                        <TableCell>{data.deaths}</TableCell>
                    </TableRow>
                    ))}                 
                </TableBody>
            </Table> 
        </TableContainer>  
    );
}
export default TableData;