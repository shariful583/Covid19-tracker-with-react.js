import React from 'react';
import {Card, CardContent,Typography} from '@material-ui/core';
import './CovidInfo.css';
const CovidInfo = ({title,cases,total,color,active,...props})=>{
    return(
        <Card onClick={props.onClick} className={`Covidinfo ${active && color}`}>
            <CardContent>
                <Typography className="Covidinfo_title" color="textSecondary">{title}</Typography>
                <h2 className="Covidinfo_cases">{cases}</h2>
                <Typography className="Covidinfo_total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    );
};

export default CovidInfo;