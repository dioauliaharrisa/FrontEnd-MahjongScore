import React from "react";

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
        <label className="my-1 text-[#b7b7ab] text-left font-mono">
          {prop_label}
        </label>
      )}
      <input
        onChange={(event) => {
          prop_onChange(event, prop_stateIndex);
        }}
        type={prop_type}
        name={prop_name}
        placeholder={prop_placeholderText}
        className="
        px-2
        placeholder:italic 
        placeholder:text-slate-500
        font-mono
        w-full h-8 rounded-sm bg-[#b7b7ab]"
      ></input>
    </>
  );
}
