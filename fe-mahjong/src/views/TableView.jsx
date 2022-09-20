import React, { useEffect, useState } from "react";

import TopNavigationBar from "../components/TopNavigationBar";
import { useMahjongDataStore } from "../store";

export default function TableView() {
  const [isThisColumnCollapsed, setIsThisColumnCollapsed] = useState(false);
  const obtainWholeData = useMahjongDataStore((state) => state?.fetchWholeData);

  useEffect(() => {
    obtainWholeData();
  }, [obtainWholeData]);

  const wholeData = useMahjongDataStore(
    ({ filteredByDateData }) => filteredByDateData
  );

  const allDates = useMahjongDataStore(({ allDates }) => allDates);

  const mapDataClassifiedByDate = useMahjongDataStore(
    ({ mapDataClassifiedByDate }) => mapDataClassifiedByDate
  );

  const collapseThisColumn = () => {
    console.log("entering collapseThisColumn");
    setIsThisColumnCollapsed((previousValue) => !previousValue);
  };

  const handleFilterData = (event) => {
    // console.log(event.target.value);
    mapDataClassifiedByDate(event.target.value);
  };
  const handleCopyToClipboard = () => {
    const _wholeData = wholeData
      .slice()
      .map((data) => data.Score)
      .flat()
      .map(({ east, south, west, north }) => {
        return `==========================\r\n${east.name} || ${
          east.score
        } || ${east.points.toFixed(1)}\r\n${south.name} || ${
          south.score
        } || ${south.points.toFixed(1)}\r\n${west.name} || ${
          west.score
        } || ${west.points.toFixed(1)}\r\n${north.name} || ${
          north.score
        } || ${north.points.toFixed(1)}\r\n==========================\r\n`;
      });
    // .join("%0a");

    console.log(_wholeData);

    navigator.clipboard.writeText(_wholeData);
  };

  console.log(wholeData);
  // console.log(666, mappedWholeData, 666);
  // console.log(allDates);
  // useEffect(() => {
  //   console.log(fetchedData);
  // }, [fetchedData]);

  return (
    <div className="h-full bg-[#3d476a] relative">
      <TopNavigationBar
        prop_toLeft={"/"}
        prop_toRight={"/bar-chart"}
        prop_toLeftText={"< Score submission"}
        prop_toRightText={"Chart >"}
      />
      <div className="my-2 flex justify-center">
        <div>Filter by date:</div>
        <select className="mx-4" onChange={handleFilterData}>
          <option value="All">All</option>
          {allDates?.map((datum) => (
            <option value={datum}>{datum}</option>
          ))}
        </select>
        <button
          onClick={handleCopyToClipboard}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clipboard-data"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />{" "}
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />{" "}
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />{" "}
          </svg>
          <span class="sr-only">Icon description</span>
        </button>
      </div>
      {/* Table */}
      <div className="">
        <table className="table-fixed border-collapse border border-slate-500 w-full bg-[#b7b7ab] text-xs text-left text-gray-500">
          <thead className=" text-xs text-gray-200 uppercase bg-[#3d476a]">
            <tr>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-3 w-2 text-xs truncate border-slate-600 "
                    : "p-3 w-1/5 text-xs truncate border-slate-600 "
                }
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-3 w-2 text-xs truncate border-slate-600 "
                    : "p-3 w-1/5 break-words text-xs border-slate-600 "
                }
              >
                Province/Club
              </th>
              <th scope="col" className="p-3 w-3/5 text-xs">
                Scores
              </th>
            </tr>
          </thead>
          <tbody>
            {wholeData?.map((fetchedDatum, index) => {
              return (
                <tr
                  className="bg-white border border-slate-400 dark:bg-gray-800 dark:border-gray-700"
                  key={fetchedDatum.ID}
                >
                  <td className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate w-fit">
                    {fetchedDatum.created_at.split("T")[0]}
                  </td>
                  <td className="p-1 break-words">
                    {fetchedDatum.province}/{fetchedDatum.club}
                  </td>
                  <td>
                    <td className="p-1 flex justify-around">
                      <div> {fetchedDatum.Score[0]?.east?.name}</div>
                      <div className="justify-self-end">
                        {fetchedDatum.Score[0]?.east?.score}
                      </div>
                      <div className="font-extrabold justify-self-center">
                        {fetchedDatum.Score[0]?.east?.points > 0
                          ? `+${fetchedDatum.Score[0]?.east?.points.toFixed(1)}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.east?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 flex justify-around">
                      <div className="">
                        {fetchedDatum.Score[0]?.south?.name}
                      </div>
                      <div className="">
                        {fetchedDatum.Score[0]?.south?.score}
                      </div>
                      <div className="font-extrabold">
                        {fetchedDatum.Score[0]?.south?.points > 0
                          ? `+${fetchedDatum.Score[0]?.south?.points.toFixed(
                              1
                            )}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.south?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 flex justify-around">
                      <div>{fetchedDatum.Score[0]?.west?.name}</div>
                      <div className="justify-self-end">
                        {fetchedDatum.Score[0]?.west?.score}
                      </div>
                      <div className="font-extrabold justify-self-center">
                        {fetchedDatum.Score[0]?.west?.points > 0
                          ? `+${fetchedDatum.Score[0]?.west?.points.toFixed(1)}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.west?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 flex justify-around">
                      <div>{fetchedDatum.Score[0]?.north?.name}</div>
                      <div>{fetchedDatum.Score[0]?.north?.score}</div>
                      <div className="font-extrabold justify-self-center">
                        {fetchedDatum.Score[0]?.north?.points > 0
                          ? `+${fetchedDatum.Score[0]?.north?.points.toFixed(
                              1
                            )}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.north?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
