import React, { useState, useEffect, useRef } from 'react';
import { $axios } from '../utils';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GET_TASK = gql`
  query TaskCommon($ID: String!) {
    TaskCommon(ProjectId: $ID) {
      condition
      tasks {
        id
        title
        description
        fileUrl
        endAt
         employeeProject{
        employee{
			name
        }
      }
      }
    }
  }
`;

const GET_EMPLOYEE_ID = gql`
  query EmployeeProject($ID: String!) {
    EmployeeProject(ProjectId: $ID) {
      id
      employee {
        id
        name
        surname
      }
    }
  }
`;

function Project() {
    const showSuccessToast = () => {
        toast.success('Qo`shildi!', {
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
    const ShowSuccessDelete = () => {
        toast.success('O`chirildi!', {
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




    // MOdal
    const modalRef2 = useRef(null);
    const [IsMission, setMission] = useState(false)
    const MissionModal = () => {
        setMission(!IsMission)
    }
    const handleClickOutside2 = (e) => {
        if (modalRef2.current && !modalRef2.current.contains(e.target)) {
            setMission(false)
        }
    };
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
    const [isOpen, setOpen] = useState(null)
    const toggleModal = (e) => {
        setOpen(isOpen === e ? null : e);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalRef6 = useRef(null);

    const openModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const handleClickOutside = (event) => {
        if (modalRef6.current && !modalRef6.current.contains(event.target)) {
            setModalIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [info, setInfo] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // State for selected task details
    const [TaskId, setTaskId] = useState(null)
    const infoRef = useRef(null);

    const handleClickOutside3 = (e) => {
        if (infoRef.current && !infoRef.current.contains(e.target)) {
            setInfo(false);
        }
    };

    useEffect(() => {
        if (info) {
            document.addEventListener('mousedown', handleClickOutside3);
        } else {
            document.removeEventListener('mousedown', handleClickOutside3);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside3);
        };
    }, [info]);

    const { ID } = useParams();
    const [ProjectName, setProjectName] = useState([]);
    const { data: EP } = useQuery(GET_EMPLOYEE_ID, {
        variables: { ID },
        skip: !ID
    });

    const { data: Task, refetch } = useQuery(GET_TASK, {
        variables: { ID },
        skip: !ID,
    });

    const GetProject = () => {
        $axios.get(`/project/getById/${ID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                setProjectName(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        GetProject();
    }, []);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setInfo(true);
    };
    
// Create Task 

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [employee, setEmployee] = useState('')
const [Sana, setSana] = useState('')
const [selectedFile, setSelectedFile] = useState(null)

const CreateTask = (e) => {
    e.preventDefault()
    const formattedDate = Sana ? new Date(Sana).toISOString() : '';

    const NewData = {
        title: title,
        description: description,
        employee_project_id: employee,
        end_at: formattedDate,
    }
    const formData = new FormData();
    for (let key of Object.keys(NewData)) {
        formData.append(key, NewData[key]);
    }
    if (selectedFile) {
        formData.append('file', selectedFile);
    }
    $axios.post(`/task/add`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            setTitle('')
            setDescription('')
            setEmployee('')
            showSuccessToast()
            MissionModal()
            refetch()
        })
        .catch((error) => {
            console.log(error);
            showErrorToast()
        })
}
const CreateFile = (event) => {
    setSelectedFile(event.target.files[0]);
}

    const deleteTask = (taskId)=>{
        $axios.delete(`task/delete/${taskId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response)=>{
            ShowSuccessDelete()
            refetch()
            handleTaskClick()
        })
        .catch((error)=>{
            console.log(error);
            showErrorToast()  
            console.log(taskId);
                      
        })
    }



    const renderTaskTitles = (condition) => {
        return Task?.TaskCommon?.filter(task => task.condition === condition)?.[0]?.tasks.map((task, index) => (
            <div onClick={() => handleTaskClick(task)} key={index} className='border-[2px] rounded-[16px] px-[10px] cursor-pointer w-full'>
                <span className='font-montserrat font-[500] text-[18px] text-[#1B1A28]'>{task.title}</span>
            </div>
        ));
    };

    return (
        <div className='Project'>
            <div className='mt-[50px] overflow-hidden'>
                <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                    {ProjectName} <span className='font-[500] text-[#83818E] text-[20px] font-montserrat'>/topshiriqlar</span>
                </h1>
                <div className='overflow-x-scroll pb-[50px]'>
                    <div className='flex gap-[25px] mt-[50px] w-[900px]'>
                        <div className='Project__card '>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Boshlanish
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px] flex items-center justify-between flex-col'>
                                {renderTaskTitles('BEGIN')}
                                <div></div>
                                <button onClick={MissionModal} className='bg-btnColor flex items-center gap-[10px] w-full justify-center px-[16px] py-[8px] rounded-[16px] mt-[25px] border-[2px] border-btnColor hover:bg-transparent transition duration-500'>
                                    <svg className='text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path></svg>
                                    <span className='font-montserrat text-[16px] text-[#1B1A28]'>
                                        qo’shish
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Jarayon
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                {renderTaskTitles('PROCESS')}
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Test
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                {renderTaskTitles('TEST')}
                            </div>
                        </div>
                        <div className='Project__card'>
                            <h2 className='text-[#83818E] font-[600] font-montserrat text-[25px] mb-[25px]'>
                                Yakun
                            </h2>
                            <div className='w-[302px] h-[340px] p-[15px] bg-white border-1 border-[#ABAAB9] rounded-[8px]'>
                                {renderTaskTitles('CONFIRMED')}
                            </div>
                        </div>
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
                            </div>
                        </div>
                        <button onClick={MissionModal}>
                            <svg className='text-[#83818E] text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className='mt-[30px] mb-[15px]'>
                        <label htmlFor="" className='mb-[10px] block'>
                            <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Nom
                            </h2>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text" className=' w-full p-[5px] rounded-[10px] border-[0.5px] border-[#B6BEC3]' />
                        </label>
                        <div className='flex items-center gap-[6px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.707A5.5 5.5 0 0 0 10.257 18H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm3.565 8.442a2 2 0 0 1-1.43 2.478l-.461.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.455 2.519l-.126.423q.387.306.835.517l.325-.344a2 2 0 0 1 2.909.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.478l.461-.118a4.7 4.7 0 0 0-.01-1.017l-.349-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.324.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.822.497zM14.5 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path></svg>
                            <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                Ta’rif
                            </h2>
                        </div>
                        <form className='block w-full mt-[15px]' onSubmit={CreateTask}>
                            <label htmlFor="description">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='resize-none block w-full p-[10px] h-[100px] rounded-[10px] border-[0.5px] border-[#B6BEC3]' id="description"></textarea>
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
                                <div className='flex items-center gap-[7px] mt-[15px] relative'>
                                    <div className={`absolute top-[-260px] right-[0px] hidden ${modalIsOpen ? 'klAc' : ''}`}
                                        ref={modalRef6}>

                                        <DatePicker
                                            selected={Sana}
                                            onChange={(date) => setSana(date)}// Убедитесь, что date передается в формате Date
                                            inline
                                        />
                                    </div>
                                    <div onClick={openModal} className='cursor-pointer p-[9px] border-[0.5px] border-[#ABAAB9] rounded-[8px] hover:bg-black hover:text-white transition duration-500'>
                                        <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M8 2v4m8-4v4"></path><rect width={18} height={18} x={3} y={4} rx={2}></rect><path d="M3 10h18"></path></g></svg>
                                    </div>
                                    <div onClick={() => toggleModal(1)} className={`${isOpen === 1 ? 'bg-btnColor' : ''} cursor-pointer p-[9px] border-[0.5px] border-[#ABAAB9] rounded-[8px] hover:bg-black hover:text-white transition duration-500`}>
                                        <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M10.561 8.073a6 6 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6 6 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0"></path></svg>
                                    </div>
                                    <div className="modal-foto">
                                        <label className="file-input-container" htmlFor="editPhoto">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22" clipRule="evenodd"></path><path fill="currentColor" d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383"></path></svg>
                                            <input onChange={CreateFile} id="editPhoto" accept="image/*" type="file" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className={` ${isOpen === 1 ? '  ' : 'hidden'} transition-max-height duration-500 ease-in-out overflow-hidden border-[1px] border-[#B6BEC3] rounded-[16px] p-[30px] mt-[30px] origin-top`}>
                            <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600] flex items-center gap-[12px] '>
                                Xodim qo`shish
                                <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 2 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18q.617 0 1.21-.057A5.48 5.48 0 0 1 9 14.5c0-1.33.472-2.55 1.257-3.5zM14.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5"></path></svg>
                            </h1>
                            <form>
                                <select
                                    value={employee}
                                    onChange={(e) => setEmployee(e.target.value)}
                                    name="" id="" className='w-full p-[10px] rounded-[16px] border-[1px] border-[black] cursor-pointer'>
                                    <option value="defaultValue" selected disabled>Xodimlar </option>
                                    {EP?.EmployeeProject?.map((i) => (
                                        <option key={i.id} value={i.id} >
                                            {i.employee.name} {i.employee.surname}
                                        </option>
                                    ))}
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {selectedTask &&(
                <div className={`DeleteModal p-[5px]  bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${info ? 'DeleteModalActive' : ''}`}>
                    <div ref={infoRef} className='Modal  bg-white rounded-[16px] p-[30px] w-[60%] duration-500 ease-in-out overflow-hidden '>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-start gap-[7px]'>
                                <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 2h-.585A1.5 1.5 0 0 0 9.5 1h-3a1.5 1.5 0 0 0-1.415 1H4.5A1.5 1.5 0 0 0 3 3.5v10A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 11.5 2m-5 0h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m.852 8.354l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707m0-4l-1.5 1.5a.496.496 0 0 1-.706 0l-.5-.5a.5.5 0 0 1 .707-.707l.146.146l1.146-1.146a.5.5 0 0 1 .707.707" /></svg>
                                <h1 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                    Vaziga: {selectedTask.title}
                                </h1>
                            </div>
                            <svg onClick={() => setInfo(false)} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.586L5.293 3.879a1 1 0 1 0-1.414 1.414L10.586 12l-6.707 6.707a1 1 0 0 0 1.414 1.414L12 13.414l6.707 6.707a1 1 0 0 0 1.414-1.414L13.414 12l6.707-6.707a1 1 0 0 0-1.414-1.414L12 10.586z" /></svg>
                        </div>
                        <div className='mt-[20px]'>
                            <div>
                                <div className='flex items-center gap-[6px]'>
                                    <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3A1.5 1.5 0 0 1 8.5 2h3a1.5 1.5 0 0 1 1.415 1H14.5A1.5 1.5 0 0 1 16 4.5v4.707A5.5 5.5 0 0 0 10.257 18H5.5A1.5 1.5 0 0 1 4 16.5v-12A1.5 1.5 0 0 1 5.5 3zM8.5 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm3.565 8.442a2 2 0 0 1-1.43 2.478l-.461.118a4.7 4.7 0 0 0 .01 1.016l.35.083a2 2 0 0 1 1.455 2.519l-.126.423q.387.306.835.517l.325-.344a2 2 0 0 1 2.909.002l.337.358q.44-.203.822-.498l-.156-.556a2 2 0 0 1 1.43-2.478l.461-.118a4.7 4.7 0 0 0-.01-1.017l-.349-.082a2 2 0 0 1-1.456-2.52l.126-.421a4.3 4.3 0 0 0-.835-.519l-.324.344a2 2 0 0 1-2.91-.001l-.337-.358a4.3 4.3 0 0 0-.822.497zM14.5 15.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path></svg>
                                    <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                        Ta’rif
                                    </h2>
                                </div>
                                <div className='block w-full p-[10px]  rounded-[10px] border-[0.5px] border-[#B6BEC3]'>
                                    <p>
                                        {selectedTask.description}
                                    </p>
                                </div>
                            </div>
                            <div className='mt-[20px]'>
                            <div className='flex items-center gap-[6px]'>
                            <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path></svg>
                                <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                    Xodim
                                </h2>
                            </div>
                            <div className='block w-full p-[10px]  rounded-[10px] border-[0.5px] border-[#B6BEC3]'>
                               <span>
                               {selectedTask?.employeeProject?.employee?.name}
                               </span>
                            </div>
                        </div>
                            <div className='mt-[20px]'>
                                <div className='flex items-center gap-[6px]'>
                                    <svg className='text-[28px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"></path></g></svg>
                                    <h2 className='font-montserrat text-[25px] text-[#1F1E30] font-[600]'>
                                        Berilgan vaqt
                                    </h2>
                                </div>
                                <div className='block w-full p-[10px]  rounded-[10px] border-[0.5px] border-[#B6BEC3]'>
                                    <span>
                                        {new Date(selectedTask.endAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => deleteTask(selectedTask.id)} className='mt-[20px] p-[5px] rounded-[16px] bg-[#f63535] text-white border-[2px] border-[#f63535] w-full hover:bg-transparent hover:text-[black] tansition duration-500'>
                                Task o`chirish
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Project;
