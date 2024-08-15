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