import { useEffect, useState } from "react";
import styles from "./tableView.module.css";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TopNavigationBar from "../components/TopNavigationBar";
import { useMahjongDataStore } from "../store";

export default function RadarView() {
  const obtainWholeData = useMahjongDataStore((state) => state?.fetchWholeData);
  const fetchPlayersData = useMahjongDataStore(
    (state) => state?.fetchPlayersData
  );
  const filteredByDateData = useMahjongDataStore(
    (state) => state?.filteredByDateData
  );
  const graphVersusPointsData = useMahjongDataStore(
    (state) => state?.graphVersusPointsData
  );
  console.log(
    "🦆 ~ file: RadarView.jsx:23 ~ RadarView ~ filteredByDateData:",
    filteredByDateData
  );

  useEffect(() => {
    obtainWholeData();
    fetchPlayersData();
  }, [obtainWholeData, fetchPlayersData]);

  const allPlayers = useMahjongDataStore(({ playersData }) => playersData);

  const mapDataClassifiedByDate = useMahjongDataStore(
    ({ mapDataClassifiedByDate }) => mapDataClassifiedByDate
  );
  const mapDataClassifiedByPlayerName = useMahjongDataStore(
    ({ mapDataClassifiedByPlayerName }) => mapDataClassifiedByPlayerName
  );
  const createGraphVersusPointsData = useMahjongDataStore(
    ({ createGraphVersusPointsData }) => createGraphVersusPointsData
  );

  const handleFilterData = (event, filter) => {
    console.log(
      "🦆 ~ file: TableView.jsx:34 ~ handleFilterData ~ event:",
      66,
      event.target.value,
      filter
    );
    if (filter === "playerName")
      mapDataClassifiedByPlayerName(event.target.value);
    createGraphVersusPointsData(event.target.value);
  };

  return (
    <div className="h-screen bg-[#3d476a]">
      <TopNavigationBar
        prop_toLeft={"/table"}
        prop_toRight
        prop_toLeftText={"< Table"}
        prop_toRightText
      />
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
      <ResponsiveContainer width={"100%"} height="60%">
        <RadarChart
          outerRadius={180}
          width={900}
          height={500}
          data={graphVersusPointsData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[-200, 200]} />
          <Radar
            dataKey="A"
            stroke="red"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
