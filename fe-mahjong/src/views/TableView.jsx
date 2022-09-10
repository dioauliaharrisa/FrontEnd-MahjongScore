import React, { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

import TopNavigationBar from "../components/TopNavigationBar";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TableView() {
  const [fetchedData, setFetchedData] = useState(null);
  const [isThisColumnCollapsed, setIsThisColumnCollapsed] = useState(false);

  const collapseThisColumn = () => {
    console.log("entering collapseThisColumn");
    setIsThisColumnCollapsed((previousValue) => !previousValue);
  };

  useEffect(() => {
    const handleFetchAllData = async () => {
      let { data } = await supabase.from("Game_Details").select(`
        "*",
        Score (
          ID, east, south, west, north, Game_Details_ID
        )
      `);
      // console.log(data);
      // console.log(error);

      setFetchedData(data);
    };
    handleFetchAllData().catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log(fetchedData);
  // }, [fetchedData]);

  return (
    <div className="h-screen bg-[#3d476a] ">
      <TopNavigationBar
        prop_toLeft={"/"}
        prop_toRight={"/bar-chart"}
        prop_toLeftText={"< Score submission"}
        prop_toRightText={"Chart >"}
      />
      <div class="relative mt-5">
        <table class="table-fixed w-full bg-[#b7b7ab] text-xs text-left text-gray-500">
          <thead class=" text-xs text-gray-200 uppercase bg-[#3d476a]">
            <tr>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-1 w-2 text-xs truncate"
                    : "p-1 w-fit text-xs truncate"
                }
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => collapseThisColumn()}
                className={
                  isThisColumnCollapsed
                    ? "p-1 w-2 text-xs truncate"
                    : "p-1 w-fit text-xs truncate"
                }
              >
                Province/Club
              </th>
              <th scope="col" class="p-1  text-xs">
                Player 1
              </th>
              <th scope="col" class="p-1  text-xs">
                Player 2
              </th>
              <th scope="col" class="p-1  text-xs">
                Player 3
              </th>
              <th scope="col" class="p-1  text-xs">
                Player 4
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedData?.map((fetchedDatum, index) => {
              return (
                <tr
                  class="bg-white border-black dark:bg-gray-800 dark:border-gray-700"
                  key={fetchedDatum.ID}
                >
                  <th
                    scope="row"
                    class="p-1 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate w-fit"
                  >
                    {fetchedDatum.created_at.split("T")[0]}
                  </th>
                  <td class="p-1 truncate">
                    {fetchedDatum.province}/{fetchedDatum.club}
                  </td>
                  <td class="p-1">
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
                  <td class="p-1">
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
                  <td class="p-1">
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
                  <td class="p-1">
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
