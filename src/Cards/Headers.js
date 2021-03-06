import React,{Component,Fragment} from 'react';
import {Typography} from '@material-ui/core';
import styles from './../Cards/cards.module.css';
import logo from './../Images/covid19.jpg';
import logo2 from './../Images/india.jpg';
class Headers extends Component {
    render() {
        const props=this.props;
        const date= new Date(props.lastUpdate).toDateString() + ' ' +new Date(props.lastUpdate).toLocaleTimeString();        
        return ( 
            <div className={styles.headerContainer}>            
            <div className={styles.headerTextContainer}>    
                <h1 className={styles.titleDisplayer} align="center"> 
                 COVID-19 DASHBOARD       
                </h1>
                <h4 align="center" className={styles.time}>
                {props.lastUpdate ? date : null}
                </h4> 
            </div> 
            <div className={styles.imageDisplayer}>
               <img className={styles.imageStyle} src={logo} alt="Header Image"/>
            </div>                              
            </div>                         
        )
    }
}
export default Headers;
