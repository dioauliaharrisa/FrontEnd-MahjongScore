import React from "react";
import styles from "./longInputBar.module.css";

export default function BasicInputBar({
  prop_label,
  prop_requiredLabel,
  prop_placeholderText,
  prop_type,
  prop_onChange,
  prop_stateIndex,
  prop_name,
}) {
  return (
    <>
      {prop_requiredLabel && (
        <label className="my-1 text-[#b7b7ab] text-left">{prop_label}</label>
      )}
      <input
        onChange={(event) => {
          prop_onChange(event, prop_stateIndex);
        }}
        type={prop_type}
        name={prop_name}
        placeholder={prop_placeholderText}
        className={styles.longInputBar}
        // className="
        // placeholder:text-slate-500
      ></input>
    </>
  );
}
