import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend:{
        display:false
    },
    elements:{
        point:{
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales:{
        xAxes: [
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat: "ll",
                }
            }
        ],
        yAxes:[
            {
                gridLines:{
                    display:false
                },
                ticks:{
                    callback: function(value,index,values){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}
const buildChartData = (data,type)=>{
    let charData=[];
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x: date,
                y:data[type][date]-lastDataPoint
            };
            charData.push(newDataPoint);
        }
        lastDataPoint=data[type][date];
    }
    return charData;
};

const LineGraph = ({type="cases"})=>{
    const [data,setData]=useState({});

    
    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then(result=>result.json())
        .then(data=>{
            
            let chartData= buildChartData(data,"cases");
            setData(chartData);
        })
    },[type]);
    

   
    return(
        <div>
            {data?.length>0 && (
                <Line 
                options={options}
                data={{
                    datasets:[
                        {
                            borderColor:"red",
                            data:data
                        }
                    ]
                }}
              />
            )}
            
        </div>
    );
};

export default LineGraph;
