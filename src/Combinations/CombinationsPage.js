import React, { useState, useRef, useEffect } from "react";

function CombinationsPage() {
  const [letters, setLetters] = useState("");
  const [combinations, setCombinations] = useState([]);
  const [count, setCount] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#57BD91";
  }, []);

  const handleInputChange = (event) => {
    setLetters(event.target.value.replace(/\s+/, ""));
  };
  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([combinations], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "combinations.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleCopy = async () => {
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.select();
      try {
        await navigator.clipboard.writeText(combinations);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };
  const heapsPermute = (arr, n, result) => {
    if (n === 1) {
      result.push(arr.join(""));
    } else {
      for (let i = 0; i < n - 1; i++) {
        heapsPermute(arr, n - 1, result);
        if (n % 2 === 0) {
          [arr[i], arr[n - 1]] = [arr[n - 1], arr[i]];
        } else {
          [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
        }
      }
      heapsPermute(arr, n - 1, result);
    }
  };

  const generateCombinations = () => {
    const arr = Array.from(letters);
    const results = [];
    heapsPermute(arr, arr.length, results);
    setCombinations(results.join("\n"));
    setCount(results.length);
  };
  const MAX_DISPLAY = 10000;
  const displayCombinations =
    count > MAX_DISPLAY ? combinations.slice(0, MAX_DISPLAY) : combinations;

  return (
    <>
      <div
        style={{ backgroundColor: "#57BD91" }}
        className="flex flex-col w-full text-xl"
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Cairo:wght@500&display=swap');
        </style>
        <div className="container mx-auto max-w-[71.25rem] tablet:max-w-3xl mobile:max-w-full px-[15px]">
          <div className="pt-[3.275rem] mobile:pb-12 text-white text-center">
            <h1
              className=" text-[3rem] mobile:text-[2rem] leading-[3.6rem] mobile:leading-[2.4rem] font-medium"
              style={{ fontFamily: "Cairo", fontWeight: "500" }}
            >
              توليد انماط
            </h1>{" "}
            <div className="text-black mt-[1.3rem] p-2">
              <h3 className="mobile:text-[17px] leading-[1.5rem] text-white mb-5">
                <span>
                  ادخل حروف/رموزك/ارقامك بأي (<u className="font-bold">شكل</u>{" "}
                  او <u className="font-bold">لغة</u>)
                </span>
              </h3>
              <div className="block mobile:block">
                <input
                  maxLength={12}
                  placeholder="ادخل حروفك"
                  style={{ fontFamily: "Cairo", fontWeight: "500" }}
                  type="search"
                  value={letters}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className=" px-[13px] rounded-[32px] focus:outline-none w-1/2 uppercase text-black placeholder-[#D3D3D3] h-[3.75rem] max-md:w-full max-sm:h-[60px] py-px leading-[3rem] text-center text-[2rem] max-sm:text-xl"
                />
              </div>
              <div dir="rtl" className="max-w-[300px] mx-auto mt-0 mobile:mt-0">
                <div>
                  <button
                    type="submit"
                    onClick={generateCombinations}
                    className="leading-none rounded-3xl outline-none focus:outline-none bg-[#f7c342] p-[0.625rem] mt-2 w-full text-gray-700 text-[20px] active:relative active:top-1 active:left-1 transition-all duration-300 ease"
                  >
                    <span
                      style={{ fontFamily: "Cairo", fontWeight: "500" }}
                      className="justify-self-center"
                    >
                      ابحث
                    </span>
                  </button>
                </div>
                {count > MAX_DISPLAY && (
                  <div className="w-full mt-2 font-bold">
                    يوجد <span className="text-red-600">{count}</span> احتمال
                    للحصول عليها جميعا اضغط على{" "}
                    <span className="text-red-600">تحميل</span> ادناه
                  </div>
                )}
              </div>

              {combinations.length > 0 && (
                <div className="flex flex-col items-center justify-center mt-4">
                  <div
                    style={{ fontFamily: "Cairo", fontWeight: "500" }}
                    className="flex items-center justify-between w-1/2 py-1 bg-zinc-300 max-sm:w-11/12 max-lg:w-9/12 rounded-t-xl"
                  >
                    <button
                      onClick={handleCopy}
                      className="px-2 py-1 ml-2 text-base text-white bg-gray-500 rounded-lg"
                    >
                      نسخ
                      <button
                        onClick={downloadFile}
                        className="px-2 py-1 ml-2 text-base text-white bg-gray-500 rounded-lg"
                      >
                        تحميل
                      </button>
                    </button>

                    <div dir="rtl" className="mr-2">
                      <span className="font-bold">
                        {count > MAX_DISPLAY ? "10000" : count}
                      </span>{" "}
                      احتمال
                    </div>
                  </div>

                  <textarea
                    className="w-1/2 text-center border-t-2 border-gray-300 resize-none border-x-2 max-sm:w-11/12 max-lg:w-9/12 rounded-b-xl focus:outline-none"
                    value={displayCombinations}
                    ref={textareaRef}
                    style={{ height: "500px" }}
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CombinationsPage;
{
  /*<div>
      <h1>Letter Combinations</h1>
      <label htmlFor="letters-input">Enter letters:</label>
      <input
        id="letters-input"
        type="text"
        value={letters}
        onChange={(e) => setLetters(e.target.value)}
      />
      <button onClick={generateCombinations}>Generate</button>
      {combinations.length > 0 && (
        <div>
          <h2>Combinations:</h2>
          <ul>
            {combinations.map((combination, index) => (
              <li key={index}>{combination}</li>
            ))}
          </ul>
        </div>
      )}
            </div>*/
}
