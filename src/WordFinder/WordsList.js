import React, { useState, useEffect } from "react";
import Loading from "../imgs/loading.786a0a3.gif";
import ContentLoader from "react-content-loader";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
function ColoredWord(props) {
  const { word, colorThisLetters } = props;

  const coloredLetters = word.split("").map((letter, index) => {
    if (colorThisLetters.includes(letter)) {
      return (
        <span key={index} style={{ color: "#ce0000" }}>
          {letter}
        </span>
      );
    }
    return <span key={index}>{letter}</span>;
  });

  return coloredLetters;
}
function Loading_Content() {
  const { height, width } = useWindowDimensions();
  let mwidith = 0;
  if (width <= 500) {
    mwidith = 300;
  } else if (width <= 850) {
    mwidith = 600;
  } else {
    mwidith = 1000;
  }
  return (
    <ContentLoader height="500" width={mwidith} viewBox="0 0 265 230">
      <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
      <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
      <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
      <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
    </ContentLoader>
  );
}

function WordsList({
  wordsList,
  pages,
  handleLoadMore,
  handelWordClick,
  isLoading,
  isError,
  errorValue,
  isLoadingMore,
  colorThisLetters,
  resultsRef,
}) {
  return (
    <div ref={resultsRef} className="pt-4 px-10 py-5 max-sm:px-[15px]">
      {isError ? (
        <h3>{errorValue}</h3>
      ) : isLoading ? (
        <>
          <Loading_Content />
          <Loading_Content />
          <Loading_Content />
          <Loading_Content />
          <Loading_Content />
          <Loading_Content />
        </>
      ) : (
        Object.keys(wordsList).map((key) => (
          <div
            key={key}
            className="w-full mb-10 overflow-hidden text-center bg-white rounded-lg shadow max-sm:mt-5"
          >
            <h3 className="text-right max-sm:text-lg max-md:text-xl text-2xl inline-block m-0 w-full bg-[#57BD91] rounded-y-lg z-10 bg-seagreen-300 text-white font-bold px-10 max-sm:px-4 py-2">
              كلمات من {key} احرف:
            </h3>
            <div className="border-x rounded-x-lg rounded-b-lg border-b border-[#C4C4C4] pt-3">
              <ul className="flex flex-wrap justify-center w-full max-w-screen-md p-0 m-0 mb-4 list-none">
                {wordsList[key].words.map((word) => (
                  <li
                    key={word}
                    className="p-1 py-1 m-1 max-sm:m-2 text-[#353D50] text-2xl bg-[#E3E3E3] border border-[#B8B8B8] rounded-tr-lg rounded-bl-lg hover:cursor-pointer max-sm:px-2 hover:bg-gray-400"
                    onClick={() => handelWordClick(word)}
                  >
                    <ColoredWord
                      word={word}
                      colorThisLetters={colorThisLetters}
                    />
                    {/*word*/}
                  </li>
                ))}
              </ul>
              {pages[key] !== wordsList[key].num_pages && (
                <button
                  className="mb-4 font-bold bg-[#f7c342] leading-none rounded-3xl outline-none focus:outline-none text-[18px] text-gray-700 px-6 py-3 w-[120px] h-10 p-[0.625rem]"
                  onClick={() => handleLoadMore(key)}
                >
                  <img
                    src={Loading}
                    alt="text"
                    className="mr-4 h-[20px] w-[20px]"
                    style={{ display: isLoadingMore ? "block" : "none" }}
                  ></img>
                  <span
                    className="text-gray-700"
                    style={{ display: isLoadingMore ? "none" : "block" }}
                  >
                    المزيد
                  </span>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default WordsList;

{
  /*function WordsList({
  wordsList,
  pages,
  handleLoadMore,
  handelWordClick,
  isLoading,
  isError,
  errorValue,
}) {
  return (
    <>
      {isError ? (
        <h3>{errorValue}</h3>
      ) : isLoading ? (
        <img
          src={Magnify}
          className="w-6 h-6 mx-auto sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 xl:w-22 xl:h-22"
        />
      ) : (
        Object.keys(wordsList).map((key) => (
          <div key={key} class="grid grid-cols-6 mobile:grid-cols-12">
            <div
              class="
      col-span-4
      mr-8
      mobile:col-span-full
      mobile:order-2
      mobile:mr-0
      mobile:flex
      mobile:flex-col
      tablet:col-span-3
      "
            >
              <div id="result-cards">
                <div
                  id=""
                  class="
            w-full
            bg-white
            border
            mobile:border-0
            border-[#C4C4C4]
            shadow
            rounded-lg
            mobile:rounded-none
            overflow-hidden
            mb-10 mobile:-mt-10"
                >
                  <div
                    class="
               mobile:sticky
               z-10
               bg-seagreen-300
               text-white
               bg-green-500
               font-bold
               px-10
               mobile:px-4
               py-2
               mobile:top-[70px]"
                  >
                    <div class="flex justify-between items-center text-2xl mobile:text-xl">
                      <span class="mobile:leading-[25px] text-black">
                        كلمات من {key} احرف:
                      </span>
                      <div
                        class="
                     hidden
                     mobile:block
                     relative
                   border-white border-2
                     rounded-3xl
                     text-white text-base
                     font-normal
                     "
                      ></div>
                    </div>
                  </div>
                  <div class="px-10 py-5 mobile:px-[15px] mobile:pt-[75px]">
                    <div class="flex flex-wrap">
                      {wordsList[key].words.map((word) => (
                        <span
                          key={word}
                          onClick={() => handelWordClick(word)}
                          className="
                  bg-[#E3E3E3]
                  text-[#353D50] text-2xl
                  border border-[#B8B8B8]
                  p-1
                  mobile:px-3
                  rounded-tr-lg rounded-bl-lg
                  hover:cursor-pointer
                  m-1 mobile:m-2"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default WordsList;*/
}
