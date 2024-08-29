import React, { useState, useRef, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import CONFIG from '../utils/Config'
import { $axios } from '../utils'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GET_WORKERS = gql`
    query {
        CommonEmployee {
            employee {
                id
                name
                surname
                phoneNumber
                role
                avatarUrl
            }
            participateProjectCount
        }
    }
`

function Workers() {
    const modalRef = useRef(null);
    const [projectID, setProjectID] = useState()
    const [employeeID, sуtEmployeeID] = useState()
    const [role, setRole] = useState()
    const [Modal, setMdoal] = useState(false)
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

    const ModalActive = () => {
        setMdoal(!Modal)
    }
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            ModalActive(false)
        }
    };
    useEffect(() => {
        if (Modal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [Modal,]);
    // Состояние для выбранной роли
    const [selectedRole, setSelectedRole] = useState('All')
    const { data: Workers } = useQuery(GET_WORKERS)
    const PersonFoto = 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'

    // Фильтруем сотрудников по роли
    const filteredWorkers = Workers?.CommonEmployee?.filter((worker) =>
        selectedRole === 'All' || worker.employee.role === selectedRole
    )
    const handleButtonClick = (id) => {
        sуtEmployeeID(id)
        ModalActive()
    };
    const [Project, setProject] = useState([])
    const getProject = () => {
        $axios.get('/employee/project/getMyProjects', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                setProject(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getProject()
    }, [])

    const AddProject = (e) => {
        e.preventDefault();

        $axios.post(
            `/employee/project/add/${projectID}/${employeeID}/${role}`,
            {}, // Пустой объект данных, если ничего не передаете в теле запроса
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
            .then((response) => {
                showSuccessToast()
                ModalActive()
            })
            .catch((error) => {
                showErrorToast()                
            });
    };
console.log(Project);
    return (
        <div className='Workers w-full pb-[50px]'>
            <div className='mt-[50px]'>
                <div className='flex items-center justify-between workers__title__wrapper'>
                    <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
                        Xodimlar
                    </h1>
                    <div className='flex items-center gap-[15px]'>
                        <select
                            className='py-[10px] px-[20px] rounded-[24px] outline-none cursor-pointer text-[#83818E]'
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="All">Hammasi</option>
                            <option value="DESIGNER">Web design</option>
                            <option value="FRONT_END">Frontend</option>
                            <option value="BACK_END">Backend</option>
                        </select>
                    </div>
                </div>
                <div className='Workers__wrapper'>
                    {filteredWorkers?.map((i) => (
                        <div key={i.employee.id} className='Workers__card bg-white p-[20px] rounded-[16px]'>
                            <div className='flex items-center justify-end'>
                                <button onClick={() => handleButtonClick(i.employee.id)}>
                                    <svg className='text-[24px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={3.75} d="M12.01 12v.01H12V12zm7 0v.01H19V12zm-14 0v.01H5V12z"></path></svg>
                                </button>
                            </div>
                            <div className='flex items-center justify-center flex-col gap-[15px]'>
                                <img
                                    className='w-[105px] h-[105px] rounded-[100px] border-[2px] border-[black] object-cover'
                                    src={i.employee.avatarUrl ? CONFIG.API_URL + i.employee.avatarUrl : PersonFoto}
                                    alt="foto"
                                />
                                <div className='flex items-center justify-center flex-col gap-[5px]'>
                                    <h2 className='font-[500] text-[16px] font-montserrat'>
                                        {i.employee.name}
                                    </h2>
                                    <span className='font-[500] text-[#83818E] font-montserrat'>
                                        {i.employee.role}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between mt-[30px]'>
                                <svg className='text-[30px] text-[#4f4f4f] cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 92.6c-69.6-.1-139.1 11.6-208.56 35.4c0 0-9.87 22.6-17.98 41.3a47 47 0 0 0-3.49 12.2c48.55-18.4 97.13-31 145.63-38c4.5-8.8 13.7-14.6 23.9-14.6h17.3c7.9 0 15.1 3.4 20.1 8.9c15.4-.6 30.8-.7 46.4-.1c4.9-5.5 12.1-8.8 19.8-8.8h17.3c10.1 0 19.1 5.6 23.7 14.1c48.7 6.6 97.2 19.4 145.9 38.3c-.7-4-1.8-8.2-3.5-12c-8.1-18.7-18-41.3-18-41.3c-69.5-23.4-139-35.33-208.5-35.4m-60.5 53.6c-4.7 0-8.8 3.4-9.6 8.1l-6.7 40.4c-12.1 2.2-23.9 5-35.3 8.4c-9.8 3-17.6 10.4-21.2 19.9c-13.8 37-48.72 130.6-48.72 130.6H438s-34.8-93.5-48.7-130.6c-3.5-9.5-11.4-17-21.2-19.9c-11.4-3.4-23.2-6.2-35.3-8.4l-6.8-40.4c-.8-4.7-4.8-8.1-9.6-8.1h-17.3c-4.6 0-8.7 3.2-9.5 7.8l-2.2 10.6h-62.9l-2.2-10.6c-.8-4.6-4.8-7.8-9.5-7.8zm163.8 17.3l-2.7 18.6c5.6 1.4 11.1 2.8 16.4 4.5c14 6.2 25.7 15.7 31.1 27.2l64.8 15.5c6.4-9.8 13.6-18.7 16.3-29.8c-42-16.6-83.9-28.7-125.9-36m-206.5.5c-42 7.5-84.01 19.4-126.02 35.6c3.05 11.7 9.6 19.6 16.31 29.7l64.81-15.5c5.9-13 17.2-23 31-27.2q8.25-2.4 16.5-4.5zM256 197.3c44.7 0 81 30.9 81 69s-36.3 68.9-81 68.9s-81.1-30.8-81.1-68.9s36.4-69 81.1-69m0 17.6c-30.1 0-54.5 20.8-54.5 46.4s24.4 46.4 54.5 46.4s54.4-20.8 54.4-46.4s-24.3-46.4-54.4-46.4M73.97 376.5l21.76 42.9H416.2l21.7-42.9z"></path></svg>
                                <div className='flex items-center gap-[10px] flex-col'>
                                    <span className='font-[500] text-[#83818E] font-montserrat'>
                                        {i.employee.phoneNumber}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`DeleteModal p-[5px] bg-[#d9d9d9bc] fixed inset-0 flex items-center justify-center ${Modal ? 'DeleteModalActive' : ''}`}>
                <div ref={modalRef} className='Modal bg-customBg rounded-[16px] p-[30px] w-[360px]'>
                    <h2 className='text-btnColor text-[26px] font-[600] text-center '>
                        Proektga qoshish
                    </h2>
                    <div className=' mt-[20px]'>
                        <form onSubmit={AddProject}>
                            <select
                                value={projectID}
                                onChange={(e) => setProjectID(e.target.value)}
                                className='w-full px-[20px] py-[10px] rounded-[16px]'
                            >
                                <option value="default"  disabled selected>Loihalar</option>
                                {Project && Project.length > 0 ? (
                                    Project.map((p) => (
                                        <option key={p.project?.id} value={p.project?.id}>
                                            {p.project?.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled value="">
                                        Project yoq
                                    </option>
                                )}
                            </select>

                            <select value={role} onChange={(e) => setRole(e.target.value)} name="" id="" className='w-full px-[20px] py-[10px] rounded-[16px] mt-[20px]'>
                                <option value="DESIGNER">Web design</option>
                                <option value="FRONT_END">Frontend</option>
                                <option value="BACK_END">Backend</option>
                            </select>
                            <button type='submit' className='bg-btnColor block px-[20px] py-[10px] transition duration-500 rounded-[16px] border-[2px] border-btnColor hover:bg-transparent hover:text-[white] mt-[20px] w-full'>
                                Qoshish
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Workers
