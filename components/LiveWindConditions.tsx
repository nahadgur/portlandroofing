'use client'
import { useEffect, useState } from 'react'
type Conditions={time:string;wind:number;gust:number;temperature:number}
export default function LiveWindConditions(){
  const [data,setData]=useState<Conditions|null>(null)
  const [failed,setFailed]=useState(false)
  useEffect(()=>{const controller=new AbortController();async function load(){try{
    const response=await fetch('https://api.open-meteo.com/v1/forecast?latitude=45.5152&longitude=-122.6784&current=temperature_2m,wind_speed_10m,wind_gusts_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles',{signal:controller.signal})
    if(!response.ok)throw new Error('Weather unavailable')
    const {current}=await response.json()
    if(!current||![current.temperature_2m,current.wind_speed_10m,current.wind_gusts_10m].every(v=>typeof v==='number'&&Number.isFinite(v))||!current.time)throw new Error('Incomplete weather')
    setData({time:current.time,wind:current.wind_speed_10m,gust:current.wind_gusts_10m,temperature:current.temperature_2m})
  }catch{if(!controller.signal.aborted)setFailed(true)}}load();return()=>controller.abort()},[])
  return <div style={{padding:'1rem',background:'var(--bg2)',marginTop:'1rem'}}>
    {failed?<p>Weather data is unavailable. Check the official forecast for your address.</p>:data?<><p>Wind: <strong>{data.wind} mph</strong> · Gusts: <strong>{data.gust} mph</strong> · Temperature: <strong>{data.temperature}°F</strong></p><p>Model timestamp: {data.time.replace('T',' ')} (America/Los_Angeles).</p></>:<p>Loading weather data…</p>}
    <p><a href="https://open-meteo.com/">Open-Meteo</a> model data for 45.5152, −122.6784, fetched when this page opens. These values do not assess roof damage or whether work is safe. Check the <a href="https://www.weather.gov/pqr/">National Weather Service forecast</a> for your property.</p>
  </div>
}
