import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonUp({ title, iconName, handle }) {
  return (
    <button
      className="p-1 sm:p-2 my-5 max-sm:my-2 mx-1 bg-[#57BD91] rounded-lg"
      onClick={handle}
      style={{ maxWidth: "100%" }}
    >
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={iconName}
          className="text-base sm:text-lg lg:text-xl"
        />
        <span className="mt-1 text-xs sm:text-sm lg:text-base">{title}</span>
      </div>
    </button>
  );
}

export default ButtonUp;
