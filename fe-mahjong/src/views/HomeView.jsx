import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import LongInputBar from "../components/LongInputBar";
import BasicButton from "../components/BasicButton";
import TopNavigationBar from "../components/TopNavigationBar";
import { ToastContainer, toast } from "react-toastify";

import styles from "./homeView.module.css";

import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function HomeView() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const TARGET_POINT = 30000;
  const UMA = [15, 5, -5, -15];
  const [score, setScore] = useState([
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
    },
  ]);

  const [totalScore, setTotalScore] = useState(0);

  // useEffect(() => {
  //   console.log(score);
  //   console.log(totalScore);
  // }, [setScore, score, totalScore]);

  const handleOnChange = (event, index) => {
    const { value, placeholder } = event.target;
    setScore((previousScore) => {
      const newScore = [...previousScore];
      if (placeholder === "name") newScore[index][placeholder] = value;
      if (placeholder === "score") {
        newScore[index][placeholder] = +value;
      }
      const newTotalScore = newScore.reduce(
        (previousValue, { score }) => previousValue + score,
        0
      );
      setTotalScore(newTotalScore);
      return newScore;
    });
  };

  const handleError = (section) => {
    try {
      console.log(`entering handleError`);
      toast.error(`All ${section} should be filled.`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // validation for input
  const handleSubmit = async () => {
    for (const scoreItem of score) {
      console.log(scoreItem);
      if (!scoreItem.name) {
        handleError("names");
        return;
      }
      if (!scoreItem.score) {
        handleError("scores");
        return;
      }
    }

    const sortedScore = score.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    });
    const awardedSortedScore = sortedScore.map((scoreData, index) => {
      scoreData.award = index;
      return scoreData;
    });
    const withEndPointsAwardedSortedScore = awardedSortedScore.map(
      (scoreData) => {
        scoreData.points =
          (+scoreData.score - TARGET_POINT) / 1000 + UMA[scoreData.award];
        scoreData.points = scoreData.points - scoreData.chombo * 30;
        return scoreData;
      }
    );

    const { data } = await supabase.from("Game_Details").insert([
      {
        province: "DKI Jakarta",
        club: "Asosiasi Riichi Mahjong Jakarta Raya",
      },
    ]);
    await supabase.from("Score").insert([
      {
        east: score[0],
        south: score[1],
        west: score[2],
        north: score[3],
        Game_Details_ID: data[0].ID,
      },
    ]);

    navigate("/table");
  };
  const handleAddChombo = (index) => {
    console.log("entering handleAddChombo");
    const newScore = [...score];
    newScore[index].chombo++;
    setScore(newScore);
  };
  const handleSetChomboTo0 = (index) => {
    console.log("entering handleAddChombo");
    const newScore = [...score];
    newScore[index].chombo = 0;
    setScore(newScore);
  };

  return (
    <div className={styles.screen}>
      <TopNavigationBar
        prop_toLeft={"/login"}
        prop_toRight={"/table"}
        prop_toLeftText={"< Logout"}
        prop_toRightText={"Table >"}
      />
      <ToastContainer limit={2} />
      <div className="grid content-center justify-items-center">
        <div className="max-w-xs flex flex-col m-4 mt-20 px-4 py-3 bg-[#20494b] rounded-md shadow-3xl  drop-shadow-2xl gap-2">
          {score?.map((scoreDatum, index) => {
            return (
              <div key={index}>
                <div className="my-1 text-[#b7b7ab] text-left">
                  {scoreDatum.chombo
                    ? `Player ${index + 1} (Chombo ${scoreDatum.chombo})`
                    : `Player  ${index + 1} `}
                </div>
                <div className="flex flex-row gap-3">
                  <LongInputBar
                    prop_placeholderText={"name"}
                    prop_type={"text"}
                    prop_stateIndex={index}
                    prop_onChange={handleOnChange}
                  />
                  <LongInputBar
                    prop_placeholderText={"score"}
                    prop_type={"number"}
                    prop_stateIndex={index}
                    prop_onChange={handleOnChange}
                  />
                  <button
                    onClick={() => handleAddChombo(index)}
                    className="px-3 bg-red-400 rounded-lg text-slate-500 flex-none"
                  >
                    C
                  </button>
                  {scoreDatum.chombo ? (
                    <button
                      onClick={() => handleSetChomboTo0(index)}
                      className="shrink px-3 bg-red-400 rounded-lg text-slate-500 "
                    >
                      X
                    </button>
                  ) : (
                    <div className="shrink hidden"></div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex justify-around items-center gap-2 ">
            <div className="my-1 text-[#b7b7ab] text-left">
              Total: {totalScore}
            </div>

            <BasicButton prop_onClick={handleSubmit} prop_buttonName={"Submit"}>
              {" "}
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
