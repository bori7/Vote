import React, { useState } from "react";
import { UploadComp } from "../components";
import "antd/dist/antd.css";

const Stakeholders = ({ tx, writeContracts }) => {
  const [tab, setTab] = useState(1);

  const [teacherUpload, setTeacherUpload] = useState(false);
  const [teacherData, setTeacherData] = useState();

  const [boardUpload, setBoardUpload] = useState(false);
  const [boardData, setBoardData] = useState();

  const [studentUpload, setStudentUpload] = useState(false);
  const [studentData, setStudentData] = useState();

  const [teacherLoad, setTeacherLoad] = useState(false);
  const [studentLoad, setStudentLoad] = useState(false);
  const [boardLoad, setBoardLoad] = useState(false);

  return (
    <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
      <ul className="flex flex-wrap -mb-px mb-4 cursor-pointer">
        <li key={1} className="sm:mr-2">
          <div
            className={
              tab == 1
                ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
            onClick={() => setTab(1)}
          >
            Add Teachers
          </div>
        </li>
        <li key={2} className="sm:mr-2">
          <div
            className={
              tab == 2
                ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
            aria-current="page"
            onClick={() => setTab(2)}
          >
            Add Board Members
          </div>
        </li>
        <li key={3} className="sm:mr-2">
          <div
            className={
              tab == 3
                ? "inline-block p-4 text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-s-500 dark:border-s-500"
                : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
            aria-current="page"
            onClick={() => setTab(3)}
          >
            Add Students
          </div>
        </li>
      </ul>
      {tab == 1 && (
        <UploadComp
          setSameBatchUpload={setTeacherUpload}
          setSameBatchData={setTeacherData}
          setSameBuying={setTeacherLoad}
          sameBuying={teacherLoad}
          sameBatchUpload={teacherUpload}
          sameBatchData={teacherData}
          title={"Add Teachers"}
          tx={tx}
          func={writeContracts.NestVotingToken?.addTeachers}
        />
      )}
      {tab == 2 && (
        <UploadComp
          setSameBatchUpload={setBoardUpload}
          setSameBatchData={setBoardData}
          setSameBuying={setBoardLoad}
          sameBuying={boardLoad}
          sameBatchUpload={boardUpload}
          sameBatchData={boardData}
          title={"Add Board Members"}
          tx={tx}
          func={writeContracts.NestVotingToken?.addBoards}
        />
      )}
      {tab == 3 && (
        <UploadComp
          setSameBatchUpload={setStudentUpload}
          setSameBatchData={setStudentData}
          setSameBuying={setStudentLoad}
          sameBuying={studentLoad}
          sameBatchUpload={studentUpload}
          sameBatchData={studentData}
          title={"Add Students"}
          tx={tx}
          func={writeContracts.NestVotingToken?.addStudents}
        />
      )}
    </div>
  );
};

export default Stakeholders;
