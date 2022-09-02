import React, { useState } from "react";
import LongInputBar from "../components/LongInputBar";
import BasicButton from "../components/BasicButton";
import { Link } from "react-router-dom";
export default function HomeView() {
  // eslint-disable-next-line
  const [score, setScore] = useState([
    { name: "", score: 0 },
    { name: "", score: 0 },
    { name: "", score: 0 },
    { name: "", score: 0 },
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

      if (placeholder === "score")
        previousScore[index][placeholder] = +value
      if (placeholder === "name") previousScore[index][placeholder] = value;

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
    console.log(value);
  };

  return (
    <div className="h-screen bg-[#3d476a] grid place-items-center">
      <div className="w-5/6">
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
              <BasicButton prop_buttonName={"Submit"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
