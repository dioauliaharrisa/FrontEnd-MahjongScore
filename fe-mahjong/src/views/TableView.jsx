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
    console.log(event.target.value);
    mapDataClassifiedByDate(event.target.value);
  };

  console.log(wholeData);
  // console.log(666, mappedWholeData, 666);
  // console.log(allDates);
  // useEffect(() => {
  //   console.log(fetchedData);
  // }, [fetchedData]);

  return (
    <div className="h-full bg-[#3d476a] ">
      <TopNavigationBar
        prop_toLeft={"/"}
        prop_toRight={"/bar-chart"}
        prop_toLeftText={"< Score submission"}
        prop_toRightText={"Chart >"}
      />
      <select onChange={handleFilterData}>
        <option value="All">All</option>
        {allDates?.map((datum) => (
          <option value={datum}>{datum}</option>
        ))}
      </select>
      <div className="relative mt-5">
        <table className="table-fixed w-full bg-[#b7b7ab] text-xs text-left text-gray-500">
          <thead className=" text-xs text-gray-200 uppercase bg-[#3d476a]">
            <tr>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-1 w-2 text-xs "
                    : // truncate"
                      "p-1 w-fit text-xs "
                  // truncate"
                }
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-1 w-2 text-xs "
                    : // truncate"
                      "p-1 w-fit text-xs "
                  // truncate"
                }
              >
                Province/Club
              </th>
              <th scope="col" className="p-1  text-xs">
                Player 1
              </th>
              <th scope="col" className="p-1  text-xs">
                Player 2
              </th>
              <th scope="col" className="p-1  text-xs">
                Player 3
              </th>
              <th scope="col" className="p-1  text-xs">
                Player 4
              </th>
            </tr>
          </thead>
          <tbody>
            {wholeData?.map((fetchedDatum, index) => {
              return (
                <tr
                  className="bg-white border-black dark:bg-gray-800 dark:border-gray-700"
                  key={fetchedDatum.ID}
                >
                  <th
                    scope="row"
                    className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate w-fit"
                  >
                    {fetchedDatum.created_at.split("T")[0]}
                  </th>
                  <td className="p-1 truncate">
                    {fetchedDatum.province}/{fetchedDatum.club}
                  </td>
                  <td className="p-1">
                    {fetchedDatum.Score[0]?.east?.name}/
                    {fetchedDatum.Score[0]?.east?.score}/
                    <div className="font-extrabold">
                      {fetchedDatum.Score[0]?.east?.points > 0
                        ? `+ ${fetchedDatum.Score[0]?.east?.points.toFixed(1)}`
                        : `▲ ${Math.abs(
                            fetchedDatum.Score[0]?.east?.points.toFixed(1)
                          )}`}
                    </div>
                  </td>
                  <td className="p-1">
                    {fetchedDatum.Score[0]?.south?.name}/
                    {fetchedDatum.Score[0]?.south?.score}/
                    <div className="font-extrabold">
                      {fetchedDatum.Score[0]?.south?.points > 0
                        ? `+ ${fetchedDatum.Score[0]?.south?.points.toFixed(1)}`
                        : `▲ ${Math.abs(
                            fetchedDatum.Score[0]?.south?.points.toFixed(1)
                          )}`}
                    </div>
                  </td>
                  <td className="p-1">
                    {fetchedDatum.Score[0]?.west?.name}/
                    {fetchedDatum.Score[0]?.west?.score}/
                    <div className="font-extrabold">
                      {fetchedDatum.Score[0]?.west?.points > 0
                        ? `+ ${fetchedDatum.Score[0]?.west?.points.toFixed(1)}`
                        : `▲ ${Math.abs(
                            fetchedDatum.Score[0]?.west?.points.toFixed(1)
                          )}`}
                    </div>
                  </td>
                  <td className="p-1">
                    {fetchedDatum.Score[0]?.north?.name}/
                    {fetchedDatum.Score[0]?.north?.score}/
                    <div className="font-extrabold">
                      {fetchedDatum.Score[0]?.north?.points > 0
                        ? `+ ${fetchedDatum.Score[0]?.north?.points.toFixed(1)}`
                        : `▲ ${Math.abs(
                            fetchedDatum.Score[0]?.north?.points.toFixed(1)
                          )}`}
                    </div>
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
