import React, { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

import TopNavigationBar from "../components/TopNavigationBar";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TableView() {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const handleFetchAllData = async () => {
      let { data, error } = await supabase.from("Game_Details").select(`
        "*",
        Score (
          ID, east, south, west, north, Game_Details_ID
        )
      `);
      console.log(data);
      console.log(error);

      setFetchedData(data);
    };
    handleFetchAllData().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <div className="h-screen bg-[#3d476a] ">
      <TopNavigationBar
        prop_toLeft={"/"}
        prop_toRight
        prop_toLeftText={"< Score submission"}
        prop_toRightText={"Chart >"}
      />
      <div class="overflow-x-auto relative ">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-200 uppercase bg-[#3d476a]">
            <tr>
              <th scope="col" class="py-3 px-6 text-xs">
                Date
              </th>
              <th scope="col" class="py-3 px-6 text-xs">
                Province/Club
              </th>
              <th scope="col" class="py-3 px-6 text-xs">
                East
              </th>
              <th scope="col" class="py-3 px-6 text-xs">
                South
              </th>
              <th scope="col" class="py-3 px-6 text-xs">
                West
              </th>
              <th scope="col" class="py-3 px-6 text-xs">
                North
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedData?.map((fetchedDatum) => {
              return (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={fetchedDatum.ID}
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {fetchedDatum.created_at.split("T")[0]}
                  </th>
                  <td class="py-4 px-6">
                    {fetchedDatum.province}/{fetchedDatum.club}
                  </td>
                  <td class="py-4 px-6">
                    {fetchedDatum.Score[0]?.east?.name}/
                    {fetchedDatum.Score[0]?.east?.score}
                  </td>
                  <td class="py-4 px-6">
                    {fetchedDatum.Score[0]?.south?.name}/
                    {fetchedDatum.Score[0]?.south?.score}
                  </td>
                  <td class="py-4 px-6">
                    {fetchedDatum.Score[0]?.west?.name}/
                    {fetchedDatum.Score[0]?.west?.score}
                  </td>
                  <td class="py-4 px-6">
                    {fetchedDatum.Score[0]?.north?.name}/
                    {fetchedDatum.Score[0]?.north?.score}
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
