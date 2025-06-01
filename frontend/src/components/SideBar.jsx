import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../main';
import { setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let {userData,otherUsers,selectedUser,onlineUsers,searchData}=useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
    let dispatch=useDispatch()
    let navigate=useNavigate()

    const handleLogOut=async ()=>{
        try {
            let result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setUserData(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch=async ()=>{
        try {
            let result=await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
            handleSearch()

        }
    },[input])

  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block relative bg-slate-200 ${!selectedUser?"block":"hidden"}`}>
        <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center bg-[#20c7ff] text-gray-700 shadow-gray-500 shadow-lg mt-[10px] cursor-pointer fixed bottom-[20px] left-[10px]' onClick={handleLogOut}>
            <BiLogOutCircle className='w-[25px] h-[25px]'/>
        </div>
        {input.length>0 && <div className='absolute top-[250px] bg-white flex w-full h-[560px] overflow-y-auto flex-col gap-[10px] items-center pt-[20px] z-[150] shadow-lg'>
            {searchData?.map((user)=>(
            <div className='w-[95%] h-[70px] flex items-center gap-[20px] px-[10px] hover:bg-[#8bcfff] border-b-2 border-gray-400 cursor-pointer' onClick={()=>{
                dispatch(setSelectedUser(user))
                setInput("")
                setSearch(false)
            }}>
                <div className='relative rounded-full flex items-center justify-center bg-white'>
                    <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center'>
                        <img src={user.image || dp} alt="" className='h-[100%] '/>
                    </div>
                    {onlineUsers?.includes(user._id) &&
                        <span className='w-[12px] h-[12px] rounded-full absolute bg-[#3aff20] bottom-[6px] right-[-1px] shadow-gray-500 shadow-md'></span>}
                </div>
                <h1 className='text-gray-800 font-semibold text-[19px]'>{user.name || user.userName}</h1>
            </div>))}
        </div>}
        

      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
        <div>
            <h1 className='text-white font-bold text-[19px]'>Chatly</h1>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-gray-800 font-bold text-[25px]'>Hii, {userData.name || "user"}...</h1>
                    <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center bg-white items-center shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>navigate("/profile")}>
                        <img src={userData.image || dp} alt="" className='h-[100%] '/>
                    </div>
            </div>
            <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'>
                {!search && <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center bg-white shadow-gray-500 shadow-lg mt-[10px] cursor-pointer' onClick={()=>setSearch(true)}>
                <IoIosSearch className='w-[25px] h-[25px]'/>
                </div>
                }
                {search && 
                    <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative'>
                    <IoIosSearch className='w-[25px] h-[25px]'/>
                    <input type="text" placeholder='search users...' className='w-full h-full text-[17px] p-[10px] outline-0 border-0' onChange={(e)=>setInput(e.target.value)} value={input}/>
                    <RxCross2 className='w-[25px] h-[25px cursor-pointer' onClick={()=>setSearch(false)}/>
                    </form>}
            {!search && otherUsers?.map((user)=>(
                onlineUsers?.includes(user._id) && 
                <div className='relative rounded-full bg-white shadow-gray-500 shadow-lg flex items-center justify-center mt-[10px] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
                 <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center'>
                    <img src={user.image || dp} alt="" className='h-[100%] '/>
                </div>
                <span className='w-[12px] h-[12px] rounded-full absolute bg-[#3aff20] bottom-[6px] right-[-1px] shadow-gray-500 shadow-md'></span>
                </div>
            ))}
            </div>
        </div>
      </div>


      <div className='w-full h-[57%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
        {otherUsers?.map((user)=>(
            <div className='w-[95%] h-[60px] flex items-center gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full hover:bg-[#8bcfff] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
                <div className='relative rounded-full bg-white shadow-gray-500 shadow-lg flex items-center justify-center mt-[10px]'>
                 <div className='w-[60px] h-[60px] overflow-hidden rounded-full flex justify-center items-center'>
                    <img src={user.image || dp} alt="" className='h-[100%] '/>
                </div>
                {onlineUsers?.includes(user._id) &&
                <span className='w-[12px] h-[12px] rounded-full absolute bg-[#3aff20] bottom-[6px] right-[-1px] shadow-gray-500 shadow-md'></span>}
                </div>
                <h1 className='text-gray-800 font-semibold text-[19px]'>{user.name || user.userName}</h1>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
