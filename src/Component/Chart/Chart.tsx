import React, { useEffect, useState } from "react";
import { circleAlgo, sumOfTotalInvestment } from "../../helper/helper";
import { useSelector } from "react-redux";
import AssestCircle from "../AssestCircle/AssestCircle";

import "./Chart.css";

function Chart() {
  //----------states-------------//

  const totalAssest = useSelector((store: any) => store.assest);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [investment, setInvestment] = useState<any>({});

  //-------------------------------------------------------//
  //------------total investment per grid---------------//
  //--------------------------------------------------//

  const [shortTaxDefTotal, setShortTaxDefTotal] = useState<number>(0);
  const [shortTaxableTotal, setShortTaxableTotal] = useState<number>(0);
  const [shortTaxFreeTotal, setShortTaxFreeTotal] = useState<number>(0);
  const [interTaxDefTotal, setInterTaxDefTotal] = useState<number>(0);
  const [interTaxableTotal, setInterTaxableTotal] = useState<number>(0);
  const [interTaxFreeTotal, setInterTaxFreeTotal] = useState<number>(0);
  const [longTaxDefTotal, setLongTaxDefTotal] = useState<number>(0);
  const [longTaxableTotal, setLongTaxableTotal] = useState<number>(0);
  const [longTaxFreeTotal, setLongTaxFreeTotal] = useState<number>(0);

  //-------------------------------------------------------//
  //------------assest class per grid---------------//
  //--------------------------------------------------//

  const [shortTaxDefTotalname, setShortTaxDefTotalname] = useState<string[]>(
    []
  );
  const [shortTaxableTotalname, setShortTaxableTotalname] = useState<string[]>(
    []
  );
  const [shortTaxFreeTotalname, setShortTaxFreeTotalname] = useState<string[]>(
    []
  );
  const [interTaxDefTotalname, setInterTaxDefTotalname] = useState<string[]>(
    []
  );
  const [interTaxableTotalname, setInterTaxableTotalname] = useState<string[]>(
    []
  );
  const [interTaxFreeTotalname, setInterTaxFreeTotalname] = useState<string[]>(
    []
  );
  const [longTaxDefTotalname, setLongTaxDefTotalname] = useState<string[]>([]);
  const [longTaxableTotalname, setLongTaxableTotalname] = useState<string[]>(
    []
  );
  const [longTaxFreeTotalname, setLongTaxFreeTotalname] = useState<string[]>(
    []
  );

  //-------------------------------------------------------//
  //------------assest class per grid fixed income---------------//
  //--------------------------------------------------//

  const [shortTaxDefTotalfixincome, setShortTaxDefTotalfixincome] =
    useState<number>(0);
  const [shortTaxableTotalfixincome, setShortTaxableTotalfixincome] =
    useState<number>(0);
  const [shortTaxFreeTotalfixincome, setShortTaxFreeTotalfixincome] =
    useState<number>(0);
  const [interTaxDefTotalfixincome, setInterTaxDefTotalfixincome] =
    useState<number>(0);
  const [interTaxableTotalfixincome, setInterTaxableTotalfixincome] =
    useState<number>(0);
  const [interTaxFreeTotalfixincome, setInterTaxFreeTotalfixincome] =
    useState<number>(0);
  const [longTaxDefTotalfixincome, setLongTaxDefTotalfixincome] =
    useState<number>(0);
  const [longTaxableTotalfixincome, setLongTaxableTotalfixincome] =
    useState<number>(0);
  const [longTaxFreeTotalfixincome, setLongTaxFreeTotalfixincome] =
    useState<number>(0);

  function circleData() {
    const res: {} = circleAlgo(totalAssest);

    setInvestment(res);
    const resTotalInvestment: number = sumOfTotalInvestment(res);
    setTotalInvestment(resTotalInvestment);
  }

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

    // calculate total amountinvested for each key

    const shortTaxDefInvestment = investment?.SHORTTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );

    const shortTaxableInvestment = investment?.SHORTTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const shortTaxFreeInvestment = investment?.SHORTTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxDefInvestment = investment?.INTERNTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxableInvestment = investment?.INTERNTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const interTaxFreeInvestment = investment?.INTERNTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxDefInvestment = investment?.LONGTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxableInvestment = investment?.LONGTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
      0
    );
    const longTaxFreeInvestment = investment?.LONGTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.amountinvested),
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

    // iterate over each array and extract assestname

    investment?.SHORTTAXDEF?.forEach((item: any) => {
      if (!shortTaxDefTotalname.includes(item.assestclass)) {
        setShortTaxDefTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.SHORTTAXABLE?.forEach((item: any) => {
      if (!shortTaxableTotalname.includes(item.assestclass)) {
        setShortTaxableTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.SHORTTAXFREE?.forEach((item: any) => {
      if (!shortTaxFreeTotalname.includes(item.assestclass)) {
        setShortTaxFreeTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXDEF?.forEach((item: any) => {
      if (!interTaxDefTotalname.includes(item.assestclass)) {
        setInterTaxDefTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXABLE?.forEach((item: any) => {
      if (!interTaxableTotalname.includes(item.assestclass)) {
        setInterTaxableTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.INTERNTAXFREE?.forEach((item: any) => {
      if (!interTaxFreeTotalname.includes(item.assestclass)) {
        setInterTaxFreeTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.LONGTAXDEF?.forEach((item: any) => {
      if (!longTaxDefTotalname.includes(item.assestclass)) {
        setLongTaxDefTotalname((prevState) => [...prevState, item.assestclass]);
      }
    });
    investment?.LONGTAXABLE?.forEach((item: any) => {
      if (!longTaxableTotalname.includes(item.assestclass)) {
        setLongTaxableTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });
    investment?.LONGTAXFREE?.forEach((item: any) => {
      if (!longTaxFreeTotalname.includes(item.assestclass)) {
        setLongTaxFreeTotalname((prevState: any[]) => [
          ...prevState,
          item.assestclass,
        ]);
      }
    });

    const shortTaxDeffixInvestment = investment?.SHORTTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );

    const shortTaxablefixInvestment = investment?.SHORTTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const shortTaxFreefixInvestment = investment?.SHORTTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxDeffixInvestment = investment?.INTERNTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxablefixInvestment = investment?.INTERNTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const interTaxFreefixInvestment = investment?.INTERNTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxDeffixInvestment = investment?.LONGTAXDEF?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxablefixInvestment = investment?.LONGTAXABLE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
      0
    );
    const longTaxFreefixInvestment = investment?.LONGTAXFREE?.reduce(
      (total: number, asset: any) => total + parseInt(asset.fixedincome),
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

  let size = 140;
  interface InvestmentTotals {
    [key: string]: {
      size: number;
      percentageDiff: number;
    };
  }
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

  const sortedInvestmentTotals: [string, number][] = Object.entries(
    investmentTotals
  ).sort((a, b) => b[1] - a[1]);

  let prevValue = null;
  let prevSize = null;

  const circleSizes = sortedInvestmentTotals.reduce(
    (acc: InvestmentTotals, [key, value]) => {
      if (value === 0 || value === undefined) {
        acc[key] = {
          size: 0,
          percentageDiff: 0,
        };
      } else {
        const percentageDiff = (value * 100) / totalInvestment;
        let size;
        if (percentageDiff >= 80) {
          size = 140;
        } else if (percentageDiff >= 60) {
          size = 130;
        } else if (percentageDiff >= 41) {
          size = 120;
        } else if (percentageDiff >= 21) {
          size = 110;
        } else {
          size = 100;
        }
        acc[key] = {
          size,
          percentageDiff,
        };
      }
      return acc;
    },
    {}
  );
  //----------------------------------------//

  useEffect(() => {
    setShortTaxDefTotalname(
      Array.from(
        new Set(investment?.SHORTTAXDEF?.map((asset: any) => asset.assestname))
      )
    );
    setShortTaxableTotalname(
      Array.from(
        new Set(investment?.SHORTTAXABLE?.map((asset: any) => asset.assestname))
      )
    );
    setShortTaxFreeTotalname(
      Array.from(
        new Set(investment?.SHORTTAXFREE?.map((asset: any) => asset.assestname))
      )
    );

    setInterTaxDefTotalname(
      Array.from(
        new Set(investment?.INTERNTAXDEF?.map((asset: any) => asset.assestname))
      )
    );

    setInterTaxableTotalname(
      Array.from(
        new Set(
          investment?.INTERNTAXABLE?.map((asset: any) => asset.assestname)
        )
      )
    );

    setInterTaxFreeTotalname(
      Array.from(
        new Set(
          investment?.INTERNTAXFREE?.map((asset: any) => asset.assestname)
        )
      )
    );
    setLongTaxDefTotalname(
      Array.from(
        new Set(investment?.LONGTAXDEF?.map((asset: any) => asset.assestname))
      )
    );
    setLongTaxableTotalname(
      Array.from(
        new Set(investment?.LONGTAXABLE?.map((asset: any) => asset.assestname))
      )
    );
    setLongTaxFreeTotalname(
      Array.from(
        new Set(investment?.LONGTAXFREE?.map((asset: any) => asset.assestname))
      )
    );
  }, [totalAssest, investment]);

  return (
    <>
      <div className="logo">LOGO</div>
      <div className="main-chart overlay">
        <div className="log">{`Total Investment : $${totalInvestment?.toLocaleString()}`}</div>
        <div className="outer-container">
          {/* <div className="logo-text">Your Text Here</div> // new text element */}

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
              {/* <div className="logo-text">Your Text Here</div> */}

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
                        {shortTaxDefTotal > 0
                          ? `$${shortTaxDefTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.shortTaxDefTotal.size}
                      percentageInvested={
                        circleSizes.shortTaxDefTotal.percentageDiff
                      }
                      value={"SHORTTAXDEF"}
                      investment={investment}
                      assestname={shortTaxDefTotalname}
                      fixedincome={
                        shortTaxDefTotalfixincome > 0
                          ? (shortTaxDefTotalfixincome * 100) / shortTaxDefTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.SHORTTAXDEF?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid2" id="INTERNTAXDEF">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {interTaxDefTotal > 0
                          ? `$${interTaxDefTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.interTaxDefTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.interTaxDefTotal.percentageDiff
                      }
                      assestname={interTaxDefTotalname}
                      value={"INTERNTAXDEF"}
                      fixedincome={
                        interTaxDefTotalfixincome > 0
                          ? (interTaxDefTotalfixincome * 100) / interTaxDefTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.INTERNTAXDEF?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid3" id="LONGTAXDEF">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {longTaxDefTotal > 0
                          ? `$${longTaxDefTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.longTaxDefTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.longTaxDefTotal.percentageDiff
                      }
                      value={"LONGTAXDEF"}
                      assestname={longTaxDefTotalname}
                      fixedincome={
                        longTaxDefTotalfixincome > 0
                          ? (longTaxDefTotalfixincome * 100) / longTaxDefTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.LONGTAXDEF?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid4" id="SHORTTAXABLE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {shortTaxableTotal > 0
                          ? `$${shortTaxableTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.shortTaxableTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.shortTaxableTotal.percentageDiff
                      }
                      value={"SHORTTAXABLE"}
                      assestname={shortTaxableTotalname}
                      fixedincome={
                        shortTaxableTotalfixincome > 0
                          ? (shortTaxableTotalfixincome * 100) /
                            shortTaxableTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.SHORTTAXABLE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid5" id="INTERNTAXABLE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {interTaxableTotal > 0
                          ? `$${interTaxableTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.interTaxableTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.interTaxableTotal.percentageDiff
                      }
                      value={"INTERNTAXABLE"}
                      assestname={interTaxableTotalname}
                      fixedincome={
                        interTaxableTotalfixincome > 0
                          ? (interTaxableTotalfixincome * 100) /
                            interTaxableTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.INTERNTAXABLE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid6" id="LONGTAXABLE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {longTaxableTotal > 0
                          ? `$${longTaxableTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.longTaxableTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.longTaxableTotal.percentageDiff
                      }
                      value={"LONGTAXABLE"}
                      assestname={longTaxableTotalname}
                      fixedincome={
                        longTaxableTotalfixincome > 0
                          ? (longTaxableTotalfixincome * 100) / longTaxableTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.LONGTAXABLE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid7" id="SHORTTAXFREE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {shortTaxFreeTotal > 0
                          ? `$${shortTaxFreeTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.shortTaxFreeTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.shortTaxFreeTotal.percentageDiff
                      }
                      value={"SHORTTAXFREE"}
                      assestname={shortTaxFreeTotalname}
                      fixedincome={
                        shortTaxFreeTotalfixincome > 0
                          ? (shortTaxFreeTotalfixincome * 100) /
                            shortTaxFreeTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.SHORTTAXFREE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid8" id="INTERNTAXFREE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {interTaxFreeTotal > 0
                          ? `$${interTaxFreeTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.interTaxFreeTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.interTaxFreeTotal.percentageDiff
                      }
                      value={"INTERNTAXFREE"}
                      assestname={interTaxFreeTotalname}
                      fixedincome={
                        interTaxFreeTotalfixincome > 0
                          ? (interTaxFreeTotalfixincome * 100) /
                            interTaxFreeTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.INTERNTAXFREE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>

                <div className="grid grid9" id="LONGTAXFREE">
                  <div className="circle-Box">
                    <div className="circle-text-container">
                      <div className="circle-text">
                        {longTaxFreeTotal > 0
                          ? `$${longTaxFreeTotal.toLocaleString()}`
                          : null}
                      </div>
                      <div className="circle-date"></div>
                    </div>
                  </div>
                  <div className="circle-container">
                    <AssestCircle
                      radiuss={circleSizes.longTaxFreeTotal.size}
                      investment={investment}
                      percentageInvested={
                        circleSizes.longTaxFreeTotal.percentageDiff
                      }
                      value={"LONGTAXFREE"}
                      assestname={longTaxFreeTotalname}
                      fixedincome={
                        longTaxFreeTotalfixincome > 0
                          ? (longTaxFreeTotalfixincome * 100) / longTaxFreeTotal
                          : 0
                      }
                    />
                  </div>
                  <div className="circle-Category">
                    {Array.from(
                      new Set(
                        investment?.LONGTAXFREE?.map(
                          (asset: any) => asset.assestclass
                        )
                      )
                    ).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
