import React from "react";
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

export default function RadarView() {
  const data = [
    {
      subject: "Aggresiveness",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Luck",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Riichi",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Defensiveness",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "X",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "Dama",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  return (
    <div className="h-screen bg-[#3d476a]">
      <TopNavigationBar
        prop_toLeft={"/table"}
        prop_toRight
        prop_toLeftText={"< Table"}
        prop_toRightText
      />
      <ResponsiveContainer width={"100%"} height="80%">
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
