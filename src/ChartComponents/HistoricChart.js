import React from 'react';
import Chart from 'react-apexcharts';
import styles from './googleCharts.module.css';
import {Paper} from '@material-ui/core';

const DailyChart=(props)=>{
  console.log(props.chartData);
  var dataSeries=[];    
  switch (props.dataType) {
      case 'Active':
          dataSeries=props.chartData.map(({activeCases})=>activeCases);
          break;
      case 'Deaths':
          dataSeries=props.chartData.map(({deaths})=>deaths);
          break;
       case 'Recovered':
          dataSeries=props.chartData.map(({recovered})=>recovered);
          break;
        case 'Confirmed':
          dataSeries= props.chartData.map(({totalCases})=>totalCases); 
          break;     
      default:
          break;
  }    
    const categories=props.chartData.map(({lastUpdatedAtApify})=>lastUpdatedAtApify);
    const series = [{ name: props.dataType,data: dataSeries}]
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
        palette: props.dataType === 'Deaths' ? 'palette7' : props.dataType === 'Recovered' ? 'palette8':props.dataType === 'Confirmed'?'palette6' : 'palette1'        
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'              
      },
      title: {
        text: `${props.dataType} Count`
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
            <Paper elevation={10}><Chart options={options} series={series} 
        type="line"/>
        </Paper>
        </div>)
}
export default DailyChart;