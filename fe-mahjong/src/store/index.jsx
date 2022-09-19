import create from "zustand";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const useMahjongDataStore = create((set, get) => ({
  wholeData: [],
  allDates: [],
  testWholeData: [],

  fetchWholeData: async () => {
    const { data } = await supabase
      .from("Game_Details")
      .select(
        `
      "*",
      Score (
        ID, east, south, west, north, Game_Details_ID
      )
      `
      )
      .order("created_at", { ascending: false });
    const mappedData = data.map((datum) => {
      const newDatum = datum;
      newDatum.created_at = newDatum.created_at.split("T")[0];
      return newDatum;
    });
    let temporaryObject = {};
    mappedData.forEach((datum) => {
      if (!temporaryObject[datum.created_at])
        temporaryObject[datum.created_at] = [];
      temporaryObject[datum.created_at].push(datum.Score[0]);
    });
    console.log();
    set((state) => (state.wholeData = data));
    set((state) => (state.testWholeData = mappedData));
    set((state) => (state.allDates = Object.keys(temporaryObject)));
  },
  mapDataClassifiedByDate: () => {
    const _wholeData = get().wholeData;
    set((state) => ({
      testWholeData: _wholeData.map((datum) => {
        console.log(datum);
        const newDatum = datum;
        newDatum.created_at = newDatum.created_at.split("T")[0];
        return newDatum;
      }),
    }));
  },
}));

// testWholeData: state.wholeData.map((datum) => {
//   const newDatum = datum;
//   newDatum.created_at = newDatum.created_at.split("T")[0];
//   return newDatum;
// });
