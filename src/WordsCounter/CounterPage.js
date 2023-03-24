import React, { useState, useRef, useEffect, useCallback } from "react";
import grippie from "../imgs/grippie.png";
import { SettingsModel } from "../models/SettingsModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDownList from "./DropDownList";
import ButtonUp from "./ButtonUp";
import {
  faLanguage,
  faArrowLeft,
  faArrowRight,
  faRotateRight,
  faDownload,
  faGear,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleQuestion,
  faPaste,
  faClone,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

import Select from "react-select";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { countUniqueWords, removeArabicHarakat } from "../utils/utils";

function CounterPage() {
  const [text, setText] = useState("");
  const [mostFrequentWords, setMostFrequentWords] = useState({});
  const [isSet, setIsSet] = useState(false);
  const [height, setHeight] = useState(500);
  const [isSettingsModelOpen, setIsSettingsModelOpen] = useState(false);
  const textareaRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem("selectedOptions")) || []
  );
  const selectedOptionsSettings = localStorage.getItem(
    "selectedOptionsSettings"
  );
  const parsedOptionsSettings = selectedOptionsSettings
    ? JSON.parse(selectedOptionsSettings)
    : {};
  const fontName =
    parsedOptionsSettings.value &&
    typeof parsedOptionsSettings.value === "string"
      ? parsedOptionsSettings.value.toString()
      : "Cairo";

  const optionList = [
    { value: "harakat", label: "الحركات" },
    { value: "tatwel", label: "التطويل" },
    { value: "spaces", label: "المسافات" },
    { value: "numbers", label: "الارقام" },
  ];
  const fontSize = localStorage.getItem("textAreaFontSize") || "20";
  const fontType = localStorage.getItem("textAreaFontType") || "normal";

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);
  useEffect(() => {
    const savedText = localStorage.getItem("text");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    setHeight(textareaRef.current.scrollHeight);
  }, []);

  const handleHarakat = () => {
    fetch(
      `https://tahadz.com/cgi-bin/mishkal.cgi/ajaxGet?text=${text}&action=Tashkeel2&order=0&lastmark=1`
    )
      .then((response) => response.json())
      .then((data) => {
        let output_text = "";
        if (data.result) {
          data.result.forEach((word) => {
            output_text += " " + word.chosen;
          });
          setText(output_text);
          localStorage.setItem("text", output_text);
        }
      });
  };

  const handleReverse = useCallback(() => {
    setText((prevText) => prevText.split("").reverse().join(""));
    localStorage.setItem("text", text.split("").reverse().join(""));
  }, [text]);

  const handleUndo = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand("undo", false, null);
    }
  };
  const handleCopy = () => {
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.select();
      document.execCommand("copy", false, null);
    }
  };
  const handlePaste = async () => {
    if (textareaRef.current) {
      const ta = textareaRef.current;
      const text = await navigator.clipboard.readText();
      ta.focus();
      document.execCommand("insertText", false, text);
    }
  };

  const handleRedo = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand("redo", false, null);
    }
  };
  function handleResize(event) {
    const newY = event.clientY;
    const newHeight = newY - textareaRef.current.getBoundingClientRect().top;
    setHeight(newHeight);
  }
  document.body.style.backgroundColor = "#F3F4F6";

  let wordCount = 0;
  let characterCount = 0;

  if (text.trim()) {
    wordCount = text.trim().split(/\s+/u).length;
    characterCount = text.length;
  }

  const removeTatwel = (text) => text.replace(/ـ/g, "");
  const removeSpaces = (text) => text.replace(/ /g, "");
  const removeNumbers = (text) => text.replace(/[\d\u0660-\u0669]+/g, "");

  const transformations = {
    harakat: removeArabicHarakat,
    tatwel: removeTatwel,
    spaces: removeSpaces,
    numbers: removeNumbers,
  };

  if (selectedOptions) {
    const values = selectedOptions.map((option) => option.value);

    const modifiedText = values.reduce((currentText, value) => {
      const transformFn = transformations[value];
      return transformFn ? transformFn(currentText) : currentText;
    }, text);

    wordCount = modifiedText
      .split(/[\s-]+/u)
      .filter((word) => word !== "").length;

    characterCount = modifiedText.length;
  }

  const handleSettingsClick = (word) => {
    setIsSettingsModelOpen(true);
  };

  const getDetails = () => {
    if (!text || text.trim().length === 0) {
      return {
        characters: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        unique: 0,
        readingTime: 0,
        speakingTime: 0,
      };
    }

    let ntext = text;
    if (selectedOptions) {
      const values = selectedOptions.map((option) => option.value);

      for (const value of values) {
        const transformFn = transformations[value];
        if (transformFn) {
          ntext = transformFn(ntext);
        }
      }
    }

    // Count the number of characters
    const charCount = ntext.length;

    // Count the number of words
    const wordCount = ntext.split(/\s+/).filter(Boolean).length;

    // Count the number of sentences
    const sentenceCount = ntext.split(/[.!?]+/).filter(Boolean).length;

    // Count the number of paragraphs
    const paragraphCount = ntext.split(/\n\n/).filter(Boolean).length;
    const uniqueCount = countUniqueWords(ntext);

    // Calculate the estimated reading time (in seconds)
    const readingTime = Math.ceil((wordCount / 275) * 60);

    // Convert reading time to minutes and seconds
    let readingMinutes = Math.floor(readingTime / 60);
    let readingSeconds = readingTime % 60;

    // Only show minutes if the time is greater than or equal to 1 minute
    let readingTimeString = "";
    if (readingMinutes >= 1) {
      readingTimeString = `${readingMinutes} دقيقة `;
    }

    readingTimeString += `${readingSeconds} ثانية`;

    // Calculate the estimated speaking time (in seconds)
    const speakingTime = Math.ceil((wordCount / 180) * 60);

    // Convert speaking time to minutes and seconds
    let speakingMinutes = Math.floor(speakingTime / 60);
    let speakingSeconds = speakingTime % 60;

    // Only show minutes if the time is greater than or equal to 1 minute
    let speakingTimeString = "";
    if (speakingMinutes >= 1) {
      speakingTimeString = `${speakingMinutes} دقيقة `;
    }

    speakingTimeString += `${speakingSeconds} ثانية`;

    return {
      characters: charCount,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      unique: uniqueCount,
      readingTime: readingTimeString,
      speakingTime: speakingTimeString,
    };
  };

  const getMostFrequentWords = (text) => {
    setText(text);
    let ntext = text;

    if (selectedOptions) {
      const selectedValues = selectedOptions.map((option) => option.value);

      selectedValues.forEach((option) => {
        if (transformations[option]) {
          ntext = transformations[option](ntext);
        }
      });
    }

    const words = ntext.split(/\s+/).filter(Boolean);
    const freq = {};

    words.forEach((word) => {
      freq[word] = freq[word] ? freq[word] + 1 : 1;
    });

    const totalWords = words.length;
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const mostFrequentWords = sorted.slice(0, 10).map(([word, frequency]) => ({
      word: word.length > 7 ? `${word.substring(0, 7)}...` : word,
      frequency: `${frequency}(${((frequency / totalWords) * 100).toFixed(
        2
      )}%)`,
    }));

    setMostFrequentWords(mostFrequentWords);
    setIsSet(true);
    if (Object.keys(mostFrequentWords).length === 0) {
      setIsSet(false);
    }
  };

  return (
    <div dir="rtl" className="flex flex-wrap h-full">
      <SettingsModel
        isOpen={isSettingsModelOpen}
        handleClose={() => setIsSettingsModelOpen(false)}
      />
      <div className="flex-1">
        <div className="max-w-full py-6 mx-4 max-md:mx-auto sm:px-2">
          <h1
            className="
            text-[3rem]
            mobile:text-[2rem]
            leading-[3.6rem]
            mobile:leading-[2.4rem]
            font-medium
            text-center font-cairo"
          >
            عداد الكلمات
          </h1>
          <div className="py-2 sm:px-0 font-cairo">
            <div className="flex flex-wrap justify-center w-full">
              <ButtonUp
                title="الاعدادت"
                iconName={faGear}
                handle={handleSettingsClick}
              />
              <DropDownList
                text={text}
                takeop={["الكل", "الحركات", "التطويل", "الارقام"]}
                iconName={faTrashCan}
                title={"حذف"}
                size={"w-20"}
                setText={setText}
              />
              <ButtonUp
                title="تشكيل"
                iconName={faLanguage}
                handle={handleHarakat}
              />

              <ButtonUp
                title="تقدم"
                iconName={faArrowRight}
                handle={handleRedo}
              />
              <ButtonUp
                title="ارجع"
                iconName={faArrowLeft}
                handle={handleUndo}
              />
              <ButtonUp
                title="قلب"
                iconName={faRotateRight}
                handle={handleReverse}
              />
              <ButtonUp title="نسخ" iconName={faClone} handle={handleCopy} />
              <ButtonUp title="لصق" iconName={faPaste} handle={handlePaste} />
              <DropDownList
                text={text}
                takeop={["txt", "doc", "pdf"]}
                iconName={faDownload}
                title={"تحميل"}
                size={"w-14"}
                setText={setText}
              />
              <DropDownList
                text={text}
                takeop={["الاعداد", "الرموز"]}
                iconName={faRepeat}
                title={"تحويل"}
                size={"w-14"}
                setText={setText}
              />
            </div>

            <div className="w-1/4 px-2 mb-2 max-lg:w-1/2 max-sm:w-full">
              <Select
                options={optionList}
                placeholder="عدم إحتساب..."
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={false}
                isMulti
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <textarea
                className="w-full p-2 overflow-y-scroll border-t-2 border-gray-300 resize-none scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full border-x-2 max-sm:w-11/12 max-lg:w-9/12 rounded-t-xl focus:outline-none"
                ref={textareaRef}
                value={text}
                style={{
                  fontSize: fontSize + "px",
                  fontFamily: fontName,
                  fontWeight: fontType === "bold" ? "bold" : "500",
                  height: height + "px",
                  fontStyle: fontType === "italic" ? "italic" : "normal",
                }}
                onChange={(event) => {
                  getMostFrequentWords(event.target.value);
                  localStorage.setItem("text", event.target.value);
                }}
                placeholder="ادخل النص هنا..."
              />
              <div
                className="w-full max-sm:w-11/12 max-lg:w-9/12"
                style={{
                  backgroundColor: "#eee",
                  backgroundImage: `url(${grippie})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 2px",
                  border: "1px solid #ddd",
                  borderWidth: "0 1px 1px",
                  cursor: "s-resize",
                  height: "9px",
                  overflow: "hidden",
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                  document.addEventListener("mousemove", handleResize);
                  document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", handleResize);
                  });
                }}
              />
              <div className="flex font-cairo max-sm:w-11/12 max-lg:w-9/12 py-1 justify-center w-full rounded-b-xl bg-[#57BD91]">
                <p className="ml-4">
                  <span className="font-bold">{wordCount}</span> كلمة
                </p>
                <p>
                  <span className="font-bold">{characterCount}</span> حرف
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full ml-4 max-sm:ml-0 md:w-1/6">
        <div className="flex-grow pt-6 mb-4 sm:px-0">
          <table className="w-full overflow-hidden rounded-lg table-auto font-cairo max-sm:w-11/12 max-lg:w-10/12">
            <thead>
              <tr className="bg-[#57BD91]">
                <th colSpan="2" className="px-4 py-2 text-center">
                  أحصائيات
                </th>
              </tr>
            </thead>
            <tbody className="border-b-2 border-gray-300 rounded-lg border-x-2">
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">الكلمات</td>

                <td className="px-4 py-2">{getDetails().words}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">الحروف</td>
                <td className="px-4 py-2">{getDetails().characters}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">الجمل</td>
                <td className="px-4 py-2">{getDetails().sentences}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">الفقرات</td>
                <td className="px-4 py-2">{getDetails().paragraphs}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">الكلمات الفريدة</td>
                <td className="px-4 py-2">{getDetails().unique}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">
                  وقت القراءة{" "}
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="my-tooltip sm:text-md lg:text-sm fa-flip-horizontal"
                    data-tooltip-html="بناءً على متوسط سرعة قراءة<br /> يبلغ 275 كلمة في الدقيقة"
                  />
                  <Tooltip place="bottom" anchorSelect=".my-tooltip" />
                </td>
                <td className="px-4 py-2">{getDetails().readingTime}</td>
              </tr>
              <tr className="text-center bg-white hover:bg-gray-100">
                <td className="px-4 py-2">
                  وقت التحدث{" "}
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="my-tooltip sm:text-md lg:text-sm fa-flip-horizontal"
                    data-tooltip-html="بناءً على متوسط سرعة التحدث<br /> 180 كلمة في الدقيقة"
                  />
                </td>
                <td className="px-4 py-2">{getDetails().speakingTime}</td>
              </tr>
            </tbody>
          </table>
          {isSet ? (
            <table className="w-full mt-4 overflow-hidden rounded-lg table-auto font-cairo max-sm:w-11/12 max-lg:w-10/12">
              <thead>
                <tr className="bg-[#57BD91]">
                  <th className="px-4 py-2 text-center">الكلمة</th>
                  <th className="px-4 py-2 text-center">تكرارها</th>
                </tr>
              </thead>
              <tbody className="border-b-2 border-gray-300 rounded-lg border-x-2">
                {mostFrequentWords.map(({ word, frequency }) => (
                  <tr
                    key={word}
                    className="text-center bg-white hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{word}</td>
                    <td className="px-4 py-2">{frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CounterPage;
