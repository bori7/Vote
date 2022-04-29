import React from 'react'
import { Link } from 'react-router-dom'
import {FaFingerprint, FaHome, FaUsers} from "react-icons/fa"

const sidebars = [
   { path: "/",
    exact: true,
    name:"Dashboard",
    icon:<FaHome className="w-5 h-5"/>
  },
  {
    path: "/stakeholders",
    name:"Stakeholders", 
    icon:<FaUsers className="w-5 h-5"/>

  },
  {
    path: "/elections",
    name:"Elections",
    icon:<FaFingerprint className="w-5 h-5"/>

  }
]

 const Sidebars = () => {
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Main</div>
          </div>
        </li>
       {sidebars.map((sidebar, index)=>( <li>
          <Link to={sidebar.path} key={index + sidebar.name} to={sidebar.path} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                    {sidebar.icon}
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">{sidebar.name}</span>
          </Link>
        </li>))}
        
      </ul>
      <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2022</p>
    </div>
  </div>  )
}
export default Sidebars