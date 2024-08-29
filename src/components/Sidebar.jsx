import React from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
}
  from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import '../index.css'
export default function Sidebar() {
  const location = useLocation()
  const Dashboard = location.pathname === '/'
  const Payment = location.pathname === '/payments'
  const Workers = location.pathname === '/workers'

  return (
    <Card className="Sidbar w-[270px]  p-[25px] pt-[101px] shadow-xl shadow-blue-gray-900/5 bg-customBg rounded-[50px]  flex flex-col  justify-between ">
      <List className='min-w-full'>
        <NavLink to='/'>
        <ListItem className={`font-montserrat text-[16px] rounded-[50px] text-white hover:bg-btnColor ${Dashboard ? 'activeSaidbar' : ''}`}>
          <ListItemPrefix >
          <svg className={`h-7 w-7 `} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12l8-8l8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"></path></svg>
          </ListItemPrefix>
          Asosiy
        </ListItem >
        </NavLink>
        <NavLink to='/payments'>
        <ListItem className={`font-montserrat text-[16px] rounded-[50px] text-white hover:bg-btnColor  hover:opacity-100 ${Payment ? 'activeSaidbar' : ''}` }>
          <ListItemPrefix>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><path fill="currentColor" d="M18 .188c-4.315 0-7.813 1.929-7.813 4.312S13.686 8.813 18 8.813c4.315 0 7.813-1.93 7.813-4.313S22.314.187 18 .187zm7.813 5.593c-.002 2.383-3.498 4.313-7.813 4.313c-4.303 0-7.793-1.909-7.813-4.281V7.5c0 1.018.652 1.95 1.72 2.688c1.08.294 2.042.702 2.843 1.218c.993.252 2.085.406 3.25.406c4.315 0 7.813-1.929 7.813-4.312zm0 3c0 2.383-3.498 4.313-7.813 4.313c-.525 0-1.035-.039-1.531-.094a4.35 4.35 0 0 1 .781 1.781c.249.014.495.031.75.031c4.315 0 7.813-1.929 7.813-4.312zM8 11.187c-4.315 0-7.813 1.93-7.813 4.313S3.686 19.813 8 19.813c4.315 0 7.813-1.93 7.813-4.313S12.314 11.187 8 11.187m17.813.594c-.002 2.383-3.498 4.313-7.813 4.313c-.251 0-.505-.018-.75-.032c-.011.075-.017.175-.031.25c.05.151.093.3.093.47v1c.227.011.455.03.688.03c4.315 0 7.813-1.929 7.813-4.312zm0 3c-.002 2.383-3.498 4.313-7.813 4.313c-.251 0-.505-.018-.75-.032c-.011.075-.017.175-.031.25c.05.15.093.3.093.47v1c.227.011.455.03.688.03c4.315 0 7.813-1.929 7.813-4.312zm-10 2c-.002 2.383-3.498 4.313-7.813 4.313c-4.303 0-7.793-1.909-7.813-4.282V18.5c0 2.383 3.497 4.313 7.813 4.313s7.813-1.93 7.813-4.313zm0 3c-.002 2.383-3.498 4.313-7.813 4.313c-4.303 0-7.793-1.909-7.813-4.282V21.5c0 2.383 3.497 4.313 7.813 4.313s7.813-1.93 7.813-4.313z"></path></svg>
          </ListItemPrefix>
          Ish haqqim
        </ListItem>
        </NavLink>
        <NavLink to='/workers'>
        <ListItem className={`font-montserrat text-[16px] rounded-[50px] text-white hover:bg-btnColor  hover:opacity-100 ${Workers ? 'activeSaidbar' : ''}` }>
          <ListItemPrefix>
          <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 12c1.873 0 3.57.62 4.815 1.487c1.183.825 2.185 2.051 2.185 3.37c0 .724-.309 1.324-.796 1.77c-.458.421-1.056.694-1.672.88C15.301 19.88 13.68 20 12 20s-3.301-.12-4.532-.493c-.616-.186-1.214-.459-1.673-.88C5.31 18.182 5 17.582 5 16.858c0-1.319 1.002-2.545 2.185-3.37C8.43 12.62 10.127 12 12 12m7 1c1.044 0 1.992.345 2.693.833c.64.447 1.307 1.19 1.307 2.096c0 .517-.225.946-.56 1.253c-.306.281-.684.446-1.029.55c-.47.142-1.025.215-1.601.247c.122-.345.19-.72.19-1.122c0-1.535-.959-2.839-2.032-3.744A4.8 4.8 0 0 1 19 13M5 13q.537.002 1.032.113C4.96 14.018 4 15.322 4 16.857c0 .402.068.777.19 1.122c-.576-.032-1.13-.105-1.601-.247c-.345-.104-.723-.269-1.03-.55A1.68 1.68 0 0 1 1 15.93c0-.905.666-1.649 1.307-2.096A4.76 4.76 0 0 1 5 13m13.5-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8"></path></g></svg>
          </ListItemPrefix>
          Xodimlar
        </ListItem> 
        </NavLink>
      </List>
        <ListItem className={`font-montserrat text-[16px] rounded-[50px] text-white hover:bg-btnColor  hover:opacity-100  mt-[180px]` }>
          <ListItemPrefix>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M0 1.5A1.5 1.5 0 0 1 1.5 0h7A1.5 1.5 0 0 1 10 1.5v1.939a2 2 0 0 0-.734 1.311H5.75a2.25 2.25 0 1 0 0 4.5h3.516A2 2 0 0 0 10 10.561V12.5A1.5 1.5 0 0 1 8.5 14h-7A1.5 1.5 0 0 1 0 12.5zm10.963 2.807A.75.75 0 0 0 10.5 5v1H5.75a1 1 0 0 0 0 2h4.75v1a.75.75 0 0 0 1.28.53l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-.817-.163" clipRule="evenodd"></path></svg>
          </ListItemPrefix>
          Chiqish
        </ListItem>
    </Card>
    
  )
}