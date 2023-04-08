import React from 'react'
import  { useState,useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, limitToLast,orderByKey,on,query } from 'firebase/database'
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
//<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyCDTs2bwZEXNyZyYnJXkY0y1sKjx3gNbb8",
    authDomain: "trab1-8a275.firebaseapp.com",
    databaseURL: "https://trab1-8a275-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "trab1-8a275",
    storageBucket: "trab1-8a275.appspot.com",
    messagingSenderId: "219200975836",
    appId: "1:219200975836:web:649d5e37967095a6fb1519",
    measurementId: "G-RCB4G01MKB"
    // your Firebase project configuration
};

const app = initializeApp(firebaseConfig);
  
const db = getDatabase(app);
let inputValue;
export default function Firedatabase(){
    const [datax,setDatax]=React.useState();
    const [datay,setDatay]=React.useState();
    const [dataz,setDataz]=React.useState();
    const [datat,setDatat]=React.useState();
    const [limit,setLimit]=React.useState(45);

    const dataxg= {
      labels: datat,
      datasets: [{
      label: 'Grafico X',
      data: datax,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
      }]
    };
    const datayg= {
      labels: datat,
      datasets: [{
      label: 'Grafico Y',
      data: datay,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
      }]
    };
    const datazg= {
      labels: datat,
      datasets: [{
      label: 'Gráfico Z',
      data: dataz,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
      }]
    };
    const options = {
     
      responsive: true,
      
      width: 50,
      height: 20
    };
   
    useEffect(() => {
      const dbRef =ref(db);
      const data100=query(dbRef,limitToLast(limit));
      console.log("limit2:", limit);
      onValue(data100, (snapshot) => {
        const firebaseData = snapshot.val();
        
        const newDatax=[];
        const newDatay=[];
        const newDataz=[];
        const newDatat=[];        
        for(let i=0;i<limit;i++){
            
          const item=Object.values(firebaseData)[i].data;
          newDatax.push(item.x);
          newDatay.push(item.y);
          newDataz.push(item.z);
          const dateObject = new Date(item.timestamp * 1000);
  
         // Extract hour, minute, and second from date object
          const hour = dateObject.getHours();
          const minute = dateObject.getMinutes();
          const second = dateObject.getSeconds();
  
         // Format hour, minute, and second as string in the format "20h30m30sec"
          const timeString = `${hour}h${minute}m${second}sec`;
         newDatat.push(timeString);
             
        }
        setDatax(newDatax);
        setDatay(newDatay);
        setDataz(newDataz);
        setDatat(newDatat);
      });
     
      
        
      //onChange={handleInputChange} 

    } ,[limit]);
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      if (/^[1-9][0-9]*$/.test(inputValue)) {
        setLimit(parseInt(inputValue, 10));
      }
    };
    return(  
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%", height: "450px", display: "inline-block" }}>
            <Line data={dataxg} options={options} />
          </div>
          <div style={{ width: "50%", height: "450px", display: "inline-block" }}>
            <Line data={datayg} options={options} />
          </div>
        </div>
        <div style={{ width: "50%", height: "450px" }}>
          <Line data={datazg} options={options} />
        </div>
        <div style={{width:"50%", height: "450px"}}>
          nº de valores na escala: 
          <input type="number" value={limit} onChange={handleInputChange} />
        </div>
      </div>
      
    );        
    
}