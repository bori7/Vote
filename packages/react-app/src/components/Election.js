import React, { useState } from "react";
import { Empty } from "antd";
import { useContractReader } from "eth-hooks";
import { CreateForm } from "./";

const { ethers } = require("ethers");

const Election = ({ noPolls, pollcurr, tx, writeContracts, pollId, setPollId, totvotes }) => {
  const [tab, setTab] = useState("Polls");
  const [toggleCreate, setToggleCreate] = useState(false);

  const [pollDisabled, setPollDisabled] = useState(pollcurr?.status ?? false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState();

  var results = useContractReader(writeContracts, "NestVotingToken", "displayResults", [pollId]);
  console.log("🏵 nestVotingResults:", results ? results : "...");

  console.log(noPolls, pollcurr);

  return (
    <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
      <div className="text-sm mb-2  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px cursor-pointer">
          {/* <li className="sm:mr-2">
            <div
              className={
                tab == "Polls"
                  ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => setTab(true)}
            >
              Uncompiled
            </div>
          </li> */}
          <li className="sm:mr-2">
            <div
              className={
                tab == "Polls"
                  ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              aria-current="page"
              onClick={() => setTab("Polls")}
            >
              Polls
            </div>
          </li>
          <li className="sm:mr-2">
            <div
              className={
                tab == "Vote"
                  ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              aria-current="page"
              onClick={() => setTab("Vote")}
            >
              Vote
            </div>
          </li>
        </ul>
      </div>

      {tab == "Polls" && (
        <>
          <button
            className="border border-indigo-500 text-white rounded-md px-4 py-2 ml-8 m-2 hover:text-white bg-indigo-600 hover:bg-white focus:bg-white focus:outline-none focus:shadow-outline"
            onClick={() => setToggleCreate(!toggleCreate)}
          >
            <p className="text-sm font-medium leading-none text-white">Set Up Election</p>
          </button>
          {toggleCreate && (
            <div className="w-full overflow-x-auto  rounded-lg shadow-xs ">
              <CreateForm
                name={name}
                description={description}
                categories={categories}
                setName={setName}
                setDescription={setDescription}
                setCategories={setCategories}
                tx={tx}
                writeContracts={writeContracts}
              />
            </div>
          )}

          <div className="w-full overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Poll Title</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {noPolls ? (
                  noPolls[0].map((poll, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">{noPolls[1][index]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{poll}</td>
                      <td className="px-4 py-3 text-xs">
                        <button
                          type="button"
                          className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                          onClick={() => {
                            setPollId(index);
                            setTab("Vote");
                          }}
                        >
                          Go
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <Empty />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab == "Vote" && (
        <div className="mt-10 mx-4 mr-10">
          <p className="text-xs -mb-3">Enable</p>
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                value={pollDisabled}
                onClick={async () => {
                  try {
                    await tx(writeContracts?.NestVotingToken?.disablePoll(pollId));
                    setPollDisabled(!pollDisabled);
                  } catch (error) {
                    console.error(error);
                  } finally {
                  }
                }}
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 cursor-pointer"
              ></label>
            </div>
            <button
              type="button"
              className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              onClick={async () => {
                try {
                  await tx(writeContracts?.NestVotingToken?.compileVotes(pollId));
                } catch (error) {
                  console.error(error);
                } finally {
                }
              }}
            >
              Compile Vote
            </button>

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <div className="relative flex flex-row  mb-4 lg:mb-0 break-words  rounded">
                <div className="rounded-t mb-0 px-0 border-0 bg-gray-50 dark:bg-gray-800 w-full shadow-lg">
                  <div className="flex flex-center items-center px-4 py-2">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-center text-gray-900 dark:text-gray-50">{pollcurr[0] || ""}</h3>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    <table className="items text-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                            Total Votes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-gray-700 dark:text-gray-100">
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {pollcurr ? ethers.utils.formatEther(pollcurr[5]) : 0}
                            {totvotes}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="my-10 mx-4">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Candidates</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y mt-10 dark:divide-gray-700 dark:bg-gray-800">
                      {pollcurr[3].length ? (
                        pollcurr[3].map((item, index) => (
                          <tr
                            key={index}
                            className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <div>
                                  <p className="font-semibold">{item}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                type="button"
                                className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                                onClick={async () => {
                                  try {
                                    await tx(writeContracts?.NestVotingToken?.castVote(pollId, item));
                                  } catch (error) {
                                    console.error(error);
                                  } finally {
                                  }
                                }}
                              >
                                Vote
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <Empty className="mt-10" />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="py-10 ">
              <button
                type="button"
                className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                onClick={async () => {
                  try {
                    await tx(writeContracts?.NestVotingToken?.allowShowResults(pollId));
                  } catch (error) {
                    console.error(error);
                  } finally {
                  }
                }}
              >
                {pollcurr?.showResult ? "Hide Result" : "Show Result"}
              </button>
            </div>

            {pollcurr?.showResult ?? (
              <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
                <div className="relative flex flex-row  mb-4 lg:mb-0 break-words  rounded">
                  <div className="rounded-t mb-0 ml-10 px-5 border-0 bg-gray-50 dark:bg-gray-800 w-full shadow-lg">
                    <div className="flex flex-wrap items-center px-4 py-2">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Results</h3>
                      </div>
                      <div className="relative w-full max-w-full flex-grow flex-1 text-right"></div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      <table className="items   -center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Candidates
                            </th>
                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Votes
                            </th>
                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.length ? (
                            results[0].map((item, index) => (
                              <tr key={index} className="text-gray-700 dark:text-gray-100">
                                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                  {item}
                                </th>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {results[1][index] / 1000}
                                </td>
                                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    <div className="relative w-full">
                                      <span className="mr-2">70%</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <Empty />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Election;
