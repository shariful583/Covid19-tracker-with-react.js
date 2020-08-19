import React from 'react';
import {Card, CardContent,Typography} from '@material-ui/core';
const CovidInfo = ({title,cases,total})=>{
    return(
        <Card className="Covidinfo">
            <CardContent>
                <Typography className="Covidinfo_title" color="textSecondary">{title}</Typography>
                <h2 className="Covidinfo_cases">{cases}</h2>
                <Typography className="Covidinfo_total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    );
};

export default CovidInfo;