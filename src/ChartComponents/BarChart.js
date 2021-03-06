import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import styles from './googleCharts.module.css';
import {Paper} from '@material-ui/core';
class BarChart extends Component{
    constructor(props){
        super(props);
        //console.log(props.data.regionData);
        const data = this.props.chartData;        
        const categories=this.props.data.regionData.map(({region})=>region); 
        const colors = this.props.title === 'Deaths' ? ['#FF4500'] : 
        this.props.title === 'Recovered' ? ['lawngreen'] : 
        this.props.title === 'Active' ? ['#FFD700'] :
        this.props.title === 'Confirmed'? ['cornflowerblue'] :[]
        //console.log(data);
        const name='' ;  
        this.state = {          
            series: [{
              name:name,
              data: data
            }],
            options: {
              chart: {
                type: 'bar',
                height: 1000,
                stacked: true,
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },                
              },
              legend:{
                show:true,
                showForNullSeries: true,
                showForZeroSeries: true,
                inverseOrder:true
              },              
              plotOptions: {
                bar: {
                  horizontal: true,
                },                
              },
              dataLabels: {
                enabled: false
              },
              title: {
                text: `${this.props.title} count across the states`
              },
              xaxis: {
                categories: categories,                
              },                          
              fill:{
                colors:colors
              }            
            },                    
          }; 
    }       
    render(){        
        return <div className={styles.apexLineChartDimension}>
        <Paper elevation={5}><Chart options={this.state.options} series={this.state.series} type="bar" 
        height={800} />
        </Paper>                    
        </div>
    }
}
export default BarChart;