import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import LongInputBar from "../components/LongInputBar";
import TopNavigationBar from "../components/TopNavigationBar";
import { ToastContainer, toast } from "react-toastify";

import styles from "./homeView.module.css";

import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

//--// MUI //----------------------------------------------------//
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
//---------------------------------------------------------------//

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
      tsumo: 0,
      ron: 0,
      isRonned: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
      tsumo: 0,
      ron: 0,
      isRonned: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
      tsumo: 0,
      ron: 0,
      isRonned: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
      award: 0,
      chombo: 0,
      tsumo: 0,
      ron: 0,
      isRonned: 0,
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
      setIsSubmittingScore(false);
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
    setIsSubmittingScore(true);
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
    setIsSubmittingScore(false);
    navigate("/table");
  };
  const handleAddChombo = (index) => {
    const newScore = [...score];
    newScore[index].chombo++;
    setScore(newScore);
  };
  const handleAddTsumo = (index) => {
    const newScore = [...score];
    newScore[index].tsumo++;
    setScore(newScore);
  };
  const handleAddRon = (index) => {
    const newScore = [...score];
    newScore[index].ron++;
    setScore(newScore);
  };
  const handleAddIsRonned = (index) => {
    const newScore = [...score];
    newScore[index].isRonned++;
    setScore(newScore);
  };

  const handleReset = (index) => {
    console.log("entering handleAddChombo");
    const newScore = [...score];
    newScore[index].chombo = 0;
    newScore[index].tsumo = 0;
    newScore[index].ron = 0;
    newScore[index].isRonned = 0;
    setScore(newScore);
  };
  const handleDisplayPlayerAndPlayerInfo = (index, playerInfo) => {
    let intermediateString = "";
    let intermediateArray = [];
    if (index === 0) intermediateString += "東";
    if (index === 1) intermediateString += "南";
    if (index === 2) intermediateString += "西";
    if (index === 3) intermediateString += "北";
    if (!!playerInfo.chombo)
      intermediateArray.push(`Chombo: ${playerInfo.chombo}`);
    if (!!playerInfo.tsumo)
      intermediateArray.push(`Tsumo: ${playerInfo.tsumo}`);
    if (!!playerInfo.ron) intermediateArray.push(`Ron: ${playerInfo.ron}`);
    if (!!playerInfo.isRonned)
      intermediateArray.push(`Is ronned: ${playerInfo.isRonned}`);
    return `${intermediateString} ${intermediateArray.join(", ")}`;
  };

  const [isSubmittingScore, setIsSubmittingScore] = useState(false);

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
        <div className="max-w-xs flex flex-col my-[3rem] px-4 py-3 bg-[#20494b] rounded-md shadow-3xl drop-shadow-2xl gap-2">
          {score?.map((scoreDatum, index) => {
            return (
              <div key={index}>
                <div className="my-1 text-[#b7b7ab] text-left">
                  {handleDisplayPlayerAndPlayerInfo(index, scoreDatum)}
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col justify-center gap-[1rem]">
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
                  </div>
                  <div className="p-[1rem] grid grid-cols-2 place-items-center gap-y-[1rem] gap-x-[3rem]">
                    <button
                      onClick={() => handleAddTsumo(index)}
                      className="w-[3rem] bg-red-400 rounded-lg text-slate-500 flex-none r"
                    >
                      T
                    </button>
                    <button
                      onClick={() => handleAddRon(index)}
                      className="w-[3rem] bg-red-400 rounded-lg text-slate-500 flex-none"
                    >
                      R+
                    </button>
                    <button
                      onClick={() => handleAddIsRonned(index)}
                      className="w-[3rem] bg-red-400 rounded-lg text-slate-500 flex-none text-center"
                    >
                      R-
                    </button>
                    <button
                      onClick={() => handleAddChombo(index)}
                      className="w-[3rem] bg-red-400 rounded-lg text-slate-500 flex-none"
                    >
                      C
                    </button>
                  </div>
                </div>
                <div className="flex">
                  {scoreDatum.chombo ||
                  scoreDatum.tsumo ||
                  scoreDatum.ron ||
                  scoreDatum.isRonned ? (
                    <button
                      onClick={() => handleReset(index)}
                      className="shrink p-3 bg-red-400 rounded-lg text-slate-500 w-full "
                    >
                      AC
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}

          <div className="flex justify-around items-center gap-2 ">
            <div className="my-1 text-[#b7b7ab] text-left">
              Total: {totalScore}
            </div>
            <LoadingButton
              sx={{
                color: "#b7b7ab",
                borderColor: "#b7b7ab",
                // "&:focus": {
                //   borderColor: "white",
                // },
                ":hover": {
                  color: "white",
                  borderColor: "white",
                },
                "&.MuiLoadingButton-loading": {
                  color: "white",
                  borderColor: "white",
                },
              }}
              onClick={handleSubmit}
              loading={isSubmittingScore}
              loadingPosition="start"
              startIcon={<SendIcon />}
              variant="outlined"
            >
              Submit
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
