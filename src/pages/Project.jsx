import React, { useState, useRef, useEffect } from 'react'
import Programmer from '/images/PmProgrammer.svg'
import Design from '/images/PmDesign.svg'
import SearchEmpte from '/images/SearchEmpty.png'
import { $axios } from '../utils';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Project() {

    
  const showSuccessToast = () => {
    toast.success('Yaratildi!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  const showErrorToast = () => {
    toast.error('Xato!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

    const modalRef = useRef(null);
    const modalRef2 = useRef(null);
    const modalRef3 = useRef(null);
    const modalRef4 = useRef(null);
    const [isActiveSmallModal, setActiveSmallModal] = useState(false)
    const ActiveSmallModal = () => {
        setActiveSmallModal(!isActiveSmallModal)
    }
    const [deleteModal, SetDeleteModal] = useState(false)
    const DeleteModalActive = () => {
        SetDeleteModal(!deleteModal)
    }
    const DeleteModal = () => {
        ActiveSmallModal()
        DeleteModalActive()
    }

    const [IsMission, setMission] = useState(false)
    const MissionModal = () => {
        setMission(!IsMission)
    }
    const [AddPerson, setAddPerson] = useState(false)
    const AddPersonActive = () => {
        setAddPerson(!AddPerson)
    }
    const [isMessage, setMessage] = useState(false)
    const MessageActive = () => {
        setMessage(!isMessage)
    }

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            DeleteModal()
        }
    };
    const handleClickOutside2 = (e) => {
        if (modalRef2.current && !modalRef2.current.contains(e.target)) {
            setMission(false)
        }
    };
    const handleClickOutside3 = (e) => {
        if (modalRef3.current && !modalRef3.current.contains(e.target)) {
            setAddPerson(false)
        }
    };
    const handleClickOutside4 = (e) => {
        if (modalRef4.current && !modalRef4.current.contains(e.target)) {
            setMessage(false)
        }
    };

    useEffect(() => {
        if (deleteModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [deleteModal,]);

    useEffect(() => {
        if (IsMission) {
            document.addEventListener('mousedown', handleClickOutside2);
        } else {
            document.removeEventListener('mousedown', handleClickOutside2);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside2);
        };
    }, [IsMission]);
    useEffect(() => {
        if (AddPerson) {
            document.addEventListener('mousedown', handleClickOutside3);
        } else {
            document.removeEventListener('mousedown', handleClickOutside3);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside3);
        };
    }, [AddPerson]);
    useEffect(() => {
        if (isMessage) {
            document.addEventListener('mousedown', handleClickOutside4);
        } else {
            document.removeEventListener('mousedown', handleClickOutside4);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside4);
        };
    }, [isMessage]);

    const [isOpen, setOpen] = useState(null)
    const toggleModal = (e) => {
        setOpen(isOpen === e ? null : e);
    };



    // Get project 
    const {ID} = useParams()
    const [ProjectName, setProjectName] = useState([])
    const GetProject  = ()=>{
        $axios.get(`/project/getById/${ID}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        })
        .then((response)=>{
            setProjectName(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        GetProject()
    },[])



    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [employee, setEmployee] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const CreateTask = ()=>{
        e.preventDefault()
        const NewData = {
            title:title,
            description:description,
            employee:employee
        }
        const formData = new FormData();
        for (let key of Object.keys(NewData)) {
            formData.append(key, NewData[key]);
        }
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        $axios.post(`/task/add`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response)=>{
            setTitle('')
            setDescription('')
            setEmployee('')
            showSuccessToast()
        })
        .catch((error)=>{
            console.log(error);
            showErrorToast()
        })
    }
    const postFoto = (event) =>{
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                    {ProjectName} <span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                </h1>
                <div className=' overflow-x-scroll pb-[50px]'>
                    <div className='flex  gap-[25px] mt-[50px] w-[300px]'>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Boshlanish
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px] flex items-center justify-between flex-col'>
                                <div className='relative w-full cursor-pointer rounded-[8px] border-[0.5px] border-[#ABAAB9] px-[11px] py-[10px] flex items-center justify-between mb-[25px]'>
                                    <div  className='flex items-center gap-[10px]'>
                                        <span className='Project__card__worker__title font-[500] text-[#83818E] text-[20px] font-montserrat'>
                                            dasturchi
                                        </span>
                                    </div>
                                    <button onClick={ActiveSmallModal} className='cursor-pointer w-[50px] flex items-center justify-center' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="19" viewBox="0 0 5 19" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="9.5" r="2.5" fill="black" />
                                            <circle cx="2.5" cy="16.5" r="2.5" fill="black" />
                                        </svg>
                                    </button>
                                    <div onClick={DeleteModalActive} className={`smallModal absolute  py-[5px] pl-[10px] pr-[5px] right-[-50px] rounded-[10px] opacity-0 transition duration-300 ${isActiveSmallModal ? 'smallModalActive' : ''}`}>
                                        <div className='bg-[#FEE2D6] p-[5px]  rounded-[8px]'>
                                            <svg className='text-[25px] ' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m-4.74 6.703A1.5 1.5 0 0 0 6.246 14h3.508a1.5 1.5 0 0 0 1.487-1.297L12.427 4H3.573z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                    <button onClick={MissionModal} className='bg-btnColor flex items-center gap-[10px] w-full justify-center px-[16px] py-[8px] rounded-[16px] mt-[25px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                                        <svg className='text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                                        <span className='font-montserrat text-[16px] text-[#1B1A28]'>
                                            qo’shish
                                        </span>
                                    </button>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Jarayon
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Test
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]' >
                                Yakun
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${deleteModal ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef} className='Modal bg-customBg rounded-[16px] p-[30px] w-[360px]'>
                    <h2 className='text-btnColor text-[26px] font-[600] text-center '>
                        Xodim qo’shish
                    </h2>
                    <div className='flex items-center justify-center gap-[20px] mt-[20px]'>
                        <button onClick={DeleteModal} className='text-black bg-btnColor px-[20px] py-[5px] rounded-[16px] border-2 border-btnColor hover:bg-transparent hover:text-white transition duration-500 '>
                            Ha
                        </button>
                        <button onClick={DeleteModal} className='text-black bg-btnColor px-[20px] py-[5px] rounded-[16px] border-2 border-btnColor hover:bg-transparent hover:text-white transition duration-500 '>
                            Yoq
                        </button>
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px]  bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${IsMission ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef2} className='Modal  bg-white rounded-[16px] p-[30px] w-[60%] duration-500 ease-in-out overflow-hidden '>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-start gap-[7px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 2h-.585A1.5 1.5 0 0 0 9.5 1h-3a1.5 1.5 0 0 0-1.415 1H4.5A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 11.5 2m-5 0h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m.852 8.354l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707m0-4l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707M10.5 11H9a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1m0-4H9a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1"></path></svg>
                            <div>
                                <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Vazifa qo`shish
                                </h2>
                                <span className='text-[#83818E] text-[16px] font-[500] font-montserrat'>
                                    boshlanish bo’limiga
                                </span>
                            </div>
                        </div>
                        <button onClick={MissionModal}>
                            <svg className='text-[#83818E] text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className='mt-[30px] mb-[15px]'>
                        <div className='flex items-center gap-[6px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.707A5.5 5.5 0 0 0 10.257 18H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm3.565 8.442a2 2 0 0 1-1.43 2.478l-.461.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.455 2.519l-.126.423q.387.306.835.517l.325-.344a2 2 0 0 1 2.909.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.478l.461-.118a4.7 4.7 0 0 0-.01-1.017l-.349-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.324.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.822.497zM14.5 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path></svg>
                            <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Ta’rif
                            </h2>
                        </div>
                        <form className='block w-full mt-[15px]'>
                            <label htmlFor="description">
                                <textarea className='resize-none block w-full p-[10px] h-[100px] rounded-[10px] border-[0.5px] border-[#B6BEC3]' id="description"></textarea>
                            </label>
                            <div className='Modal__wrapper flex items-center justify-between mt-[15px]'>
                                <div className='flex items-center gap-[10px] '>
                                    <button className='rounded-[16px] px-[16px] py-[8px] flex items-center gap-[8px] bg-btnColor border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M12.016 53.16c1.218 0 1.851-.68 4.289-2.976l10.547-10.125c.539-.493.82-.633 1.148-.633s.656.164 1.148.633l11.977 11.53c.938.892 1.664 1.571 2.86 1.571c1.476 0 2.6-.89 2.6-3.023V10.176c0-4.875-2.413-7.336-7.265-7.336H16.68c-4.828 0-7.266 2.46-7.266 7.336v39.96c0 2.134 1.149 3.024 2.602 3.024"></path></svg>
                                        <span className=''>
                                            Saqlash
                                        </span>
                                    </button>
                                </div>
                                <div className='flex items-center gap-[7px] mt-[15px]'>
                                    <div className='cursor-pointer p-[9px] border-[0.5px] border-[#ABAAB9] rounded-[8px] hover:bg-black hover:text-white transition duration-500'>
                                        <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M8 2v4m8-4v4"></path><rect width={18} height={18} x={3} y={4} rx={2}></rect><path d="M3 10h18"></path></g></svg>
                                    </div>
                                    <div onClick={() => toggleModal(1)} className={`${isOpen === 1 ? 'bg-btnColor' : ''} cursor-pointer p-[9px] border-[0.5px] border-[#ABAAB9] rounded-[8px] hover:bg-black hover:text-white transition duration-500`}>
                                        <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M10.561 8.073a6 6 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6 6 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className={` ${isOpen === 1 ? '  ' : 'hidden'} transition-max-height duration-500 ease-in-out overflow-hidden border-[1px] border-[#B6BEC3] rounded-[16px] p-[30px] mt-[30px] origin-top`}>
                            <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600] flex items-center gap-[12px] '>
                                Jamoa biriktirish
                                <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 2 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18q.617 0 1.21-.057A5.48 5.48 0 0 1 9 14.5c0-1.33.472-2.55 1.257-3.5zM14.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5"></path></svg>
                            </h1>
                            <form className='block w-full   flex items-center justify-between gap-[15px]'>
                                <label htmlFor="Team" className='w-full'>
                                    <input placeholder='Jamoa nomi' type="text" id="Team" className='rounded-[16px] border-[0.5px] border-[#B6BEC3] p-[12px] w-full' />
                                </label>
                                <button className='p-[10px] border-[2px] border-[#83818E] rounded-[16px] hover:bg-[black] hover:text-[white] transition duration-500'>
                                    qidirish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${AddPerson ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef3} className='Modal bg-white rounded-[16px] p-[30px] w-[40%]'>
                    <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600] flex items-center gap-[12px] '>
                        Jamoa biriktirish
                        <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 2 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18q.617 0 1.21-.057A5.48 5.48 0 0 1 9 14.5c0-1.33.472-2.55 1.257-3.5zM14.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5"></path></svg>
                    </h1>
                    <form className='w-full mt-[12px] flex items-center gap-[10px]'>
                        <label htmlFor="" className='w-full rounded-[16px] block'>
                            <input placeholder='jamo nomi ' type="text" className='px-[10px] w-full rounded-[16px] block border-[0.5px] border-[#B6BEC3] p-[5px]' />
                        </label>
                        <button className='p-[10px] bg-btnColor rounded-[16px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                            qidirish
                        </button>
                    </form>
                    <div className='flex items-center justify-center'>
                        <img src={SearchEmpte} alt="" />
                    </div>
                </div>
            </div>
            <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${isMessage ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef4} className='Modal bg-white rounded-[16px] p-[30px] w-[40%]'>
                    <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600] flex items-center gap-[12px] '>
                        Xabar yuborish
                    </h1>
                    <form className='w-full mt-[12px] flex items-center gap-[10px]'>
                        <label htmlFor="" className='w-full rounded-[16px] block'>
                            <input placeholder='emailni yozing' type="text" className='w-full rounded-[16px] block border-[0.5px] border-[#B6BEC3] px-[10px] p-[5px]' />
                        </label>
                        <button className='p-[10px] bg-btnColor rounded-[16px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                            qidirish
                        </button>
                    </form>
                    <form>
                        <label htmlFor="" className='mt-[15px] block'>
                            <textarea placeholder='xabar yozing' name="" id="" className='resize-none block w-full p-[10px] h-[100px] rounded-[10px] border-[0.5px] border-[#B6BEC3]'></textarea>
                        </label>
                        <button className='p-[10px] w-full mt-[20px] bg-btnColor rounded-[16px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                            yuborish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Project