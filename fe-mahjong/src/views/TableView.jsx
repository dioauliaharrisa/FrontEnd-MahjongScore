import React, { useEffect, useState } from "react";
import styles from "./tableView.module.css";

import * as XLSX from "xlsx/xlsx.mjs";

import TopNavigationBar from "../components/TopNavigationBar";
import { useMahjongDataStore } from "../store";

export default function TableView() {
  const obtainWholeData = useMahjongDataStore((state) => state?.fetchWholeData);
  const fetchPlayersData = useMahjongDataStore(
    (state) => state?.fetchPlayersData
  );

  useEffect(() => {
    obtainWholeData();
    fetchPlayersData();
  }, [obtainWholeData, fetchPlayersData]);

  const wholeData = useMahjongDataStore(
    ({ filteredByDateData }) => filteredByDateData
  );

  const allDates = useMahjongDataStore(({ allDates }) => allDates);
  const allPlayers = useMahjongDataStore(({ playersData }) => playersData);

  const mapDataClassifiedByDate = useMahjongDataStore(
    ({ mapDataClassifiedByDate }) => mapDataClassifiedByDate
  );
  const mapDataClassifiedByPlayerName = useMahjongDataStore(
    ({ mapDataClassifiedByPlayerName }) => mapDataClassifiedByPlayerName
  );

  const handleFilterData = (event, filter) => {
    console.log(
      "🦆 ~ file: TableView.jsx:34 ~ handleFilterData ~ event:",
      66,
      event.target.value,
      filter
    );
    if (filter === "date") mapDataClassifiedByDate(event.target.value);
    if (filter === "playerName")
      mapDataClassifiedByPlayerName(event.target.value);
  };
  const handleCopyToClipboard = () => {
    const _wholeData = wholeData
      .slice()
      .map((data) => data.Score)
      .flat()
      .map(({ east, south, west, north }) => {
        return `==========================\r\n${east.name}${`\x20`.repeat(
          15 - east.name.length
        )} || ${east.score} || *${east.points.toFixed(1)}*\r\n${
          south.name
        }${`\x20`.repeat(15 - south.name.length)}  || ${
          south.score
        } || *${south.points.toFixed(1)}*\r\n${west.name}${`\x20`.repeat(
          15 - west.name.length
        )}  || ${west.score} || *${west.points.toFixed(1)}*\r\n${
          north.name
        }${`\x20`.repeat(15 - north.name.length)}  || ${
          north.score
        } || *${north.points.toFixed(1)}*\r\n`;
      })
      .join("")
      .concat("==========================\r\n");

    navigator.clipboard.writeText(_wholeData);
  };

  const handleDownloadExcel = () => {
    const _wholeData = wholeData.slice();
    console.log(
      "🦆 ~ file: TableView.jsx:73 ~ handleDownloadExcel ~ _wholeData:",
      _wholeData
    );
    const workbook = XLSX.utils.book_new();
    const header = [];
    const column = {
      date: "Date",
      東rank: "東 Rank",
      東name: "東 Name",
      東score: "東 Score",
      東points: "東 Points",
      南rank: "南 Rank",
      南name: "南 Name",
      南score: "南 Score",
      南points: "南 Points",
      西rank: "西 Rank",
      西name: "西 Name",
      西score: "西 Score",
      西points: "西 Points",
      北rank: "北 Rank",
      北name: "北 Name",
      北score: "北 Score",
      北points: "北 Points",
    };
    for (const key in column) {
      header.push(column[key]);
    }

    const data = _wholeData.map((datum) => {
      return {
        [column.date]: datum.created_at,
        [column.東rank]: datum.Score[0].east.award + 1,
        [column.東name]: datum.Score[0].east.name,
        [column.東score]: datum.Score[0].east.score,
        [column.東points]: datum.Score[0].east.points,
        [column.南rank]: datum.Score[0].south.award + 1,
        [column.南name]: datum.Score[0].south.name,
        [column.南score]: datum.Score[0].south.name,
        [column.南points]: datum.Score[0].south.points,
        [column.西rank]: datum.Score[0].west.award + 1,
        [column.西name]: datum.Score[0].west.name,
        [column.西score]: datum.Score[0].west.name,
        [column.西points]: datum.Score[0].west.points,
        [column.北rank]: datum.Score[0].north.award + 1,
        [column.北name]: datum.Score[0].north.name,
        [column.北score]: datum.Score[0].north.name,
        [column.北points]: datum.Score[0].north.points,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data, { header });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Mahjong Data", true);
    XLSX.writeFile(
      workbook,
      `Mahjong Data - ${new Date().toLocaleString("en-US")}.xlsx`
    );
  };

  return (
    <div className="h-full bg-[#b7b7ab]">
      <TopNavigationBar
        prop_toLeft={"/"}
        prop_toRight={"/bar-chart"}
        prop_toLeftText={"< Score submission"}
        prop_toRightText={"Chart >"}
      />
      <div className="my-2 flex flex-col justify-center relative">
        <div className={styles.filterText}>Filter by date:</div>
        <select
          className={styles.filterDropDown}
          onChange={(event) => handleFilterData(event, "date")}
        >
          <option value="All">All</option>
          {allDates?.map((datum) => (
            <option value={datum}>{datum}</option>
          ))}
        </select>
        <div className={styles.filterText}>Filter by player:</div>
        <select
          className={styles.filterDropDown}
          onChange={(event) => handleFilterData(event, "playerName")}
        >
          <option value="All">All</option>
          {allPlayers?.map((datum) => (
            <option value={datum.id}>{datum.name}</option>
          ))}
        </select>
        <button
          onClick={handleCopyToClipboard}
          type="button"
          className="fixed bottom-0 right-10 m-10 p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        </button>
        <button
          onClick={handleDownloadExcel}
          type="button"
          className="fixed bottom-10 right-10 m-10 p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 26 26"
            fill="currentColor"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  // style="fill:#030104;"
                  d="M25.162,3H16v2.984h3.031v2.031H16V10h3v2h-3v2h3v2h-3v2h3v2h-3v3h9.162 C25.623,23,26,22.609,26,22.13V3.87C26,3.391,25.623,3,25.162,3z M24,20h-4v-2h4V20z M24,16h-4v-2h4V16z M24,12h-4v-2h4V12z M24,8 h-4V6h4V8z"
                ></path>
                <path
                  // style="fill:#030104;"
                  d="M0,2.889v20.223L15,26V0L0,2.889z M9.488,18.08l-1.745-3.299c-0.066-0.123-0.134-0.349-0.205-0.678 H7.511C7.478,14.258,7.4,14.494,7.277,14.81l-1.751,3.27H2.807l3.228-5.064L3.082,7.951h2.776l1.448,3.037 c0.113,0.24,0.214,0.525,0.304,0.854h0.028c0.057-0.198,0.163-0.492,0.318-0.883l1.61-3.009h2.542l-3.037,5.022l3.122,5.107 L9.488,18.08L9.488,18.08z"
                ></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
      {/* Table */}
      <div>
        <table className="table-fixed border-collapse border border-slate-500 text-xs text-left text-gray-500">
          <thead className="text-xs text-gray-200 uppercase bg-[#20494b]">
            <tr>
              <th scope="col" className={styles.dateTableHead}>
                Date
              </th>
              <th scope="col" className={styles.provinceOrClubTableHead}>
                Province <br></br>/<br></br>Club
              </th>
              <th scope="col" className={styles.scoresTableHead}>
                Scores
              </th>
              <th scope="col" className={styles.infoTableHead}>
                Info (Tsumo, Ron, Ronned, Chombo)
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
                  <td className="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate w-fit text-center">
                    <br />
                    {fetchedDatum.created_at.split("T")[0].split("-")[0]}
                    <br />
                    {fetchedDatum.created_at.split("T")[0].split("-")[1]}
                    <br />
                    {fetchedDatum.created_at.split("T")[0].split("-")[2]}
                    <br />
                  </td>
                  <td className="p-1 break-words text-[.5rem]">
                    <strong>{fetchedDatum.province}</strong>/{fetchedDatum.club}
                  </td>
                  <td>
                    <td className="p-1 grid grid-cols-3 justify-between">
                      <div> {fetchedDatum.Score[0]?.east?.name}</div>
                      <div className={styles.scoreTableRow}>
                        {fetchedDatum.Score[0]?.east?.score}
                      </div>
                      <div className="font-extrabold justify-self-end">
                        {fetchedDatum.Score[0]?.east?.points > 0
                          ? `+${fetchedDatum.Score[0]?.east?.points.toFixed(1)}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.east?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 grid grid-cols-3 justify-between">
                      <div className="">
                        {fetchedDatum.Score[0]?.south?.name}
                      </div>
                      <div className={styles.scoreTableRow}>
                        {fetchedDatum.Score[0]?.south?.score}
                      </div>
                      <div className="font-extrabold justify-self-end">
                        {fetchedDatum.Score[0]?.south?.points > 0
                          ? `+${fetchedDatum.Score[0]?.south?.points.toFixed(
                              1
                            )}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.south?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 grid grid-cols-3 justify-between">
                      <div>{fetchedDatum.Score[0]?.west?.name}</div>
                      <div className={styles.scoreTableRow}>
                        {fetchedDatum.Score[0]?.west?.score}
                      </div>
                      <div className="font-extrabold justify-self-end">
                        {fetchedDatum.Score[0]?.west?.points > 0
                          ? `+${fetchedDatum.Score[0]?.west?.points.toFixed(1)}`
                          : `▲${Math.abs(
                              fetchedDatum.Score[0]?.west?.points.toFixed(1)
                            )}`}
                      </div>
                    </td>
                    <td className="p-1 grid grid-cols-3 justify-between">
                      <div>{fetchedDatum.Score[0]?.north?.name}</div>
                      <div className={styles.scoreTableRow}>
                        {fetchedDatum.Score[0]?.north?.score}
                      </div>
                      <div className="font-extrabold justify-self-end">
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
                  <td>
                    <td className="p-1 grid grid-cols-4 place-items-center">
                      <div> {fetchedDatum.Score[0]?.east?.tsumo}</div>
                      <div> {fetchedDatum.Score[0]?.east?.ron}</div>
                      <div> {fetchedDatum.Score[0]?.east?.isRonned}</div>
                      <div> {fetchedDatum.Score[0]?.east?.chombo}</div>
                    </td>
                    <td className="p-1 grid grid-cols-4 place-items-center">
                      <div> {fetchedDatum.Score[0]?.south?.tsumo}</div>
                      <div> {fetchedDatum.Score[0]?.south?.ron}</div>
                      <div> {fetchedDatum.Score[0]?.south?.isRonned}</div>
                      <div> {fetchedDatum.Score[0]?.south?.chombo}</div>
                    </td>
                    <td className="p-1 grid grid-cols-4 place-items-center">
                      <div> {fetchedDatum.Score[0]?.west?.tsumo}</div>
                      <div> {fetchedDatum.Score[0]?.west?.ron}</div>
                      <div> {fetchedDatum.Score[0]?.west?.isRonned}</div>
                      <div> {fetchedDatum.Score[0]?.west?.chombo}</div>
                    </td>
                    <td className="p-1 grid grid-cols-4 place-items-center">
                      <div> {fetchedDatum.Score[0]?.north?.tsumo}</div>
                      <div> {fetchedDatum.Score[0]?.north?.ron}</div>
                      <div> {fetchedDatum.Score[0]?.north?.isRonned}</div>
                      <div> {fetchedDatum.Score[0]?.north?.chombo}</div>
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
