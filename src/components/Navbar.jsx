import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { $axios } from '../utils'
import CONFIG from '../utils/Config'
function Navbar() {
  const [IsActive, setActive] = useState(false)
  const NavModal = () =>{
    setActive(!IsActive)
  }
  const location = useLocation()
  const Dashboard = location.pathname === '/'
  const Payment = location.pathname === '/payments'
  const Workers = location.pathname === '/workers'
  const FotoPerson = 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
  const [information, setInformation] = useState([])
  const GetProfileFoto = ()=>{
    $axios.get('/common-user/myInformation', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {        
        setInformation(response.data)       
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(()=>{
    GetProfileFoto()
  },[])
  return (
    <div className='NavBar w-full relative' >
      <div className='flex items-center  justify-between gap-[5px] w-full'>
       <form></form>
        <NavLink to='/profil'>
            <div className='bg-white rounded-[16px] border-[0.5px] border-[#B4B5B0] p-[2px] px-[9px] flex items-center gap-[10px]'>
                <img className='w-[28px] h-[28px] object-cover rounded-[50%]' src={information.avatarUrl ?  CONFIG.API_URL + information.avatarUrl : FotoPerson} alt="" />
                <div className='flex  flex-col'>
                  <span className='text-[16px] font-medium font-montserrat'>
                    {information.name}
                  </span>
                  <span className='text-[12px] font-medium text-[#83818E] font-montserrat'>
                  {information.role}
                  </span>
                </div>
            </div>
          </NavLink>
        <button className='burger text-[30px] hidden'  onClick={NavModal}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18"></path></svg>
        </button>
      </div>
      <div className={`${IsActive ? 'NavBarActive' : ''} NavBarModal fixed bg-customBg top-[0px] left-[0px] right-[0px] bottom-[] px-[25px] py-[30px] flex justify-between `}>
          <nav>
            <NavLink to='/' onClick={NavModal} className={`flex gap-[8px] mb-[15px] p-[5px] ${Dashboard ? 'bg-btnColor  rounded-[10px]' : ''}`}>
            <svg className={`h-7 w-7 text-white `} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12l8-8l8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"></path></svg>
            <span className='text-white font-montserrat'>
            Asosiy
            </span>
            </NavLink>
            <NavLink  to='/payments' onClick={NavModal} className={`flex gap-[8px] mb-[15px] p-[5px]  ${Payment ? 'bg-btnColor  rounded-[10px]' : ''}`}>
            <svg className="h-5 w-5  text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8V6H7v2zm0 8v-5H7v5zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2zM3 20h15v2H3a2 2 0 0 1-2-2V9h2z"></path></svg>
            <span className='text-white font-montserrat'>
            To’lovlar 
            </span>
            </NavLink>
            <NavLink  to='/workers' onClick={NavModal} className={`flex gap-[8px] mb-[15px] p-[5px]  ${Workers ? 'bg-btnColor  rounded-[10px]' : ''}`}>
            <svg className="h-5 w-5  text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 12c1.873 0 3.57.62 4.815 1.487c1.183.825 2.185 2.051 2.185 3.37c0 .724-.309 1.324-.796 1.77c-.458.421-1.056.694-1.672.88C15.301 19.88 13.68 20 12 20s-3.301-.12-4.532-.493c-.616-.186-1.214-.459-1.673-.88C5.31 18.182 5 17.582 5 16.858c0-1.319 1.002-2.545 2.185-3.37C8.43 12.62 10.127 12 12 12m7 1c1.044 0 1.992.345 2.693.833c.64.447 1.307 1.19 1.307 2.096c0 .517-.225.946-.56 1.253c-.306.281-.684.446-1.029.55c-.47.142-1.025.215-1.601.247c.122-.345.19-.72.19-1.122c0-1.535-.959-2.839-2.032-3.744A4.8 4.8 0 0 1 19 13M5 13q.537.002 1.032.113C4.96 14.018 4 15.322 4 16.857c0 .402.068.777.19 1.122c-.576-.032-1.13-.105-1.601-.247c-.345-.104-.723-.269-1.03-.55A1.68 1.68 0 0 1 1 15.93c0-.905.666-1.649 1.307-2.096A4.76 4.76 0 0 1 5 13m13.5-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5M12 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8"></path></g></svg>
            <span className='text-white font-montserrat'>
              Xodimlar
            </span>
            </NavLink>
          </nav>
          <button className='h-[30px]'>
          <svg onClick={NavModal} className='text-[30px] text-btnColor' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9m0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7m.707-7l2.646-2.646a.5.5 0 0 0 0-.707a.5.5 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706z"></path></svg>
          </button>
      </div>
    </div>
  )
}

export default Navbar