import axios from 'axios';
const url='https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true';
const historicUrl='https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1';
//'https://covid19.mathdro.id/api';

export const fetchNationalData=async()=>{
    try{
    const data= await axios.all([axios.get(url),axios.get(historicUrl)]) ;
    console.log(data[0].data);
    console.log(data[1].data)
    return data;
    }
    catch(error){
        console.log(error);
    }    
}
// export const fetchHistoricData=async()=>{
//     try{
//     const constHistoricData = await axios.get(historicUrl);
//     console.log(constHistoricData);
//     return constHistoricData;

//     }
//     catch(error){
//         console.log(error);
//     }
// }
// export const fetchDate=async(country)=>{
//     let changeableUrl=url;
//     if(country){
//         changeableUrl=`${url}/countries/${country}`;
//     }
//     try{
//         const {data:{confirmed,deaths,recovered,lastUpdate}}=await axios.get(changeableUrl);
//         const modifiedData={
//             confirmed,
//             deaths,
//             recovered,lastUpdate
//         }
//         console.log(modifiedData)
//         return modifiedData;
//     }
//     catch(error){
//         console.log(error);
//     }
// }

// export const fetchCountries=async()=>{
//     const countryUrl=`${url}/countries`;
//  const {data:{countries}}=await axios.get(countryUrl);
//  return countries.map((country)=>country.name);
//  //console.log(countries);
// }
// export const fetchDailyData=async()=>{
//     const dailyDataUrl=`${url}/daily`;
//  const dailyData=await axios.get(dailyDataUrl);
//  console.log(dailyData);
//  return dailyData.data.map((d)=>({
//      confirmed:d.confirmed.total,
//     deaths:d.deaths.total,
//     date:d.reportDate}));
// }


