import React, { useEffect, useState } from 'react';
import Calendar from '/images/FinanceCalendar.png';
import Money from '/images/FinanceMoney.png';
import FinanceType from '/images/FinanceType.png';
import { gql, useLazyQuery } from '@apollo/client';
import { $axios } from '../utils';

const GET_MYPAYMENTS = gql`
  query EmployeeFinance($EmployeeId: Int!) {
    EmployeeFinance(EmployeeId: $EmployeeId) {
      id
      type
      comment
      createdAt
      price
    }
  }
`;

function Payments() {
  const [id, setId] = useState(null);
  const [getPayments, { data: MyPayments }] = useLazyQuery(GET_MYPAYMENTS);

  const GetProfileFoto = () => {
    $axios.get('/common-user/myInformation', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetProfileFoto();
  }, []);

  useEffect(() => {
    if (id) {
      getPayments({ variables: { EmployeeId: id } });
    }
  }, [id, getPayments]);

  return (
    <div className='Payment w-full pb-[50px]'>
      <div className='mt-[50px]'>
        <h1 className='text-[42px] font-[600] text-TitleColor font-montserrat'>
          Ish haqqim
        </h1>
        <div className='PaymentTable bg-white rounded-[16px] p-[30px] w-[466px] mt-[25px]'>
          <table className='w-full'>
            <thead className='w-full'>
              <tr className='w-full'>
                <th className='text-left mr-[60px]'>
                  <span className='text-[#83818E] font-[400] text-[16px] flex items-center gap-[8px]'>
                    <img src={Calendar} alt="Calendar icon" />
                    Oy
                  </span>
                </th>
                <th className='text-left mr-[60px]'>
                  <span className='text-[16px] text-[#83818E] font-[400] flex items-center gap-[8px]'>
                    <img src={Money} alt="Money icon" />
                    Summa
                  </span>
                </th>
                <th className='text-left mr-[60px]'>
                  <span className='text-[16px] text-[#83818E] font-[400] flex items-center gap-[8px]'>
                    <img src={FinanceType} alt="Finance Type icon" />
                    Turi
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {MyPayments?.EmployeeFinance?.map((item, index) => (
                <tr key={index} className='mt-[25px]'>
                  <td className='text-left pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{index + 1}.</span>
                    <span className='text-[16px] font-[400] text-[#2C393D]'> {item.createdAt.split('T')[0]}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.price}</span>
                  </td>
                  <td className='pt-[25px]'>
                    <span className='text-[16px] font-[400] text-[#2C393D]'>{item.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
