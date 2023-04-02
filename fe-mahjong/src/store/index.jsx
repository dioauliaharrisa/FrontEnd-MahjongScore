import create from "zustand";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const useMahjongDataStore = create((set, get) => ({
  wholeData: [],
  allDates: [],
  filteredByDateData: [],
  playersData: [],
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
    set((state) => (state.filteredByDateData = data));
    set((state) => (state.testWholeData = mappedData));
    set((state) => (state.allDates = Object.keys(temporaryObject)));
  },
  fetchPlayersData: async () => {
    const { data, error } = await supabase.from("Players").select("*");
    set((state) => (state.playersData = data));
  },
  mapDataClassifiedByDate: (date) => {
    // console.log(date);
    const _wholeData = get().wholeData;
    if (date === "All") {
      set((state) => (state.filteredByDateData = _wholeData));
      return;
    }
    const filteredWholeData = _wholeData.filter(
      (data) => data.created_at === date
    );
    set((state) => (state.filteredByDateData = filteredWholeData));
  },
  mapDataClassifiedByPlayerName: (playerName) => {
    console.log(playerName);
    const _wholeData = get().wholeData;
    console.log(
      "🦆 ~ file: index.jsx:61 ~ useMahjongDataStore ~ _wholeData:",
      _wholeData
    );
    if (playerName === "All") {
      set((state) => (state.filteredByDateData = _wholeData));
      return;
    }
    const filteredWholeData = _wholeData.filter((data) => {
      return (
        data.Score[0].east.nameId === playerName ||
        data.Score[0].north.nameId === playerName ||
        data.Score[0].south.nameId === playerName ||
        data.Score[0].west.nameId === playerName
      );
    });
    set((state) => (state.filteredByDateData = filteredWholeData));
  },
}));
