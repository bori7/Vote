import React from "react";
import Sidebars from "../components/Sidebars";
import { FaUsers, FaCheckDouble, FaUserGraduate, FaUserTie } from "react-icons/fa";

const Home = ({ noTeachers, noStudents, noBoards, noPolls, voteCoinBalance, bankCoinBalance }) => {
  return (
    <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FaUsers className="w-8 h-8 text-blue-700" />
          </div>
          <div className="text-right">
            <p className="text-2xl">{noTeachers && noTeachers?.length}</p>
            <p>Teachers</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FaCheckDouble className="w-8 h-8 text-blue-700" />
          </div>
          <div className="text-right">
            <p className="text-2xl">{noPolls && noPolls[0]?.length}</p>
            <p>Active Elections</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FaUserGraduate className="w-8 h-8 text-blue-700" />
          </div>
          <div className="text-right">
            <p className="text-2xl">{noStudents && noStudents?.length}</p>
            <p>Students</p>
          </div>
        </div>
        <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <FaUserTie className="w-8 h-8 text-blue-700" />
          </div>
          <div className="text-right">
            <p className="text-2xl">{noBoards && noBoards?.length}</p>
            <p>Board Members</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">wallet Address</th>
              <th className="px-4 py-3">Position</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">Hans Burger</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">8748494040449940400404</td>
              <td className="px-4 py-3 text-xs">
                <span className="px-2 py-1 font-semibold leading-tight text-slate-700  rounded-full  dark:text-white">
                  {" "}
                  Teacher{" "}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <div className="relative flex flex-row  mb-4 lg:mb-0 break-words  rounded">
          <div className="rounded-t mb-0 px-0 border-0 bg-gray-50 dark:bg-gray-800 w-full shadow-lg">
            <div className="block w-full overflow-x-auto">
              <table className="items text-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Vote Tokens in Supply
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 dark:text-gray-100">
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {voteCoinBalance ?? 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <div className="relative flex flex-row  mb-4 lg:mb-0 break-words  rounded">
          <div className="rounded-t mb-0 px-0 border-0 bg-indigo-500 dark:bg-gray-800 w-full shadow-lg">
            <div className="block w-full overflow-x-auto">
              <table className="items text-center w-full bg-indigo-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Vote Tokens in Bank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700 dark:text-gray-100">
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {bankCoinBalance ?? 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
