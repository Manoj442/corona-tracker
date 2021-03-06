import React from 'react';
import Chart from 'react-apexcharts';
import styles from './googleCharts.module.css';
import {Paper} from '@material-ui/core';

const DailyRegionalChart=(props)=>{
    console.log(props);
    var dataSeries=[];    
    switch (props.dataType) {
        case 'Active':
            dataSeries=props.data.regionData.map((rd)=>{
                if(rd.length){
                    return Number(rd[0].totalInfected); 
                }                    
            });              
            break;
        case 'Deaths':
            dataSeries=props.data.regionData.map((rd)=>{
                if(rd.length){
                    return Number(rd[0].deceased); 
                }                    
            });
            break;

         case 'Recovered':
            dataSeries=props.data.regionData.map((rd)=>{
                if(rd.length){
                    return Number(rd[0].recovered); 
                }                    
            });
            break;         
        default:
            break;
    }       
    const categories=props.data.lastUpdate;
    dataSeries = dataSeries.filter((item)=>item !== undefined)
    console.log(categories);
    console.log(dataSeries);
    const series = [{ name: props.dataType,data: dataSeries}];
    const options = {
      chart: {
        height: '50%',
        width:'50%',
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
      },
      theme: {
        palette: props.dataType === 'Deaths' ? 'palette7' : props.dataType === 'Recovered' ? 'palette8' : 'palette1'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'              
      },
      title: {
        text: `${props.dataType} Daily Count`
      },
      xaxis: {
        type: 'datetime',
        categories: categories
      },                  
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    }
    return(<div className={styles.apexLineChartDimension}>
            <Paper elevation={10}>                          
                <Chart options={options} series={series} 
        type="area"/>
        </Paper>
        </div>)
}
export default DailyRegionalChart;