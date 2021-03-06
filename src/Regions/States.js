import React, {Component} from 'react';
import {FormControl, NativeSelect, Typography} from '@material-ui/core';
import styles from './../Regions/States.module.css';
class Regions extends Component{  
constructor(props){
    super(props);
    this.state={
        regions:[]
    }
}
    render(){
        const data=this.props.data;
        const regionalData=data.regionData;       
        return(
            <FormControl className={styles.countryDropdownContainer}>
                <h4 className={styles.regionLabel}>
                Select a Region:
                </h4>
                <NativeSelect className={styles.countryDropdown} onChange={(e)=>this.props.changeRegion(e.target.value)}>
                    <option value="National">National</option>
                    {regionalData.map((data,index)=>{
                        return <option key={index} value={data.region}>{data.region}</option>
                    })}
                </NativeSelect>
            </FormControl>)
}
}
export default Regions;