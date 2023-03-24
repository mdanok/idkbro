import React, { useState, useRef, useEffect } from "react";
import { removeArabicHarakat } from "../utils/utils";
import download from "downloadjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropDownList({ text, iconName, takeop, size, title, setText }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = takeop;

  const dropdownRef = useRef(null);
  const handleConvertNumbers = () => {
    const arabicNumber = text
      .toString()
      .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1584));
    setText(arabicNumber);
    localStorage.setItem("text", arabicNumber);
  };
  const handleJob = (option, text) => {
    if (text) {
      if (option === "doc" || option === "txt" || option === "pdf") {
        const fileContent = text;
        const fileName = text.slice(0, 10).replace(/\s/, "-") + `.${option}`; // Define the file name

        download(fileContent, fileName, "text/plain");
      } else if (option === "الكل") {
        setText("");
        localStorage.setItem("text", "");
      } else if (option === "الحركات") {
        setText(removeArabicHarakat(text));
        localStorage.setItem("text", removeArabicHarakat(text));
      } else if (option === "التطويل") {
        setText(text.replace(/ـ/g, ""));
        localStorage.setItem("text", text.replace(/ـ/g, ""));
      } else if (option === "الارقام") {
        setText(text.replace(/[0-9٠-٩]/g, ""));
        localStorage.setItem("text", text.replace(/[0-9٠-٩]/g, ""));
      } else if (option === "الاعداد") {
        handleConvertNumbers();
      } else if (option === "الرموز") {
        setText(text.replace(/\?/g, "؟"));
      }
    }
  };

  function handleOptionClick(option) {
    handleJob(option, text);
    setIsOpen(false);
  }

  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative z-10 inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="p-1 sm:p-2 mt-5 max-sm:mt-2 mx-1 bg-[#57BD91] rounded-lg"
          id="options-menu"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={iconName}
              className="text-base sm:text-lg lg:text-xl"
            />
            <span className="mt-1 text-xs sm:text-sm lg:text-base">
              {title}
            </span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className={
            "absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" +
            size
          }
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDownList;
