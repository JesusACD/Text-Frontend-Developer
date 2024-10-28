/* eslint-disable @next/next/no-img-element */
import React from "react";

const Head = ({ title }) => {
  return (
    <div className="flex gap-11 items-end">
      <div>
        <img src="/recurso14.png" alt="recurso 14" />
      </div>
      <div className=" w-full border-b-4 border-[#CEDDED]">
        <h1 className="text-6xl leading-[1.1] text-spaceCadet font-extrabold">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
