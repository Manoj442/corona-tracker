import React, {Component} from 'react';
//import logo from './logo.svg';
import styles from './App.module.css';
import {fetchNationalData} from './API/index';
import DataCards from './Cards/DataCards';
import Regions from './Regions/States';
import DonutGradientChart from './ChartComponents/DonutGradientChart';
import HistoricChart from './ChartComponents/HistoricChart';
import RegionalHistoricChart from './ChartComponents/RegionalHistoricChart';
import LinearProgress from '@material-ui/core/LinearProgress';
import StateTable from './ChartComponents/StatewiseData';
import Headers from './Cards/Headers';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import IconButton from '@material-ui/core/IconButton';
//import axios from 'axios';
class App extends Component{ 
  cardData={};
  nationalData={};
  lastUpdate='';
  historicData=[];
  regionHistoricData=[];
  constructor(){
    super();
    this.state={
      data:{},
      region:'',
      regionData:{},
      historicData:[],
      loading:true,
      cardData:{},
      lastUpdate:'',
      regionHistoricData:[],
      theme:'dark'
      }
    }    
  async componentDidMount(){
    const data=await fetchNationalData();
    //console.log(data);   
    this.nationalData=data[0].data;
    this.lastUpdate = data[0].data.lastUpdatedAtApify;
    //console.log(this.nationalData);
    this.setCardData(this.nationalData,'National');
    this.fetchRegHistoricData(data[1].data);
    var sortedData=[];
    if(data[1].data.length){      
      sortedData=[...data[1].data].slice().sort();
      //console.log(sortedData);
    }       
    this.setState(
      {
        data:data[0].data,
        historicData:sortedData,
        loading:false,
        cardData:this.cardData,
        lastUpdate:this.lastUpdate
      });
  }
  fetchRegHistoricData=(regionalData)=>{
    console.log(regionalData);
    let retrievedRegionData=[];   
    regionalData.map((rd,index)=>{
      retrievedRegionData[index]={
        regionData:rd.regionData,
        lastUpdate:rd.lastUpdatedAtApify
      };
    });
    this.regionHistoricData=retrievedRegionData.filter(regData=> regData.regionData !== undefined)
    console.log(this.regionHistoricData);
  }
  setCardData=(data,dataType)=>{
    if(dataType === 'National'){
      this.cardData = {
        Active:data.activeCases,
        Deaths:data.deaths,
        Recovered:data.recovered,
        Confirmed:data.totalCases
      }
    }
    else{
      this.cardData = {
        Active:data[0].totalInfected,
        Deaths:data[0].deceased,
        Recovered:data[0].recovered
      }
    }    
  }
  setRegionHistoricData=(region)=>{
    var regionData = this.regionHistoricData.map((data)=>
      data.regionData.filter((rd)=>rd.region === region)
    );
    var allDates = this.regionHistoricData.map((data)=>{
      return data.lastUpdate
    })
    console.log(regionData);
    console.log(allDates);
    return {
      regionData:regionData,
      lastUpdate:allDates
    }

  }
  handleRegionChange=(region)=>{    
    if(region === "National"){
      this.setCardData(this.nationalData,region);
      this.setState({
        regionData:{},
        cardData:this.cardData,
        regionHistoricData:{}
      })
    }
    else{
      const prevData=this.state.data.regionData;
      const regionData = prevData.filter(r=>r.region === region);       
      this.setCardData(regionData,region);  
      var historicData=this.setRegionHistoricData(region);  
      this.setState({
        regionData:regionData,
        region:region,
        cardData:this.cardData,
        regionHistoricData:historicData
      })
    }   
  }
  toggleTheme=(themePassed)=>{   
    this.setState({
      theme:themePassed
    })
  }
  render(){   
    console.log(this.state.regionHistoricData);  
    const card= this.state.data.activeCases ? <div className={styles.cardsAndDropDown}><DataCards lastUpdate={this.state.lastUpdate}
    data={this.state.cardData}/>
    { this.state.data.hasOwnProperty('regionData')?
        <Regions data={this.state.data} changeRegion={this.handleRegionChange}/>:
        null
        }</div>:null;    
    return(
      <div>        
         <Headers lastUpdate={this.state.lastUpdate}/>        
        {this.state.loading ? <div style={{margin:'3%'}}>
          <br/>
          <label>Loading Please wait...</label>
          <br/>
          <LinearProgress color="secondary" /></div>
           : null}               
          {card}                      
        {
           this.state.data.hasOwnProperty('regionData')? 
          <div className={styles.tableAndDropDown}>
            <StateTable data={this.state.data}/> 
            <div style={{display:'block'}}> 
            {
              Object.keys(this.state.cardData).length ?  
              <DonutGradientChart data={this.state.cardData}/> 
              : null
            }                               
        </div>   
          </div>:null
        }                                      
        <br/>  
        <div className={styles.regionalHistoricChart}>                    
        {          
          !Object.keys(this.state.regionHistoricData).length ?
          Object.keys(this.state.cardData).map((val,index)=>{
          return <HistoricChart key={index} dataType={val} chartData={this.state.historicData}/>
           }):null
        }
        </div>        
          <div className={styles.regionalHistoricChart}>
            {
          Object.keys(this.state.regionHistoricData).length ?
          Object.keys(this.state.cardData).map((val,index)=>{
            if(val !== 'Confirmed')                        
            return <RegionalHistoricChart key={index} dataType={val} data={this.state.regionHistoricData}/>           
          }):null          
        }
        </div>
        <br/>            
      </div>      
    )
  }
}
export default App;
