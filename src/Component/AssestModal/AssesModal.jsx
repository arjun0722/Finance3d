import React, { useState, useEffect } from "react";

import "./AssestModal.css";
import {
  checkAssest,
  resetInputs,
  previewAssest,
  dataBridge,
  updateAssestState,
} from "../../helper/helper";
import {
  addAssest,
  emptyAsssestState,
  updateAssestReducer,
  deleteAssest,
} from "../../Redux/Reducer";
import { useDispatch, useSelector } from "react-redux/es/exports";

function AssesModal() {
  const dispatch = useDispatch();

  const intialAssestValue = {
    assestname: "",
    assestclass: "",
    taxtreatment: "",
    duration: "",
    amountinvested: "",
    fixedincomecheckbox: false,
    fixedincome: "",
  };

  const [assestState, setAssestState] = useState(intialAssestValue);
  const [updateAssest, setUpdateAssest] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [dispatchAssest, setDispatchAssest] = useState([]);
  const totalAssest = useSelector((store) => store.assest);

  const getAssests = (e) => {
    const { value, name, checked } = e.target;
    setAssestState({
      ...assestState,
      [name]: name === "fixedincomecheckbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (isPreview) {
      dispatch(updateAssestReducer(assestState));
    } else {
      const res = await checkAssest(assestState);
      if (res) {
        assestState.id = Date.now();
        setDispatchAssest((prevState) => [...prevState, assestState]);
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
    resetInputs(setAssestState);
    setIsPreview(false);
  };

  const handleDispatchAssest = () => {
    dispatchAssest.map((assest) => {
      dispatch(addAssest(assest));
    });
    setDispatchAssest([]);
    setIsError(false);
  };
  useEffect(() => {
    // Add a click event listener to the modal
    const modal = document.getElementById("exampleModalToggle");
    modal.addEventListener("click", handleClick);

    // Clean up function to remove the event listener when the component unmounts
    return () => {
      modal.removeEventListener("click", handleClick);
    };
  }, []);

  // Click event handler function
  const handleClick = (event) => {
    console.log("Modal clicked!");
  };

  return (
    <div className="modal-main">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered assestmodal">
          <div className="modal-content">
            <div className="modal-header assestheader">
              <button
                type="button"
                className="btn-close modalclose1"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsPreview(false)}
              >
                <span className="bi bi-x modalclose1text"></span>
              </button>
            </div>
            {isError ? <h5>"Fields are not filled properly"</h5> : null}
            <div className="modal-body assestmodalbody">
              <div className="modalbody1">
                <div style={{ width: "100%" }}>
                  <form className="form1">
                    <div className="row1">
                      <div className="assestname">
                        <label className="assestnamelabel">Asset Name</label>
                        <input
                          type="text"
                          className="assestname_input"
                          value={assestState.assestname}
                          name="assestname"
                          onChange={(e) => getAssests(e)}
                          required
                        />
                      </div>

                      <div className="assestclass">
                        <label className="assestclass_label">
                          Asset Class <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_aseestclass"
                          value={assestState.assestclass}
                          name="assestclass"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="Retirement">Retirement</option>
                          <option value="Roth">Roth</option>
                          <option value="Real Estate Equity">
                            Real Estate Equity
                          </option>
                          <option value="Life Insurance">Life Insurance</option>
                          <option value="Savings">Savings</option>
                          <option value="Investments">Investments</option>
                        </select>
                      </div>
                    </div>
                    <div className="row2">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <label className="taxtreatment_label">
                          Tax Treatment <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_taxtreatment"
                          value={assestState.taxtreatment}
                          name="taxtreatment"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="tax-deferred">Tax Deferred</option>
                          <option value="taxable">Taxable</option>
                          <option value="tax-free">Tax Free</option>
                        </select>
                      </div>
                      <div className="row3">
                        <label className="duration_label">
                          Duration <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_duration"
                          value={assestState.duration}
                          name="duration"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="Short">Short</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Long">Long</option>
                        </select>
                      </div>
                    </div>

                    <div className="row4">
                      <div className="amountinvested">
                        <label className="amountinvested_label">
                          Amount Invested{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="amountinvest_input"
                          value={assestState.amountinvested}
                          name="amountinvested"
                          onChange={(e) => getAssests(e)}
                        />
                      </div>
                      <div className="fixedincome">
                        <label className="label_fixedincome">
                          Fixed Income
                        </label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => getAssests(e)}
                          name="fixedincomecheckbox"
                          checked={assestState.fixedincomecheckbox}
                        />
                      </div>
                    </div>

                    <div className="row5">
                      <div>
                        {assestState.fixedincomecheckbox === true ? (
                          <div className="FixedIncome">
                            <label className="FixedIncome_label">
                              Fixed Income{" "}
                            </label>
                            <input
                              type="text"
                              className="fixed_input"
                              name="fixedincome"
                              value={assestState.fixedincome}
                              onChange={(e) => getAssests(e)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn float-left modal_footer_btn"
                onClick={() => handleSubmit()}
              >
                {isPreview ? "Update Asset" : "Add Asset"}
              </button>
              <div>
                <button
                  type="button"
                  className="btn clearall_btn"
                  // data-bs-dismiss="modal"

                  onClick={() => resetInputs(setAssestState)}
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="btn submit_btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleDispatchAssest()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-text">Duration</div>
      {totalAssest.length === 0 ? (
        <div>
          <a
            className="btn modalbtn"
            data-bs-toggle="modal"
            href="#exampleModalToggle"
            role="button"
          >
            Update Assets
          </a>
        </div>
      ) : (
        <div style={{ width: "89%", margin: "5px 90px" }} className="modal-text2">
          <div style={{ display: "flex", gap: "351px" }} className="modal-text3">
            <div style={{ flex: "40%" }} className="modal-bodyy assest_added">
              <div style={{ textAlign: "left" }}>
                <h4
                  style={{
                    marginLeft: "25px",
                    fontFamily: "sans-serif",
                    marginTop: "10px",
                  }}
                >
                  List Of Asset Added
                </h4>
              </div>

              {totalAssest &&
                totalAssest.map((assest, index) => {
                  return (
                    <div
                      style={{ display: "flex" }}
                      className="added_assest_name"
                    >
                      <div className="hover-effect">{`${index + 1} ${
                        assest.assestname
                      }`}</div>
                      <div>
                        <button
                          className="btn3"
                          data-bs-toggle="modal"
                          href="#exampleModalToggle"
                          role="button"
                          onClick={() =>
                            previewAssest(
                              assest,
                              setAssestState,
                              setIsPreview,
                              setUpdateAssest
                            )
                          }
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => dispatch(deleteAssest(assest.id))}
                          style={{
                            backgroundColor: "#283240",
                            border: "none",
                            outline: "none",
                            color: "red",
                          }}
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div style={{ flex: "25%", marginLeft: "30px" }} className="update-btn">
              <a
                className="btn modalbtn"
                data-bs-toggle="modal"
                href="#exampleModalToggle"
                role="button"
              >
                Update Assets
              </a>
              <button
                type="button"
                className="btn float-left modal_footer_btn"
                onClick={() => dispatch(emptyAsssestState())}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssesModal;







































