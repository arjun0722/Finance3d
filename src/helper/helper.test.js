import { checkAssest, resetInputs, previewAssest, circleAlgo,sumOfTotalInvestment  } from "./helper";
import { render, screen } from "@testing-library/react";


//-------------------------------------//
//----------------checkAssest----------------//
//-------------------------------------//

describe("checkAssest", () => {
  it("should return false if fixedincomecheckbox is true and any of the fields is empty", () => {
    const assestState = {
      fixedincomecheckbox: true,
      assestname: "name",
      assestclass: "",
      taxtreatment: "",
      duration: "",
      amountinvested: "",
      fixedincome: "",
    };

    expect(checkAssest(assestState)).toBe(false);
  });

  it("should return false if fixedincomecheckbox is false and any of the required fields is empty", () => {
    const assestState = {
      fixedincomecheckbox: false,
      assestname: "name",
      assestclass: "",
      taxtreatment: "",
      duration: "",
      amountinvested: "",
    };

    expect(checkAssest(assestState)).toBe(false);
  });

  it("should return true if all the required fields are filled and fixedincomecheckbox is true", () => {
    const assestState = {
      fixedincomecheckbox: true,
      assestname: "name",
      assestclass: "class",
      taxtreatment: "tax treatment",
      duration: "duration",
      amountinvested: "amount",
      fixedincome: "income",
    };

    expect(checkAssest(assestState)).toBe(true);
  });

  it("should return true if all the required fields are filled and fixedincomecheckbox is false", () => {
    const assestState = {
      fixedincomecheckbox: false,
      assestname: "name",
      assestclass: "class",
      taxtreatment: "tax treatment",
      duration: "duration",
      amountinvested: "amount",
    };

    expect(checkAssest(assestState)).toBe(true);
  });
});

//-------------------------------------//
//----------------resetInputs----------------//
//-------------------------------------//


describe("resetInputs", () => {
  it("should reset the inputs to their initial state", () => {
    const setAssestState = jest.fn();
    resetInputs(setAssestState);

    expect(setAssestState).toHaveBeenCalledWith({
      assestname: "",
      assestclass: "",
      taxtreatment: "",
      duration: "",
      amountinvested: "",
      fixedincomecheckbox: false,
      fixedincome: 0,
    });
  });
});

//-------------------------------------//
//----------------previewAssest----------------//
//-------------------------------------//


describe("previewAssest", () => {
  it("should set the assest and the isPreview state", () => {
    const assest = { name: "name", class: "class" };
    const setAssestState = jest.fn();
    const setIsPreview = jest.fn();

    previewAssest(assest, setAssestState, setIsPreview);

    expect(setAssestState).toHaveBeenCalledWith(assest);
    expect(setIsPreview).toHaveBeenCalledWith(true);
  });
});

//-------------------------------------//
//----------------circleAlgo----------------//
//-------------------------------------//



describe('circleAlgo', () => {
  test('should correctly categorize assets based on duration and tax treatment', () => {
    const allAssets = [
      { id: 1, duration: 'Short', taxtreatment: 'tax-deferred' },
      { id: 2, duration: 'Short', taxtreatment: 'taxable' },
      { id: 3, duration: 'Intermediate', taxtreatment: 'tax-deferred' },
      { id: 4, duration: 'Intermediate', taxtreatment: 'tax-free' },
      { id: 5, duration: 'Long', taxtreatment: 'taxable' },
      { id: 6, duration: 'Long', taxtreatment: 'tax-free' },
    ];

    const expectedOutput = {
      SHORTTAXDEF: [{ id: 1, duration: 'Short', taxtreatment: 'tax-deferred' }],
      SHORTTAXABLE: [{ id: 2, duration: 'Short', taxtreatment: 'taxable' }],
      SHORTTAXFREE: [],
      INTERNTAXDEF: [{ id: 3, duration: 'Intermediate', taxtreatment: 'tax-deferred' }],
      INTERNTAXABLE: [],
      INTERNTAXFREE: [{ id: 4, duration: 'Intermediate', taxtreatment: 'tax-free' }],
      LONGTAXDEF: [],
      LONGTAXABLE: [{ id: 5, duration: 'Long', taxtreatment: 'taxable' }],
      LONGTAXFREE: [{ id: 6, duration: 'Long', taxtreatment: 'tax-free' }],
    };

    const result = circleAlgo(allAssets);

    expect(result).toEqual(expectedOutput);
  });

  test('should log an error for assets with missing properties', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const allAssets = [
      { id: 1, duration: 'Short' },
      { id: 2, taxtreatment: 'taxable' },
    ];

    circleAlgo(allAssets);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);

    consoleErrorSpy.mockRestore();
  });

  test('should log an error for assets with invalid duration or tax treatment', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const allAssets = [
      { id: 1, duration: 'InvalidDuration', taxtreatment: 'tax-deferred' },
      { id: 2, duration: 'Short', taxtreatment: 'InvalidTreatment' },
    ];

    circleAlgo(allAssets);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);

    consoleErrorSpy.mockRestore();
  });
});


//-------------------------------------//
//----------------sumOfTotalInvestment----------------//
//-------------------------------------//


  describe('sumOfTotalInvestment', () => {
    it('should return 0 for an empty object', () => {
      const res = {};
      expect(sumOfTotalInvestment(res)).toBe(0);
    });
  
    it('should return the sum of amountinvested for all investments', () => {
      const res = {
        asset1: [{ amountinvested: 100 }, { amountinvested: 200 }],
        asset2: [{ amountinvested: 300 }],
      };
      expect(sumOfTotalInvestment(res)).toBe(600);
    });
  
    it('should return 0 if there are no investments', () => {
      const res = {
        asset1: [],
        asset2: [],
      };
      expect(sumOfTotalInvestment(res)).toBe(0);
    });
  
    it('should ignore non-investment properties', () => {
      const res = {
        asset1: [{ amountinvested: 100 }, { amountinvested: 200 }],
        name: 'John',
        age: 30,
      };
      expect(sumOfTotalInvestment(res)).toBe(300);
    });
  
    it('should return 0 if the input is not an object', () => {
      const res = 'invalid input';
      expect(sumOfTotalInvestment(res)).toBe(0);
    });
  });

