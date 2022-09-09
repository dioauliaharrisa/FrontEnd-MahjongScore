import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import LongInputBar from "../components/LongInputBar";
import BasicButton from "../components/BasicButton";
import TopNavigationBar from "../components/TopNavigationBar";
import { ToastContainer, toast } from "react-toastify";

import { Link } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function HomeView() {
  // eslint-disable-next-line
  const TARGET_POINT = 30000;
  const UMA = [15, 5, -5, -15];
  const [score, setScore] = useState([
    {
      name: "",
      score: 0,
      points: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
    },
    {
      name: "",
      score: 0,
      points: 0,
    },
  ]);

  const [totalScore, setTotalScore] = useState(0);

  const handleOnChange = (event, index) => {
    const { value, placeholder } = event.target;
    setScore((previousScore) => {
      // console.log(value, placeholder, index);
      // console.log(typeof value);
      // console.log(placeholder);
      // console.log(previousScore);
      // console.log(previousScore[+index]);
      // console.log(previousScore[+index][placeholder]);

      if (placeholder === "name") previousScore[index][placeholder] = value;
      if (placeholder === "score") {
        previousScore[index][placeholder] = +value;
        const endScore = (+value - TARGET_POINT) / 1000 + UMA[index];
        // console.log(endScore);
        previousScore[index]["points"] = endScore;
      }

      // console.log(previousScore);
      // console.log(totalScore);
      const newTotalScore = previousScore.reduce(
        (previousValue, { score }) => previousValue + score,
        0
      );
      // console.log(newTotalScore);
      setTotalScore(newTotalScore);
      return previousScore;
    });
  };

  const notify = (section) => {
    console.log(`entering notify`);
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
  };

  const handleSubmit = async () => {
    for (const scoreItem of score) {
      // console.log(scoreItem);
      if (!scoreItem.name) {
        notify("names");
        return;
      }
      if (!scoreItem.score) {
        notify("scores");
        return;
      }
    }

    const { data } = await supabase.from("Game_Details").insert([
      {
        province: "DKI Jakarta",
        club: "Asosiasi Riichi Mahjong Jakarta Raya",
      },
    ]);
    // console.log(data[0].ID);
    // console.log(data.body);
    // console.log(data.body[0])
    // console.log(data.body[0].ID);
    await supabase.from("Score").insert([
      {
        east: score[0],
        south: score[1],
        west: score[2],
        north: score[3],
        Game_Details_ID: data[0].ID,
      },
    ]);
  };

  return (
    <div className="h-screen bg-[#3d476a]">
      {/* */}
      <TopNavigationBar
        prop_toLeft={"/login"}
        prop_toRight={"/table"}
        prop_toLeftText={"< Logout"}
        prop_toRightText={"Table >"}
      />
      <div className="h-full grid content-center ">
        <div className="flex flex-col m-2 px-4 py-3 bg-[#060628] rounded-md shadow-2xl gap-2">
          <div className="my-1 text-[#b7b7ab] text-left font-mono">East</div>
          <div className="flex flex-row gap-2">
            <LongInputBar
              prop_placeholderText={"name"}
              prop_type={"text"}
              prop_stateIndex={0}
              prop_onChange={handleOnChange}
            />
            <LongInputBar
              prop_placeholderText={"score"}
              prop_type={"number"}
              prop_stateIndex={0}
              prop_onChange={handleOnChange}
            />
          </div>
          <div className="my-1 text-[#b7b7ab] text-left font-mono">South</div>
          <div className="flex flex-row gap-2">
            <LongInputBar
              prop_placeholderText={"name"}
              prop_type={"text"}
              prop_stateIndex={1}
              prop_onChange={handleOnChange}
            />
            <LongInputBar
              prop_placeholderText={"score"}
              prop_type={"number"}
              prop_stateIndex={1}
              prop_onChange={handleOnChange}
            />
          </div>
          <div className="my-1 text-[#b7b7ab] text-left font-mono">West</div>
          <div className="flex flex-row gap-2">
            <LongInputBar
              prop_placeholderText={"name"}
              prop_type={"text"}
              prop_stateIndex={2}
              prop_onChange={handleOnChange}
            />
            <LongInputBar
              prop_placeholderText={"score"}
              prop_type={"number"}
              prop_stateIndex={2}
              prop_onChange={handleOnChange}
            />
          </div>
          <div className="my-1 text-[#b7b7ab] text-left font-mono">North</div>
          <div className="flex flex-row gap-2">
            <LongInputBar
              prop_placeholderText={"name"}
              prop_type={"text"}
              prop_stateIndex={3}
              prop_onChange={handleOnChange}
            />
            <LongInputBar
              prop_placeholderText={"score"}
              prop_type={"number"}
              prop_stateIndex={3}
              prop_onChange={handleOnChange}
            />
          </div>
          <div className="flex justify-around items-center gap-2 ">
            <div className="my-1 text-[#b7b7ab] text-left font-mono ">
              Total: {totalScore}
            </div>
            <Link to={"/table"}>
              <BasicButton
                prop_onClick={handleSubmit}
                prop_buttonName={"Submit"}
              ></BasicButton>
              <ToastContainer limit={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
