import React from 'react'
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';

function DashBoardComponent() {

    const [state, setState] = useState({
        create:true,
        transfer:false,
        apply:false,
    });

    const handleClick = (data) => {
     if (data === 'create') {
      setState({ create: true, transfer: false, apply: false });
    }   else if (data === 'transfer') {
       setState({ create: false, transfer: true, apply: false });
    } else {
      setState({ create: false, transfer: false, apply: true });
    }};

    
  return (
    <div className='w-screen h-screen p-10'>
        <div className='w-200 h-33 flex justify-between'>
          <div onClick={() => handleClick('create')} className='w-50 bg-green-100 h-full flex justify-center items-center border-l-4 border-green-600 rounded-2xl text-black font-bold'>Create Account&nbsp;<AddCircleOutlineIcon/></div>
          <div onClick={() => handleClick('transfer')} className='w-50 bg-yellow-100 h-full flex justify-center items-center border-l-4 border-green-600 rounded-2xl text-black font-bold'>Transfer Money&nbsp;<AttachMoneyIcon/></div>
          <div onClick={() => handleClick('apply')} className='w-50 bg-pink-100 h-full flex justify-center items-center border-l-4 border-green-600 rounded-2xl text-black font-bold'>Apply for Loans&nbsp;<RealEstateAgentIcon/></div>
        </div>
        <div className='w-full h-100 bg-purple-20 mt-10 flex'>
           <div className='flex-1 bg-red-30 h-full'>
            {/* {state.create ? 'create' : state.apply ? 'Apply' : 'transfer'} */}
            <div className='h-full w-full border-2 p-3'>
                   <h3 className='text-center font-bold'>Create Account</h3>
                <div className='mt-5 h-30 bg-yellow-50 flex justify-center items-center'>
                   <p className='text-md font-medium inline'>Select Account Type &nbsp; </p>
                <select className="p-2 border rounded-md"
        // value={selectedOption}
        // onChange={handleOptionChange}
        >
             <option value="name">Savings Account</option>
             <option value="email">Current Account</option>
            <option value="phone">FD Account</option>
            </select>
            </div>
            <div className='mt-5 h-20 bg-yellow-50 flex justify-center items-center'>
                <input placeholder='Initial Deposit' className='w-full h-13 bg-gray-300 rounded-2xl pl-4'/>
            </div>
               <br/>
             <button className='w-full mt-1 bg-red-700 text-white font-medium h-12 rounded-3xl'>Create Account</button>
            </div>
           </div>
           <div className='flex-2 bg-yellow-20 h-full p-5'>
            {/* exsiting accounts */}
             <div className='h-full w-full'>
                <h4 className='text-center font-medium text-2xl'>Existing Accounts</h4>
                <div className='h-60 bg-red-00 w-full mt-5'>
                   <div className='w-full h-17 rounded-2xl border-2 border-l-4 border-l-red-600 flex justify-between items-center my-1'>
                      <div className='h-full w-2/6 flex justify-start items-center'>AHGFGBHNM90875A</div>
                      <div className='h-full w-2/6 flex justify-start items-center'>Account Type : Savings</div>
                      <div className='h-full w-2/6 flex justify-start items-center'>Balance: Rs.10000</div>
                   </div>
                </div>
             </div>
           </div>
        </div>
    </div>
  )
}

export default DashBoardComponent