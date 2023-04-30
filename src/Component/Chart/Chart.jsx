import React, { useEffect, useState } from "react";
import "./Chart.css";
import { circleAlgo, sumOfTotalInvestment } from "../../helper/helper";
import { useSelector } from "react-redux";
import AssestCircle from "../AssestCircle/AssestCircle";
import Tooltip from "../Tooltip/Tooltip";
function Chart() {
  const totalAssest = useSelector((store) => store.assest);
  const [totalInvestment, setTotalInvestment] = useState();
  const [investment, setInvestment] = useState();
  const [sortedInvestmentTotalsobj, setSortedInvestmentTotalsobj] = useState();
  const date = new Date();
  const formattedDate = date.getMonth() + 1 + "/" + date.getFullYear();

  //-------------------------------------------------------//
  //------------total investment per grid---------------//
  //--------------------------------------------------//
  const [shortTaxDefTotal, setShortTaxDefTotal] = useState(0);
  const [shortTaxableTotal, setShortTaxableTotal] = useState(0);
  const [shortTaxFreeTotal, setShortTaxFreeTotal] = useState(0);
  const [interTaxDefTotal, setInterTaxDefTotal] = useState(0);
  const [interTaxableTotal, setInterTaxableTotal] = useState(0);
  const [interTaxFreeTotal, setInterTaxFreeTotal] = useState(0);
  const [longTaxDefTotal, setLongTaxDefTotal] = useState(0);
  const [longTaxableTotal, setLongTaxableTotal] = useState(0);
  const [longTaxFreeTotal, setLongTaxFreeTotal] = useState(0);

  //-------------------------------------------------------//
  //------------assest class per grid---------------//
  //--------------------------------------------------//
  const [shortTaxDefTotalname, setShortTaxDefTotalname] = useState([]);
  const [shortTaxableTotalname, setShortTaxableTotalname] = useState([]);
  const [shortTaxFreeTotalname, setShortTaxFreeTotalname] = useState([]);
  const [interTaxDefTotalname, setInterTaxDefTotalname] = useState([]);
  const [interTaxableTotalname, setInterTaxableTotalname] = useState([]);
  const [interTaxFreeTotalname, setInterTaxFreeTotalname] = useState([]);
  const [longTaxDefTotalname, setLongTaxDefTotalname] = useState([]);
  const [longTaxableTotalname, setLongTaxableTotalname] = useState([]);
  const [longTaxFreeTotalname, setLongTaxFreeTotalname] = useState([]);

  //-------------------------------------------------------//
  //------------assest class per grid fixed income---------------//
  //--------------------------------------------------//

  const [shortTaxDefTotalfixincome, setShortTaxDefTotalfixincome] = useState(0);
  const [shortTaxableTotalfixincome, setShortTaxableTotalfixincome] =
    useState(0);
  const [shortTaxFreeTotalfixincome, setShortTaxFreeTotalfixincome] =
    useState(0);
  const [interTaxDefTotalfixincome, setInterTaxDefTotalfixincome] = useState(0);
  const [interTaxableTotalfixincome, setInterTaxableTotalfixincome] =
    useState(0);
  const [interTaxFreeTotalfixincome, setInterTaxFreeTotalfixincome] =
    useState(0);
  const [longTaxDefTotalfixincome, setLongTaxDefTotalfixincome] = useState(0);
  const [longTaxableTotalfixincome, setLongTaxableTotalfixincome] = useState(0);
  const [longTaxFreeTotalfixincome, setLongTaxFreeTotalfixincome] = useState(0);

  let size = 140;

  function circleData() {
    const res = circleAlgo(totalAssest);

    setInvestment(res);
    const resTotalInvestment = sumOfTotalInvestment(res);
    setTotalInvestment(resTotalInvestment);
  }
  console.log("ffffffffffffffffffffffff", totalInvestment);

  useEffect(() => {
    circleData();
  }, [totalAssest]);

  useEffect(() => {
    if (totalAssest.length === 0) {
      setShortTaxDefTotalname([]);
      setShortTaxableTotalname([]);
      setShortTaxFreeTotalname([]);
      setInterTaxDefTotalname([]);
      setInterTaxableTotalname([]);
      setInterTaxFreeTotalname([]);
      setLongTaxDefTotalname([]);
      setLongTaxableTotalname([]);
      setLongTaxFreeTotalname([]);
    }
  }, [totalAssest]);

  useEffect(() => {});

  useEffect(() => {
    // calculate total amountinvested for each key

    const shortTaxDefInvestment = investment?.SHORTTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );

    const shortTaxableInvestment = investment?.SHORTTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const shortTaxFreeInvestment = investment?.SHORTTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxDefInvestment = investment?.INTERNTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxableInvestment = investment?.INTERNTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxFreeInvestment = investment?.INTERNTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxDefInvestment = investment?.LONGTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxableInvestment = investment?.LONGTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxFreeInvestment = investment?.LONGTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.amountinvested),
      0
    );
    setShortTaxDefTotal(shortTaxDefInvestment);
    setShortTaxableTotal(shortTaxableInvestment);
    setShortTaxFreeTotal(shortTaxFreeInvestment);
    setInterTaxDefTotal(interTaxDefInvestment);
    setInterTaxableTotal(interTaxableInvestment);
    setInterTaxFreeTotal(interTaxFreeInvestment);
    setLongTaxDefTotal(longTaxDefInvestment);
    setLongTaxableTotal(longTaxableInvestment);
    setLongTaxFreeTotal(longTaxFreeInvestment);
  }, [totalAssest]);

  useEffect(() => {
    // iterate over each array and extract assestname

    investment?.SHORTTAXDEF?.forEach((item) => {
      if (!shortTaxDefTotalname.includes(item.assestclass)) {
        setShortTaxDefTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.SHORTTAXABLE?.forEach((item) => {
      if (!shortTaxableTotalname.includes(item.assestclass)) {
        setShortTaxableTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.SHORTTAXFREE?.forEach((item) => {
      if (!shortTaxFreeTotalname.includes(item.assestclass)) {
        setShortTaxFreeTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXDEF?.forEach((item) => {
      if (!interTaxDefTotalname.includes(item.assestclass)) {
        setInterTaxDefTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXABLE?.forEach((item) => {
      if (!interTaxableTotalname.includes(item.assestclass)) {
        setInterTaxableTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXFREE?.forEach((item) => {
      if (!interTaxFreeTotalname.includes(item.assestclass)) {
        setInterTaxFreeTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.LONGTAXDEF?.forEach((item) => {
      if (!longTaxDefTotalname.includes(item.assestclass)) {
        setLongTaxDefTotalname((prevState) => [...prevState, item.assestclass]);
      }
    });
    investment?.LONGTAXABLE?.forEach((item) => {
      if (!longTaxableTotalname.includes(item.assestclass)) {
        setLongTaxableTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.LONGTAXFREE?.forEach((item) => {
      if (!longTaxFreeTotalname.includes(item.assestclass)) {
        setLongTaxFreeTotalname((prevState) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
  }, [totalAssest]);

  useEffect(() => {
    const shortTaxDeffixInvestment = investment?.SHORTTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );

    const shortTaxablefixInvestment = investment?.SHORTTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const shortTaxFreefixInvestment = investment?.SHORTTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxDeffixInvestment = investment?.INTERNTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxablefixInvestment = investment?.INTERNTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxFreefixInvestment = investment?.INTERNTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxDeffixInvestment = investment?.LONGTAXDEF?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxablefixInvestment = investment?.LONGTAXABLE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxFreefixInvestment = investment?.LONGTAXFREE?.reduce(
      (total, asset) => total + parseInt(asset.fixedincome),
      0
    );
    setShortTaxDefTotalfixincome(shortTaxDeffixInvestment);
    setShortTaxableTotalfixincome(shortTaxablefixInvestment);
    setShortTaxFreeTotalfixincome(shortTaxFreefixInvestment);
    setInterTaxDefTotalfixincome(interTaxDeffixInvestment);
    setInterTaxableTotalfixincome(interTaxablefixInvestment);
    setInterTaxFreeTotalfixincome(interTaxFreefixInvestment);
    setLongTaxDefTotalfixincome(longTaxDeffixInvestment);
    setLongTaxableTotalfixincome(longTaxablefixInvestment);
    setLongTaxFreeTotalfixincome(longTaxFreefixInvestment);
  }, [totalAssest]);

  const investmentTotals = {
    shortTaxDefTotal,
    shortTaxableTotal,
    shortTaxFreeTotal,
    interTaxDefTotal,
    interTaxableTotal,
    interTaxFreeTotal,
    longTaxDefTotal,
    longTaxableTotal,
    longTaxFreeTotal,
  };

  const sortedInvestmentTotals = Object.entries(investmentTotals).sort(
    (a, b) => b[1] - a[1]
  );

  let prevValue = null;
  let prevSize = null;

  const circleSizes = sortedInvestmentTotals.reduce((acc, [key, value]) => {
    if (value === 0 || value === undefined) {
      acc[key] = 0;
    } else {
      if (prevValue === value) {
        acc[key] = prevSize;
      } else {
        acc[key] = size;
        prevSize = size;
        size -= 10;
      }
      prevValue = value;
    }
    return acc;
  }, {});

  return (
    <div className="main-chart">
      <div className="logo">LOGO</div>
      <div className="outer-container">
        <div className="graph-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                transform: "rotate(0deg)",
                transformOrigin: "center",
                textAlign: "center",
              }}
            >
              <div className="y-label">Tax Treatment</div>
            </div>
          </div>

          <div className="y-axis">
            <div className="label"></div>
            <div className="label">Tax Deferred</div>
            <div className="label">Taxable</div>
            <div className="label">Tax Free</div>
          </div>
          <div className="chart">
            <div className="x-axis">
              <div className="label">Short Term</div>
              <div className="label">Intermediate Term (Opportunity)</div>
              <div className="label">Long Term</div>
            </div>

            <div className="grid-container">
              <div className="grid grid1" id="SHORTTAXDEF">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {shortTaxDefTotal > 0 ? `$${shortTaxDefTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {shortTaxDefTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.shortTaxDefTotal}
                    value={"SHORTTAXDEF"}
                    fixedincome={
                      shortTaxDefTotalfixincome > 0
                        ? (shortTaxDefTotalfixincome * 100) / shortTaxDefTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.SHORTTAXDEF?.map((asset) => asset.assestclass)
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid2" id="INTERNTAXDEF">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {interTaxDefTotal > 0 ? `$${interTaxDefTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {interTaxDefTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.interTaxDefTotal}
                    value={"INTERNTAXDEF"}
                    fixedincome={
                      interTaxDefTotalfixincome > 0
                        ? (interTaxDefTotalfixincome * 100) / interTaxDefTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.INTERNTAXDEF?.map(
                        (asset) => asset.assestclass
                      )
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid3" id="LONGTAXDEF">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {longTaxDefTotal > 0 ? `$${longTaxDefTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {longTaxDefTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.longTaxDefTotal}
                    value={"LONGTAXDEF"}
                    fixedincome={
                      longTaxDefTotalfixincome > 0
                        ? (longTaxDefTotalfixincome * 100) / longTaxDefTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.LONGTAXDEF?.map((asset) => asset.assestclass)
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid4" id="SHORTTAXABLE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {shortTaxableTotal > 0 ? `$${shortTaxableTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {shortTaxableTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.shortTaxableTotal}
                    value={"SHORTTAXABLE"}
                    fixedincome={
                      shortTaxableTotalfixincome > 0
                        ? (shortTaxableTotalfixincome * 100) / shortTaxableTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.SHORTTAXABLE?.map(
                        (asset) => asset.assestclass
                      )
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid5" id="INTERNTAXABLE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {interTaxableTotal > 0 ? `$${interTaxableTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {interTaxableTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.interTaxableTotal}
                    value={"INTERNTAXABLE"}
                    fixedincome={
                      interTaxableTotalfixincome > 0
                        ? (interTaxableTotalfixincome * 100) / interTaxableTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.INTERNTAXABLE?.map(
                        (asset) => asset.assestclass
                      )
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid6" id="LONGTAXABLE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {longTaxableTotal > 0 ? `$${longTaxableTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {longTaxableTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.longTaxableTotal}
                    value={"LONGTAXABLE"}
                    fixedincome={
                      longTaxableTotalfixincome > 0
                        ? (longTaxableTotalfixincome * 100) / longTaxableTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.LONGTAXABLE?.map((asset) => asset.assestclass)
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid7" id="SHORTTAXFREE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {shortTaxFreeTotal > 0 ? `$${shortTaxFreeTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {shortTaxFreeTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.shortTaxFreeTotal}
                    value={"SHORTTAXFREE"}
                    fixedincome={
                      shortTaxFreeTotalfixincome > 0
                        ? (shortTaxFreeTotalfixincome * 100) / shortTaxFreeTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.SHORTTAXFREE?.map(
                        (asset) => asset.assestclass
                      )
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid8" id="INTERNTAXFREE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {interTaxFreeTotal > 0 ? `$${interTaxFreeTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {interTaxFreeTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.interTaxFreeTotal}
                    value={"INTERNTAXFREE"}
                    fixedincome={
                      interTaxFreeTotalfixincome > 0
                        ? (interTaxFreeTotalfixincome * 100) / interTaxFreeTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.INTERNTAXFREE?.map(
                        (asset) => asset.assestclass
                      )
                    ),
                  ].join(", ")}
                </div>
              </div>

              <div className="grid grid9" id="LONGTAXFREE">
                <div className="circle-Box">
                  <div className="circle-text-container">
                    <div className="circle-text">
                      {longTaxFreeTotal > 0 ? `$${longTaxFreeTotal}` : null}
                    </div>
                    <div className="circle-date">
                      {/* {longTaxFreeTotal > 0 ? formattedDate : null} */}
                    </div>
                  </div>
                </div>
                <div className="circle-container">
                  <AssestCircle
                    radiuss={circleSizes.longTaxFreeTotal}
                    value={"LONGTAXFREE"}
                    fixedincome={
                      longTaxFreeTotalfixincome > 0
                        ? (longTaxFreeTotalfixincome * 100) / longTaxFreeTotal
                        : 0
                    }
                  />
                </div>
                <div className="circle-Category">
                  {[
                    ...new Set(
                      investment?.LONGTAXFREE?.map((asset) => asset.assestclass)
                    ),
                  ].join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
