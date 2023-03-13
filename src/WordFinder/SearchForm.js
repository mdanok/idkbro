import React from "react";

function SearchForm({
  inputValue,
  handleInputChange,
  handleButtonClick,
  startsValue,
  endsValue,
  containsValue,
  lenghtValue,
  selectedOption,
  handleStartsChange,
  handleEndsChange,
  handleContainsChange,
  handleLengthChange,
  handleSelectChange,
}) {
  return (
    <>
      {/*<style>
        @import
        url('https://fonts.googleapis.com/css2?family=Cairo:wght@500&display=swap');
      </style>
      <h1 className="mt-6 mb-6 text-3xl text-slate-100">
        أبحث عن كلمات بواسطة الحروف
      </h1>
      <div className="block mobile:block">
        <input
  maxLength={15}
  placeholder="YOUR LETTERS"
  value={inputValue}
  onChange={handleInputChange}
  style={{ fontFamily: "Cairo", fontWeight: "500" }}
  type="search"
  className="
px-[13px]
rounded-[32px]
focus:outline-none
w-full
uppercase
text-black
placeholder-[#D3D3D3]
     h-[3.75rem] mobile:h-[46px] py-px leading-[3rem] text-center text-[2rem] mobile:text-xl"
        />
      </div>
      <input
        type="text"
        className="px-4 py-2 mt-4 mb-3 text-center text-black border border-gray-700 rounded-lg outline-none"
        value={inputValue}
        onChange={handleInputChange}
        style={{ fontFamily: "Cairo", fontWeight: "500" }}
  />
      <button
        className="px-4 py-2 mb-10 font-bold bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        onClick={handleButtonClick}
      >
        ابحث
      </button>*/}
      <div
        style={{ backgroundColor: "#57BD91" }}
        className="flex flex-col w-full text-xl"
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Cairo:wght@500&display=swap');
        </style>
        <div
          className="
    container
    mx-auto
    max-w-[71.25rem]
    tablet:max-w-3xl
    mobile:max-w-full
    px-[15px]
  "
        >
          <div
            className="pt-[3.275rem] pb-6 mobile:pb-12 text-white text-center"
            data-v-0a4f4d2a=""
          >
            <h1
              className="
            text-[3rem]
            mobile:text-[2rem]
            leading-[3.6rem]
            mobile:leading-[2.4rem]
            font-medium
          "
              data-v-0a4f4d2a=""
            >
              موجد الكلمات
            </h1>{" "}
            <div className="text-black mt-[1.3rem] p-2" data-v-0a4f4d2a="">
              <h3 className="mobile:text-[17px] leading-[1.5rem] text-white mb-5">
                <span>
                  ادخل الحروف مفصولة بـ (<u className="font-bold">؟</u> او{" "}
                  <u className="font-bold">مسطرة</u>)
                </span>
              </h3>
              <div className="block mobile:block">
                <input
                  maxLength={15}
                  placeholder="ادخل حروفك"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{ fontFamily: "Cairo", fontWeight: "500" }}
                  type="search"
                  autoComplete="off"
                  className=" px-[13px] rounded-[32px] focus:outline-none w-1/2 uppercase text-black placeholder-[#D3D3D3] h-[3.75rem] max-md:w-full max-sm:h-[46px] py-px leading-[3rem] text-center text-[2rem] max-sm:text-xl"
                />
              </div>
              <div dir="rtl" className="max-w-[430px] mx-auto mt-6 mobile:mt-5">
                <div className="p-6 bg-white rounded-lg shadow mobile:p-4">
                  <div className="grid grid-cols-2">
                    <div className="relative mb-2 ml-2">
                      <input
                        id="starts_with"
                        placeholder="يبدأ بـ"
                        autoComplete="off"
                        style={{ fontFamily: "Cairo", fontWeight: "500" }}
                        value={startsValue}
                        onChange={handleStartsChange}
                        className="w-full leading-[1.875rem] rounded-3xl py-[7px] pr-[27px] pl-[11px] focus:outline-none border border-gray-700 uppercase text-black"
                      />
                    </div>
                    <div className="relative mb-2 mr-2">
                      <input
                        id="ends_with"
                        autoComplete="off"
                        style={{ fontFamily: "Cairo", fontWeight: "500" }}
                        placeholder="ينتهي بـ"
                        value={endsValue}
                        onChange={handleEndsChange}
                        className="w-full leading-[1.875rem] rounded-3xl py-[7px] pr-[27px] pl-[11px] focus:outline-none border border-gray-700 uppercase text-black"
                      />
                    </div>
                    <div className="relative mt-2 ml-2">
                      <input
                        id="contains"
                        autoComplete="off"
                        placeholder="يحتوي على"
                        style={{ fontFamily: "Cairo", fontWeight: "500" }}
                        value={containsValue}
                        onChange={handleContainsChange}
                        className="w-full leading-[1.875rem] rounded-3xl py-[7px] pr-[27px] pl-[11px] focus:outline-none border border-gray-700 uppercase text-black"
                      />
                    </div>
                    <div className="relative mt-2 mr-2">
                      <input
                        id="length"
                        placeholder="طول الكلمة"
                        style={{ fontFamily: "Cairo", fontWeight: "500" }}
                        autoComplete="off"
                        value={lenghtValue}
                        onChange={handleLengthChange}
                        className="w-full leading-[1.875rem] rounded-3xl py-[7px] pr-[27px] pl-[11px] focus:outline-none border border-gray-700 uppercase text-black"
                      />
                    </div>
                  </div>
                  <div />
                  <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="block w-full h-[2.8125rem] leading-[1.875rem] py-2 px-3 bg-white text-black border border-[#353D50] focus:outline-none mobile:text-base mt-4 rounded-[6px]"
                  >
                    <option
                      value="quran"
                      className="text-black bg-white mobile:text-base"
                    >
                      القاموس القرآني
                    </option>
                    <option
                      value="arabic"
                      className="text-black bg-white mobile:text-base"
                    >
                      القاموس العربي
                    </option>
                  </select>
                  <button
                    href=""
                    type="submit"
                    onClick={handleButtonClick}
                    className="leading-none rounded-3xl outline-none focus:outline-none bg-[#f7c342] p-[0.625rem] mt-4 w-full text-gray-700 text-[18px] active:relative active:top-1 active:left-1 transition-all duration-300 ease"
                  >
                    <span className="justify-self-center">ابحث</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
