import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './googleCharts.module.css';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
const StyledTableCell = withStyles((theme) => ({
  head: {   
    color: 'white',
    fontWeight:'bold'
  },
  body: {
    fontSize: 14,    
    color:'black'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'lavender',
    },
    '&:nth-of-type(even)':{
      backgroundColor:'lightgrey'
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderSpacing:'3px',
    borderCollapse:"separate",
    background: "rgb(69,60,223)",
background: "linear-gradient(90deg, rgba(69,60,223,1) 0%, rgba(17,101,126,1) 36%, rgba(45,210,194,1) 100%)"
  }  
});

export default function StateTable(props) {
 const classes = useStyles();
 const data = props.data.regionData;
 const headers=['State','Active','Recovered','Deaths']
 console.log(data.regionData);
  return (          
    <TableContainer className={styles.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
              {
                  headers.map((header,index)=>{
                  return <StyledTableCell align="center" 
                  rowSpan={header === 'State' ? 2 : 1} 
                  colSpan={header !== 'State' ? 2 : 1} 
                  style={{width:'15%'}}
                   key={index}>{header}</StyledTableCell>})
              }                      
          </TableRow>
          <TableRow>
            <StyledTableCell align="center"  style={{width:'15%'}}>Total</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'15%'}}>Change Since Yesterday</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'15%'}}>Total</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'15%'}}>Change Since Yesterday</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'15%'}}>Total</StyledTableCell>
            <StyledTableCell align="center"  style={{width:'15%'}}>Change Since Yesterday</StyledTableCell>
              </TableRow>
        </TableHead>
        <TableBody>            
          {data.map((row,index) => (
            <StyledTableRow key={index}>
              {
                Object.keys(row).map((item,i)=>{
                  return <StyledTableCell key={i}
                  style={item.indexOf('new') !== -1 ? 
                  row[item] > 0 ? 
                  {color:'green'}:row[item] === 0 ? {color:'black'}:{color:'red'}:{color:'black'}}
                   align="center">
                     {item.indexOf('new') !== -1 ? 
                  row[item] > 0 ? row[item]:row[item].toString().replace('-',' '):row[item]}
                  {item.indexOf('new') !== -1 ? row[item] > 0 ? 
                  <ArrowUpwardIcon style={{color:'green',verticalAlign:'bottom'}}/>:
                  row[item] === 0 ? null :
                  <ArrowDownwardIcon style={{color:'red',verticalAlign:'bottom'}}/>:                  
                  row[item] === 0 ? null:null
                }
                     </StyledTableCell>
                })
              }             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>    
  );
}