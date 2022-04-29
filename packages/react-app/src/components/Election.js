import React, { useState } from "react";

const Election = () => {
  const [tab, setTab] = useState(true);

  return (
    <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
      <div className="text-sm mb-2  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="sm:mr-2">
            <div
              className={
                tab
                  ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => setTab(true)}
            >
              Uncompiled
            </div>
          </li>
          <li className="sm:mr-2">
            <div
              className={
                !tab
                  ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              aria-current="page"
              onClick={() => setTab(false)}
            >
              Compiled
            </div>
          </li>
        </ul>
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 fixed right-0 top-16  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <p className="text-sm font-medium leading-none text-white">Set Up Election</p>
        </button>
      </div>
      <div className="mt-20 mx-4 mr-10">
        <p className="text-xs -mb-3">enable</p>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
            ></label>
          </div>
          <button
            type="button"
            className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          >
            Compile Vote
          </button>
          <div className="w-full overflow-x-auto">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Election;
