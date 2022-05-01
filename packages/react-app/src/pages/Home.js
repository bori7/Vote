import React from "react";
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

      <div className="grid   sm:grid-cols-1 lg:grid-cols-2 ">
        <div class="w-full md:w-5/10 px-4 text-center">
          <div class="relative flex flex-col  break-words bg-blue w-full mb-8 shadow-lg rounded-lg">
            <div class="px-4 py-5 flex-auto">
              <div className="relative flex flex-row  mb-4 lg:mb-0 break-words rounded">
                <div className="rounded-t mb-0 px-0 border-0 bg-gray-50 dark:bg-gray-800 w-full shadow-lg">
                  <div className="rounded-md w-full overflow-x-auto">
                    <div className="items text-center w-full bg-transparent border-collapse">
                      <p className="px-4  bg-blue-500 dark:bg-gray-600 text-white dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                        My Vote Tokens Left
                      </p>

                      <div class=" bg-blue-500 p-3 dark:bg-gray-600 text-center inline-flex items-center justify-center  mb-5 shadow-lg rounded-lg ">
                        <h6 className="border-t-0 text-white  align-middle border-l-0 border-r-0 text-md whitespace-nowrap ">
                          {voteCoinBalance ?? 0}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full md:w-5/10 px-4 text-center">
          <div class="relative flex flex-col  break-words bg-blue w-full mb-8 shadow-lg rounded-lg">
            <div class="px-4 py-5 flex-auto">
              <div className="relative flex flex-row  mb-4 lg:mb-0 break-words rounded">
                <div className="rounded-t mb-0 px-0 border-0 bg-gray-50 dark:bg-gray-800 w-full shadow-lg">
                  <div className="rounded-md w-full overflow-x-auto">
                    <div className="items text-center w-full bg-transparent border-collapse">
                      <p className="px-4  bg-blue-500 dark:bg-gray-600 text-white dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                        Vote Tokens in Bank
                      </p>

                      <div class=" bg-blue-500 dark:bg-gray-600 p-3 text-center inline-flex items-center justify-center  mb-5 shadow-lg rounded-lg ">
                        <h6 className="border-t-0 text-white  align-middle border-l-0 border-r-0 text-md whitespace-nowrap ">
                          {bankCoinBalance ?? 0}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
