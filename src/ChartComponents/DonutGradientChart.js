import React from 'react'
import Chart from 'react-apexcharts';
import styles from './googleCharts.module.css';
import { Paper } from '@material-ui/core';
const DonutGradientChart=(props)=>{  
    var series=[props.data.Active, props.data.Deaths, props.data.Recovered];
    var labels=Object.keys(props.data);
    labels=labels.filter((label)=>label !== 'Confirmed');    
    const options={
        chart: {
          width: 380,
          type: 'donut'
        },
        fill:{
          type:'gradient'
        },
        labels: labels,  
        title: {
          text: 'Current Statistics'
        },                   
        dataLabels: {
          enabled: true
        },theme: {
          mode: 'light', 
          palette: 'palette1'         ,
      }
        ,       
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
      return(  
            <div className={styles.donutChart}> 
            <Paper elevation={10}>            
            <Chart options={options} series={series} type="donut" 
        height={300} width={500}/>
        </Paper>
        </div>
        )
}
export default DonutGradientChart
