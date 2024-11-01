import React, { useState } from "react";
import { FaVolcano } from "react-icons/fa6";
import { RiEarthquakeFill, RiTyphoonFill } from "react-icons/ri";
import CustomButton from "../CustomButton";
import guides from "./EmergencyGuides";
import { IoMdArrowRoundBack } from "react-icons/io";

const GuideView = ({ type }) => {
  const [view, setView] = useState(0);
  const data =
    guides[type][view === 0 ? "before" : view === 1 ? "during" : "after"];

  const buttonPos = view === 0 ? "justify-end" : "justify-between";
  return (
    <div className="flex flex-row h-[70vh] gap-10 w-full items-start justify-center">
      <div className="w-1/3">
        <img
          src={guides[type].image} // Replace with your image URL
          alt="Volcanic Preparedness"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h2>

        <div className="max-h-80 min-h-80 overflow-y-scroll pr-2">
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            {data.contents.map((content, index) => {
              const [boldText, regularText] = content.split(": ", 2);
              return (
                <li key={index}>
                  <span className="font-semibold">{boldText}:</span>{" "}
                  {regularText}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`flex flex-row w-full items-center ${buttonPos}  mt-6`}>
          {view > 0 && (
            <CustomButton
              type="primary"
              onClick={() => setView((prev) => prev - 1)}
            >
              Back
            </CustomButton>
          )}

          {view < 2 && (
            <CustomButton
              type="primary"
              onClick={() => setView((prev) => prev + 1)}
            >
              Next
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

const GuideSelection = ({ setViewedGuide }) => (
  <div className="flex flex-row gap-10 w-full items-center justify-center p-4 mt-6">
    <div
      className="
          flex flex-col gap-6 w-full items-center justify-center max-w-md py-6 text-2xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
      onClick={() => setViewedGuide("typhoon")}
    >
      {<RiTyphoonFill className="text-6xl" />}
      Typhoon
    </div>
    <div
      className="
          flex flex-col gap-6 w-full items-center justify-center max-w-md py-6 text-2xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
      onClick={() => setViewedGuide("earthquake")}
    >
      {<RiEarthquakeFill className="text-6xl" />}
      Earthquake
    </div>
    <div
      className="
          flex flex-col gap-6 w-full items-center justify-center max-w-md py-6 text-2xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
      onClick={() => setViewedGuide("volcanicEruption")}
    >
      {<FaVolcano className="text-6xl" />}
      Volcano
    </div>
  </div>
);

const Guides = () => {
  const [viewedGuide, setViewedGuide] = useState();
  return (
    <div className={`p-1 w-[90vw]`}>
      {!!viewedGuide && (
        <CustomButton
          type="primary"
          onClick={() => setViewedGuide(null)}
          className="my-2"
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <IoMdArrowRoundBack />
            Back
          </div>
        </CustomButton>
      )}
      {viewedGuide ? (
        <GuideView type={viewedGuide} />
      ) : (
        <GuideSelection setViewedGuide={setViewedGuide} />
      )}
    </div>
  );
};

export default Guides;
