import React from "react";
import { Link } from "react-router-dom";
import Styles from "./TopNavigationBar.module.css";

export default function TopNavigationBar({
  prop_toLeft,
  prop_toRight,
  prop_toLeftText,
  prop_toRightText,
}) {
  return (
    <div className={Styles.bar}>
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
