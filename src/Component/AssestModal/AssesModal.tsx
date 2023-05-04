import React, { useState, useEffect } from "react";
import { checkAssest, resetInputs, previewAssest } from "../../helper/helper";
import {
  addAssest,
  emptyAsssestState,
  updateAssestReducer,
  deleteAssest,
} from "../../Redux/Reducer";
import {
  ASSEST_NAME,
  ASSEST_CLASS,
  RETIREMENT,
  ROTH,
  REAL_ESTATE_EQUITY,
  LIFE_INSURANCE,
  SAVINGS,
  INVESTMENTS,
  TAX_TREATMENT,
  TAX_DEFERRED,
  TAXABLE,
  TAX_FREE,
  DURATION,
  SHORT,
  INTERMEDIATE,
  LONG,
  AMOUNT_INVESTED,
  FIXED_INCOME,
  VIEW_GRAPH,
  CLEAR_ALL,
  LIST_OF_ASSEST_ADDED,
  PREVIEW,
  ADD_ASSESTS_TO_SEE_LIST,
  UPDATE_ASSESTS,
  FIELD_ERROR,
} from "../../helper/constant";
import { useDispatch, useSelector } from "react-redux/es/exports";

import "./AssestModal.css";

function AssesModal() {
  const dispatch = useDispatch();

  //-----------intial inputs value----------//
  const intialAssestValue: {
    assestname: string;
    assestclass: string;
    taxtreatment: string;
    duration: string;
    amountinvested: string;
    fixedincomecheckbox: boolean;
    fixedincome: number;
  } = {
    assestname: "",
    assestclass: "",
    taxtreatment: "",
    duration: "",
    amountinvested: "",
    fixedincomecheckbox: false,
    fixedincome: 0,
  };

  //-------------------------------------------//
  //-------------state------------------------//
  //-------------------------------------------//

  const [show, setShow] = useState<boolean>(true);
  const [assestState, setAssestState] = useState<any>(intialAssestValue);
  const [updateAssest, setUpdateAssest] = useState();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const totalAssest = useSelector((store: any) => store.assest);

  //---------------------------------------------------------------------------------//
  //-------------functions related to assest submit and errors-----------------------//
  //---------------------------------------------------------------------------------//

  const getAssests = (e: any) => {
    const { value, name, checked } = e.target;
    setAssestState({
      ...assestState,
      [name]: name === "fixedincomecheckbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmit(true);
    if (isPreview) {
      dispatch(updateAssestReducer(assestState));
      resetInputs(setAssestState);
      setIsSubmit(false);
    } else {
      const res = await checkAssest(assestState);
      if (res) {
        assestState.id = Date.now();
        if (assestState.fixedincome === "") {
          assestState.fixedincome = 0;
        }
        dispatch(addAssest(assestState));
        setIsSubmit(false);
        setIsError(false);
        resetInputs(setAssestState);
      } else {
        setIsError(true);
      }
    }

    setIsPreview(false);
  };

  function handleCancel() {
    resetInputs(setAssestState);
    setIsPreview(false);
    setShow(false);
    setIsSubmit(false);
  }

  function handleViewGraph() {
    resetInputs(setAssestState);
    setShow(false);
    setIsSubmit(false);
    setIsPreview(false);
  }

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="modal-main">
      <div
        className={`modal ${show ? "d-block" : "fade"}`}
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
                onClick={() => handleCancel()}
              ></button>
            </div>

            <div className="modal-body assestmodalbody">
              <div className="modalbody1">
                <div style={{ width: "100%" }}>
                  <form className="form1">
                    <div className="row1">
                      <div className="assestname">
                        <label className="assestnamelabel">{ASSEST_NAME}</label>
                        <input
                          type="text"
                          className="assestname_input"
                          value={assestState.assestname}
                          name="assestname"
                          onChange={(e) => getAssests(e)}
                          required
                        />
                        {isSubmit && assestState.assestname === "" ? (
                          <span className="field_error">{FIELD_ERROR}</span>
                        ) : null}
                      </div>

                      <div className="assestclass">
                        <label className="assestclass_label">
                          {ASSEST_CLASS} <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_aseestclass"
                          value={assestState.assestclass}
                          name="assestclass"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="Retirement">{RETIREMENT}</option>
                          <option value="Roth">{ROTH}</option>
                          <option value="Real Estate Equity">
                            {REAL_ESTATE_EQUITY}
                          </option>
                          <option value="Life Insurance">
                            {LIFE_INSURANCE}
                          </option>
                          <option value="Savings">{SAVINGS}</option>
                          <option value="Investments">{INVESTMENTS}</option>
                        </select>
                        {isSubmit && assestState.assestclass === "" ? (
                          <span className="field_error">{FIELD_ERROR}</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="row2">
                      <div className="row2_taxtreatment_duration">
                        <label className="taxtreatment_label">
                          {TAX_TREATMENT}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_taxtreatment"
                          value={assestState.taxtreatment}
                          name="taxtreatment"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="tax-deferred">{TAX_DEFERRED}</option>
                          <option value="taxable">{TAXABLE}</option>
                          <option value="tax-free">{TAX_FREE}</option>
                        </select>
                        {isSubmit && assestState.taxtreatment === "" ? (
                          <span className="field_error">{FIELD_ERROR}</span>
                        ) : null}
                      </div>
                      <div className="row3">
                        <label className="duration_label">
                          {DURATION} <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="select_duration"
                          value={assestState.duration}
                          name="duration"
                          onChange={(e) => getAssests(e)}
                        >
                          <option value=""></option>
                          <option value="Short">{SHORT}</option>
                          <option value="Intermediate">{INTERMEDIATE}</option>
                          <option value="Long">{LONG}</option>
                        </select>
                        {isSubmit && assestState.duration === "" ? (
                          <span className="field_error">{FIELD_ERROR}</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="row4">
                      <div className="amountinvested">
                        <label className="amountinvested_label">
                          {AMOUNT_INVESTED}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          className="amountinvest_input"
                          value={assestState.amountinvested}
                          name="amountinvested"
                          onChange={(e) => getAssests(e)}
                        />
                        {isSubmit && assestState.amountinvested === "" ? (
                          <span className="field_error">{FIELD_ERROR}</span>
                        ) : null}
                      </div>
                      <div className="fixedincome">
                        <label className="label_fixedincome">
                          {FIXED_INCOME}
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
                              {FIXED_INCOME}
                            </label>
                            <input
                              type="number"
                              className="fixed_input"
                              name="fixedincome"
                              value={assestState.fixedincome}
                              onChange={(e) => getAssests(e)}
                            />
                            {assestState.fixedincomecheckbox === true &&
                            isSubmit &&
                            assestState.fixedincome === "" ? (
                              <span className="field_error">{FIELD_ERROR}</span>
                            ) : null}
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleViewGraph()}
              >
                {VIEW_GRAPH}
              </button>
              <div>
                <button
                  type="button"
                  className="btn clearall_btn"
                  onClick={() => resetInputs(setAssestState)}
                >
                  {CLEAR_ALL}
                </button>
                <button
                  type="submit"
                  className="btn submit_btn"
                  onClick={() => handleSubmit()}
                >
                  {isPreview ? "Update Asset" : "Add Asset"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-text">{DURATION}</div>
      <div className="modal-text2">
        <div className="modal-text3">
          <div className="modal-bodyy assest_added">
            <div className="list-assest-added">
              <h4 className="assest_list_h4">{LIST_OF_ASSEST_ADDED}</h4>
            </div>

            {totalAssest.length > 0 ? (
              totalAssest.map((assest: any, index: number) => {
                return (
                  <div className="added_assest_name">
                    <div className="hover-effect">{`${index + 1} ${
                      assest.assestname
                    }`}</div>
                    <div>
                      <a
                        href="#exampleModalToggle"
                        className="btn3"
                        data-bs-toggle="modal"
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
                        {PREVIEW}
                      </a>
                      <button
                        onClick={() => dispatch(deleteAssest(assest.id))}
                        className="delete_assest_btn"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="added_assest_name">
                <div>{ADD_ASSESTS_TO_SEE_LIST}</div>
              </div>
            )}
          </div>
          <div className="update-btn">
            <a
              className="btn modalbtn"
              role="button"
              onClick={() => setShow(true)}
            >
              {UPDATE_ASSESTS}
            </a>
            <button
              type="button"
              className="btn float-left modal_footer_btn"
              onClick={() => dispatch(emptyAsssestState())}
            >
              {CLEAR_ALL}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssesModal;
