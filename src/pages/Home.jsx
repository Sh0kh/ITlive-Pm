import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
import { $axios } from '../utils';

function Home() {
  const [Project, setProject] = useState([]);

  const GetMyProject = () => {
    $axios.get('/employee/project/getMyProjects', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setProject(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetMyProject();
  }, []);

  // Функция для определения цвета прогресс-бара в зависимости от процента
  const getProgressColor = (percentage) => {
    if (percentage >= 10 && percentage < 30) {
      return '#FF0000'; // Красный
    } else if (percentage >= 30 && percentage < 60) {
      return '#FFC107'; // Жёлтый
    } else if (percentage >= 60 && percentage <= 100) {
      return '#00C853'; // Зелёный
    }
    return '#d6d6d6'; // По умолчанию серый
  };

  return (
    <div className='MyProject w-full pb-[50px] pr-[200px]'>
      <div className='mt-[50px]'>
        <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
          Loyihalar
        </h1>
        <div className='MyProject__wrapper mt-[25px] grid grid-cols-3 gap-[30px]'>
          {Project?.data?.map((i) => {
            const percentage = 50; // Или значение процента для конкретного проекта
            const progressColor = getProgressColor(percentage);

            return (
              <div key={i.project.id} className='MyProject__card bg-white text-center rounded-[16px] w-[284px] pb-[10px] h-fit'>
                <div className='w-full p-[30px]'>
                  <div className='w-[105px] h-[105px] mx-auto'>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      strokeWidth={12}
                      styles={buildStyles({
                        textColor: progressColor, // Цвет текста
                        pathColor: progressColor, // Цвет прогресса
                        trailColor: '#d6d6d6', // Цвет фона прогресса
                        textSize: '34px',
                        textAnchor: 'middle',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      })}
                    />
                  </div>
                  <span className='font-[500] text-[16px] font-montserrat block mb-[30px] mt-[10px]'>
                    {i.project.name}
                  </span>
                  <div className='flex items-center gap-[10px] flex-col w-full'>
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center gap-[10px]'>
                        <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
                        <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                          Start
                        </span>
                      </div>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                        {i.project.start_at.split('T')[0]}
                      </span>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center gap-[10px]'>
                        <svg className='text-[#83818E]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipSCheckOne0"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path><path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path></svg>
                        <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                          Finish
                        </span>
                      </div>
                      <span className='font-[500] text-[16px] text-[#83818E] font-montserrat'>
                        {i.project.end_at.split('T')[0]}
                      </span>
                    </div>
                  </div>
                  <div className='w-full flex items-center justify-between mt-[10px] gap-[20px]'>
                    <NavLink to={`/projectWorkers/${i.project.id}`} className='bg-btnColor px-[10px] py-[10px] rounded-[16px] border-[2px] transition duration-500 border-btnColor hover:bg-transparent w-full'>
                      Xodimlar
                    </NavLink>
                    <NavLink to={`/project/${i.project.id}`} className='bg-btnColor px-[10px] py-[10px] rounded-[16px] border-[2px] transition duration-500 border-btnColor hover:bg-transparent w-full'>
                      o`tish
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
