import React, { useState, useRef } from "react";
import { InfoModal } from "../models/InfoModel";
import SearchForm from "./SearchForm";
import WordsList from "./WordsList";
function MainPage() {
  const [wordsList, setWordsList] = useState({});
  const [pages, setPages] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [wordValue, setWordValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [isErrorValue, setIsErrorValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [selectedOption, setSelectedOption] = useState("wwf2");
  const [startsValue, setStartsValue] = useState("");
  const [endsValue, setEndsValue] = useState("");
  const [containsValue, setContiansValue] = useState("");
  const [lenghtValue, setLenghtValue] = useState("");
  const [colorThisLetters, setColorThisLetters] = useState([]);
  const resultsRef = useRef(null);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const SetColorValue = () => {
    let farray = [];
    farray.push(...inputValue.split("؟"));
    if (startsValue) {
      farray.push(...startsValue);
    }
    if (endsValue) {
      farray.push(...endsValue);
    }
    if (containsValue) {
      farray.push(...containsValue.split("_"));
    }
    setColorThisLetters([...new Set(farray)]);
  };
  const scrollToResults = () => {
    if (!resultsRef) return;
    const element =
      resultsRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: element, behavior: "smooth" });
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartsChange = (event) => {
    const startsValue = event.target.value;
    const arabicLettersRegex = /^[\u0621-\u063A-\u0641-\u064A]*$/;

    if (arabicLettersRegex.test(startsValue)) {
      setStartsValue(startsValue);
    }
  };
  const handleEndsChange = (event) => {
    const endsValue = event.target.value;
    const arabicLettersRegex = /^[\u0621-\u063A-\u0641-\u064A]*$/;

    if (arabicLettersRegex.test(endsValue)) {
      setEndsValue(endsValue);
    }
  };
  const handleContainsChange = (event) => {
    const containsValue = event.target.value;
    const arabicLettersRegex = /^[\u0621-\u063A-\u0641-\u064A_]*$/;

    if (arabicLettersRegex.test(containsValue)) {
      setContiansValue(containsValue);
    }
  };
  const handleLengthChange = (event) => {
    const lenghtValue = event.target.value;
    const arabicLettersRegex = /^[\d]*$/;

    if (arabicLettersRegex.test(lenghtValue)) {
      setLenghtValue(lenghtValue);
    }
  };

  const handleInputChange = (
    event,
    maxLength = null,
    allowDigits = false,
    allowSymbols = false
  ) => {
    let inputValue = event.target.value;
    if (inputValue[0] === "؟") {
      inputValue = inputValue.slice(1);
    }
    const arabicLettersRegex =
      allowDigits && allowSymbols
        ? /^[\u0600-\u06FF\d\s!?]*$/
        : allowDigits
        ? /^[\u0600-\u06FF\s!?]*$/
        : allowSymbols
        ? /^[\u0600-\u06FF\d\s!]*$/
        : /^[\u0621-\u063A-\u0641-\u064A\s؟]*$/;
    let newInputValue = maxLength ? inputValue.slice(0, maxLength) : inputValue;
    newInputValue = newInputValue.replace(/\s/g, "؟").replace(/؟{2,}/g, "؟");
    if (newInputValue.startsWith("؟")) {
      newInputValue = newInputValue.slice(1);
    }
    if (arabicLettersRegex.test(newInputValue)) {
      setInputValue(newInputValue);
    }
  };

  const handelWordClick = (word) => {
    setWordValue(word);
    setIsInfoModalOpen(true);
  };
  const handleButtonClick = async () => {
    let flink = "";
    if (startsValue) {
      flink = flink + "&starts=" + startsValue;
    }
    if (endsValue) {
      flink = flink + "&ends=" + endsValue;
    }
    if (containsValue) {
      flink = flink + "&contains=" + containsValue;
    }
    if (lenghtValue) {
      flink = flink + "&length=" + lenghtValue;
    }
    try {
      document.body.style.backgroundColor = "white";
      let value = inputValue.trim();
      if (value.endsWith("؟")) {
        value = value.slice(0, -1);
      }
      setIsLoading(true);
      const response = await fetch(
        `https://apitest.mdanok.repl.co/api/search?letters=${value}&page=1${flink}&dictionary=${selectedOption}`
      );
      const data = await response.json();
      setWordsList(data.words_list);
      const initialPages = {};
      Object.keys(data.words_list).forEach((key) => {
        initialPages[key] = 1;
      });
      setPages(initialPages);
      setIsLoading(false);
      SetColorValue();
    } catch (error) {
      document.body.style.backgroundColor = "#57BD91";
      setIsErrorValue(true);
      setErrorValue("حدث خطأ في تحميل البيانات حاول مجددا.");
      setIsLoading(false);
    } finally {
      await delay(150);
      scrollToResults();
    }
  };
  const handleLoadMore = async (key) => {
    try {
      setIsLoadingMore(true);
      const response = await fetch(
        `https://apitest.mdanok.repl.co/api/search?letters=${inputValue}&length=${key}&page=${
          pages[key] + 1
        }&dictionary=${selectedOption}`
      );
      const data = await response.json();

      const updatedWordsList = { ...wordsList };
      updatedWordsList[key] = {
        ...updatedWordsList[key],
        words: [...updatedWordsList[key].words, ...data.words_list[key].words],
      };
      setWordsList(updatedWordsList);

      const updatedPages = { ...pages };
      updatedPages[key] = pages[key] + 1;
      setPages(updatedPages);
      setIsLoadingMore(false);
    } catch (error) {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-white" dir="rtl">
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        word={wordValue}
      />
      <SearchForm
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
        startsValue={startsValue}
        endsValue={endsValue}
        containsValue={containsValue}
        lenghtValue={lenghtValue}
        selectedOption={selectedOption}
        handleStartsChange={handleStartsChange}
        handleEndsChange={handleEndsChange}
        handleContainsChange={handleContainsChange}
        handleLengthChange={handleLengthChange}
        handleSelectChange={handleSelectChange}
      />
      <WordsList
        resultsRef={resultsRef}
        wordsList={wordsList}
        pages={pages}
        handelWordClick={handelWordClick}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
        isError={isErrorValue}
        errorValue={errorValue}
        isLoadingMore={isLoadingMore}
        colorThisLetters={colorThisLetters}
      />
    </div>
  );
}

export default MainPage;
