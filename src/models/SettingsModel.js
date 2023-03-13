import { BaseModal } from "./BaseModel";
import React, { useState, useEffect } from "react";
import Select from "react-select";

export const SettingsModel = ({ isOpen, handleClose }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem("selectedOptionsSettings")) || {
      value: "Cairo",
      label: "Cairo",
    }
  );
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("FontSizeStamp") || "4"
  );
  const [activeButtonType, setActiveButtonType] = useState(
    localStorage.getItem("FontTypeStamp") || "0"
  );
  const optionList = [
    { value: "Amiri", label: "Amiri" },
    { value: "Tajawal", label: "Tajawal" },
    { value: "Cairo", label: "Cairo" },
    { value: "Changa", label: "Changa" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  function handleSize(size) {
    localStorage.setItem("textAreaFontSize", size.toString());
  }
  function handleType(type) {
    localStorage.setItem("textAreaFontType", type.toString());
  }
  function handleButtonStamp(buttonIndex) {
    setActiveButton(buttonIndex.toString());
    localStorage.setItem("FontSizeStamp", buttonIndex.toString());
  }
  function handleButtonType(buttonIndex) {
    setActiveButtonType(buttonIndex.toString());
    localStorage.setItem("FontTypeStamp", buttonIndex.toString());
  }
  useEffect(() => {
    localStorage.setItem(
      "selectedOptionsSettings",
      JSON.stringify(selectedOptions)
    );
  }, [selectedOptions]);
  return (
    <BaseModal title="الأعدادات" isOpen={isOpen} handleClose={handleClose}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Amiri&family=Cairo:wght@500&family=Changa:wght@500&family=Tajawal:wght@500&display=swap');
      </style>
      <h2 className="mb-1" style={{ fontFamily: "Cairo", fontWeight: "500" }}>
        نوع الخط:
      </h2>
      <Select
        options={optionList}
        placeholder="اسم الخط"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={false}
      />
      <h2
        className="my-1 tex"
        style={{ fontFamily: "Cairo", fontWeight: "500" }}
      >
        حجم الخط:
      </h2>
      <div dir="rtl">
        <button
          onClick={() => {
            handleSize("12");
            handleButtonStamp(0);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-xs border border-zinc-400 rounded shadow ${
            activeButton === "0" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
        <button
          onClick={() => {
            handleSize("14");
            handleButtonStamp(1);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-sm border border-zinc-400 rounded shadow ${
            activeButton === "1" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
        <button
          onClick={() => {
            handleSize("16");
            handleButtonStamp(2);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-base border border-zinc-400 rounded shadow ${
            activeButton === "2" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
        <button
          onClick={() => {
            handleSize("18");
            handleButtonStamp(3);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-lg border border-zinc-400 rounded shadow ${
            activeButton === "3" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
        <button
          onClick={() => {
            handleSize("20");
            handleButtonStamp(4);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-xl border border-zinc-400 rounded shadow ${
            activeButton === "4" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
        <button
          onClick={() => {
            handleSize("24");
            handleButtonStamp(5);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-2xl border border-zinc-400 rounded shadow ${
            activeButton === "5" ? "bg-gray-400" : "bg-white"
          }`}
        >
          T
        </button>
      </div>
      <h2 className="my-1" style={{ fontFamily: "Cairo", fontWeight: "500" }}>
        شكل الخط:
      </h2>
      <div dir="rtl" style={{ fontFamily: "Cairo", fontWeight: "500" }}>
        <button
          onClick={() => {
            handleType("normal");
            handleButtonType(0);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 py-2 px-2 mx-0.5 text-sm border border-zinc-400 rounded shadow ${
            activeButtonType === "0" ? "bg-gray-400" : "bg-white"
          }`}
        >
          عادي
        </button>
        <button
          onClick={() => {
            handleType("italic");
            handleButtonType(1);
          }}
          className={`leading-normal hover:bg-gray-400 italic text-gray-800 py-2 px-2 mx-0.5 text-sm border border-zinc-400 rounded shadow ${
            activeButtonType === "1" ? "bg-gray-400" : "bg-white"
          }`}
        >
          مائل
        </button>
        <button
          onClick={() => {
            handleType("bold");
            handleButtonType(2);
          }}
          className={`leading-normal hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-0.5 text-sm border border-zinc-400 rounded shadow ${
            activeButtonType === "2" ? "bg-gray-400" : "bg-white"
          }`}
        >
          عريض
        </button>
      </div>
    </BaseModal>
  );
};
