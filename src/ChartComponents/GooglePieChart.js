import React, { Component } from 'react';
import {Chart} from 'react-google-charts';
import {Paper} from '@material-ui/core';
import styles from './googleCharts.module.css';
//import styles from './../Charts/GoogleCharts/googleCharts.module.css';
class PieChart extends Component{
    render(){      
      const regionalData=this.props.regionData;         
        return <div className={styles.pieChartDimension}><Paper elevation={5}><Chart 
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Cases', 'Numbers'],
            ['Active', regionalData[0].totalInfected],
            ['Deaths', regionalData[0].deceased],
            ['Recovered', regionalData[0].recovered]   
          ]}
          options={{
            title: `Current status in ${this.props.region}`,
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        /></Paper>
        </div>
    }
}
export default PieChart;