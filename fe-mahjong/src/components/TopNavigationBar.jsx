import React from "react";
import { Link } from "react-router-dom";

export default function TopNavigationBar({ prop_toLeft, prop_toRight }) {
  return (
    <div className="h-10 flex justify-between bg-[#060628]">
      <Link to={prop_toLeft}>
        <div className="p-2 ">Score submission</div>
      </Link>
      <div>{""}</div>
      <Link to={prop_toRight}>
        <div className="p-2"></div>
      </Link>
    </div>
  );
}
