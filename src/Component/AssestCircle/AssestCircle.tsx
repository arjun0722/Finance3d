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
        to top, #a8a8a8 ${fixedincome}%  ,
        #FFD6C7 0%,
        #FFBFB0 25%,
        #FF8C7C 50%,
        #FF7B6A 75%,
        #FF6B58 100% ${100 - fixedincome}%)`,
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
        to top, #B8B8B8  ${fixedincome}%,
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
      backgroundImage: `linear-gradient(
        to top, #a8a8a8 ${fixedincome}%,
        #2c3b4d 0%,
        #3d4f64 25%,
        #567087 50%,
        #7a9db4 75%,
        #a4c4dc 100%
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
          boxShadow: "0px 1px 7px rgba(0, 0, 0, 0.7)",
          transform: "translateZ(20px)",
        }}
        data-toggle="tooltip"
        data-placement="top"
        title={`Assestname: ${onHoverData.assestname}\nFixedincome: ${onHoverData.fixedincome}\nPercentageInvested: ${onHoverData.percentageInvested}`}
      />
    </div>
  );
}
