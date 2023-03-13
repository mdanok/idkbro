import { BaseModal } from "./BaseModel";
import React, { useState, useEffect } from "react";
import Magnify from "../imgs/Magnify-1s-200px.gif";
export const InfoModal = ({ isOpen, handleClose, word }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const harakatPattern = /[\u064b-\u065f]/g;
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const API_URL = `https://api.quran.com/api/v3/search?size=20&page=0&language=en&q=${word}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        setSearchResults(data.search.results);
        setIsLoading(false); // Set loading to false after data has been fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false if there was an error fetching data
      }
    };

    if (isOpen) {
      fetchSearchResults();
    } else {
      setIsLoading(true);
    }
  }, [isOpen, word]);

  const SearchItem = ({ result }) => {
    const verseUrl = `http://quran.ksu.edu.sa/tafseer/katheer/sura${
      result.verse_key.split(":")[0]
    }-aya${result.verse_key.split(":")[1]}.html`;

    return (
      <li className="text-black" key={result.verse_id}>
        {result.text
          .replace("<em>", "")
          .replace("</em>", "")
          .replace(harakatPattern, "")
          .replace(/ٱ/g, "ا")
          .replace(/ا۟/g, "ا")
          .replace(/ۚ/g, "")
          .replace(/ذٰ/g, "ذ")
          .replace(/ـٰ/g, "ا")
          .replace(/و۟/g, "و")
          .replace(/ىٰ/g, "ى")
          .replace(/رٰ/g, "ر")
          .replace(/نۢ/g, "ن")
          .replace(/رۢ/g, "ر")}
        <a href={verseUrl} target="_blank" rel="noreferrer">
          <span className="text-xs text-blue-500">
            &nbsp;({result.verse_key})
          </span>
        </a>
      </li>
    );
  };

  return (
    <BaseModal
      title="مواضع الورود الكلمة"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {isLoading ? (
        <img
          src={Magnify}
          className="w-6 h-6 mx-auto sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 xl:w-22 xl:h-22"
        />
      ) : (
        <>
          <h1 className="mb-2 text-lg font-medium text-black ">
            الايات التي وردت فيها كلمة{" "}
            <span className="text-red-500">{word}</span>:
          </h1>
          <ul>
            {searchResults.slice(0, 10).map((result) => (
              <SearchItem result={result} key={result.verse_id} />
            ))}
          </ul>
        </>
      )}
    </BaseModal>
  );
};
