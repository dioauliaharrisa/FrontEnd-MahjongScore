import React from "react";

export default function BasicButton({ prop_buttonName, prop_onClick }) {
  return (
    <button onClick={prop_onClick} className="w-24 m-2 p-2 bg-[#060628] text-[#b7b7ab] rounded-md font-mono shadow-2xl focus:bg-red-500">
      {prop_buttonName}
    </button>
  );
}
