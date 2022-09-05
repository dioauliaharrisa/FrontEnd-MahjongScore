import React from "react";
import { Link } from "react-router-dom";

export default function TopNavigationBar({
  prop_toLeft,
  prop_toRight,
  prop_toLeftText,
  prop_toRightText,
}) {
  return (
    <div className="h-10 flex justify-between bg-[#060628]">
      <Link to={prop_toLeft}>
        <div className="p-2 text-[#b7b7ab]">{prop_toLeftText}</div>
      </Link>
      <div>{""}</div>
      <Link to={prop_toRight}>
        <div className="p-2 text-[#b7b7ab]">{prop_toRightText}</div>
      </Link>
    </div>
  );
}
