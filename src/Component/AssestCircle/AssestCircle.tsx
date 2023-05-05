import React, { useEffect, useState } from "react";

import "./AssestCircle.css";

interface AssestCircleProps {
  radiuss: number;
  value: string;
  fixedincome: number;
  assestname: string[];
  percentageInvested: number;
  investment: boolean;
}
interface HoverData {
  assestname: any;
  fixedincome: string | number;
  percentageInvested: string | number;
}

export default function AssestCircle({
  radiuss,
  value,
  fixedincome,
  assestname,
  percentageInvested,
  investment,
}: AssestCircleProps) {
  const [onHoverData, setOnHoverData] = useState<HoverData>({
    assestname: "",
    fixedincome: 0,
    percentageInvested: 0,
  });
  let backgroundStyle: React.CSSProperties = {};

  useEffect(() => {
    setOnHoverData({
      assestname: investment ? assestname : "",
      fixedincome: fixedincome > 0 ? `${fixedincome.toFixed(2)}%` : 0,
      percentageInvested:
        percentageInvested > 0 ? `${percentageInvested.toFixed(2)}%` : 0,
    });
  }, [fixedincome, assestname, percentageInvested]);

  //---------------------------------------------------------------------------------//
  //-------------css for the fixed income and bubble acc to grid-----------------------//
  //---------------------------------------------------------------------------------//

  if (
    value === "SHORTTAXDEF" ||
    value === "INTERNTAXDEF" ||
    value === "LONGTAXDEF"
  ) {
    backgroundStyle = {
      background: `radial-gradient(
        ellipse at left,
        #FFD6C7 0%,
        #FFBFB0 25%,
        #FF8C7C 50%,
        #FF7B6A 75%,
        #FF6B58 100%
      )`,
      backgroundImage: `linear-gradient(
        127 deg, #a8a8a8 ${fixedincome}%  ,
        #a8a8a8 0%,
        #ffe4e0 0%, 
       #ffb2a8 25%,
        #ff8e80 50%,
        #ff7b6a 75%,
        #ff6b58 100%,
        #ff6b58 100% ${100 - fixedincome}%)`,
    };
  } else if (
    value === "SHORTTAXABLE" ||
    value === "INTERNTAXABLE" ||
    value === "LONGTAXABLE"
  ) {
    backgroundStyle = {
      background: `radial-gradient(
        ellipse at left,
        #f0f7f9 0%,
        #d8ebf1 25%,
        #9cb9ca 50%,
        #7ea1b2 75%,
        #627f90 100%
      )`,
      backgroundImage: `linear-gradient(
        -213deg, #B8B8B8  ${fixedincome}%,
        #f0f7f9 0%,
        #d8ebf1 25%,
        #9cb9ca 50%,
        #7ea1b2 75%,
        #627f90 100% ${100 - fixedincome}%
      )`,
    };
  } else if (
    value === "SHORTTAXFREE" ||
    value === "INTERNTAXFREE" ||
    value === "LONGTAXFREE"
  ) {
    backgroundStyle = {
      background: `radial-gradient(
        ellipse at center,
        #2c3b4d 0%,
        #3d4f64 25%,
        #567087 50%,
        #7a9db4 75%,
        #a4c4dc 100%
      )`,
      backgroundImage: `linear-gradient(-249deg, rgb(168, 168, 168) 0%, rgb(44, 59, 77) 100%, rgb(61, 79, 100) 25%, #293241 0, #293241 75%, #293241 100%, #293241 100%)
        ${100 - fixedincome}%
      )`,
    };
  }

  return (
    <div className="container">
      <div
        className="ball"
        style={{
          width: `${radiuss}px`,
          height: `${radiuss}px`,
          borderRadius: "50%",
          ...backgroundStyle,
         
          transform: "translateZ(20px)",
        }}
        data-toggle="tooltip"
        data-placement="top"
        title={`Assestname: ${onHoverData.assestname}\nFixedincome: ${onHoverData.fixedincome}\nPercentageInvested: ${onHoverData.percentageInvested}`}
      />
    </div>
  );
}
