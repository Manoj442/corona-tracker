import React from 'react';
import {Typography,Card,CardContent} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './../Cards/cards.module.css';
const DataCards =(props)=>{ 
  const data=props.data;                
      const dataCard =  
      <React.Fragment>       
        <div className={styles.cardDisplay}>
        <Card className={styles.noShadow}>
        {Object.keys(data).map((d,index)=>( 
      <CardContent key={index} className={styles.individualContent}>                     
        <Typography variant="h5" align="center">
        <CountUp className={d === 'Active' ? styles.active : d === 'Confirmed' ? styles.confirmed : 
        d === 'Deaths' ? styles.deaths : styles.recovered} start={0} 
        end={data[`${d}`]} duration = {3} separator=","/>
          </Typography>
          <Typography variant="overline" align="center" className={styles.caseText}>
          {d} 
        </Typography>          
      </CardContent>))}     
    </Card>
    </div>              
      </React.Fragment>
    return(
      <React.Fragment>{dataCard}</React.Fragment>)
}
export default DataCards;