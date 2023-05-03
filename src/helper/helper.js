

export function checkAssest(assestState) {
  if (assestState.fixedincomecheckbox === true) {
    if (
      assestState.assestname !== "" &&
      assestState.assestclass !== "" &&
      assestState.taxtreatment !== "" &&
      assestState.duration !== "" &&
      assestState.amountinvested !== "" &&
      assestState.fixedincome !== ""
    ) {
      return true;
    } else {
      return false;
    }
  } else if (assestState.fixedincomecheckbox === false) {
    if (
      assestState.assestname !== "" &&
      assestState.assestclass !== "" &&
      assestState.taxtreatment !== "" &&
      assestState.duration !== "" &&
      assestState.amountinvested !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export function resetInputs(setAssestState) {
  return setAssestState({
    assestname: "",
    assestclass: "",
    taxtreatment: "",
    duration: "",
    amountinvested: "",
    fixedincomecheckbox: false,
    fixedincome: 0,
  });
}

export function previewAssest(
  assest,
  setAssestState,
  setIsPreview,
  setUpdateAssest
) {
  setAssestState(assest);
  setUpdateAssest(assest);
  setIsPreview(true);
}

export function dataBridge(datapreview) {
  return datapreview;
}

export function updateAssestState(updateAssest) {}

const circleDatas = {
  SHORTTAXDEF: [],
  SHORTTAXABLE: [],
  SHORTTAXFREE: [],
  INTERNTAXDEF: [],
  INTERNTAXABLE: [],
  INTERNTAXFREE: [],
  LONGTAXDEF: [],
  LONGTAXABLE: [],
  LONGTAXFREE: [],
};

export function circleAlgo(allAssets) {
  circleDatas.SHORTTAXDEF = [];
  circleDatas.SHORTTAXABLE = [];
  circleDatas.SHORTTAXFREE = [];
  circleDatas.INTERNTAXDEF = [];
  circleDatas.INTERNTAXABLE = [];
  circleDatas.INTERNTAXFREE = [];
  circleDatas.LONGTAXDEF = [];
  circleDatas.LONGTAXABLE = [];
  circleDatas.LONGTAXFREE = [];

  allAssets.map((asset) => {
    const { duration, taxtreatment } = asset;
    if (!duration || !taxtreatment) {
      console.error("Asset is missing required properties:", asset);
      return;
    }

    switch (duration) {
      case "Short":
        switch (taxtreatment) {
          case "tax-deferred":
            let index1 = circleDatas.SHORTTAXDEF.findIndex(
              (obj) => obj.id === asset.id
            );

            if (index1 !== -1) {
              circleDatas.SHORTTAXDEF.splice(index1, 1);
            }
            circleDatas.SHORTTAXDEF.push(asset);
            break;
          case "taxable":
            let index2 = circleDatas.SHORTTAXABLE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index2 !== -1) {
              circleDatas.SHORTTAXABLE.splice(index2, 1);
            }
            circleDatas.SHORTTAXABLE.push(asset);
            break;
          case "tax-free":
            let index3 = circleDatas.SHORTTAXFREE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index3 !== -1) {
              circleDatas.SHORTTAXABLE.splice(index3, 1);
            }
            circleDatas.SHORTTAXFREE.push(asset);
            break;
          default:
            console.error("Asset has invalid tax treatment:", asset);
            break;
        }
        break;
      case "Intermediate":
        switch (taxtreatment) {
          case "tax-deferred":
            let index4 = circleDatas.INTERNTAXDEF.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index4 !== -1) {
              circleDatas.INTERNTAXDEF.splice(index4, 1);
            }
            circleDatas.INTERNTAXDEF.push(asset);
            break;
          case "taxable":
            let index5 = circleDatas.INTERNTAXABLE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index5 !== -1) {
              circleDatas.INTERNTAXABLE.splice(index5, 1);
            }
            circleDatas.INTERNTAXABLE.push(asset);
            break;
          case "tax-free":
            let index6 = circleDatas.INTERNTAXFREE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index6 !== -1) {
              circleDatas.INTERNTAXABLE.splice(index6, 1);
            }
            circleDatas.INTERNTAXFREE.push(asset);
            break;
          default:
            console.error("Asset has invalid tax treatment:", asset);
            break;
        }
        break;
      case "Long":
        switch (taxtreatment) {
          case "tax-deferred":
            let index7 = circleDatas.LONGTAXDEF.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index7 !== -1) {
              circleDatas.LONGTAXDEF.splice(index7, 1);
            }
            circleDatas.LONGTAXDEF.push(asset);
            break;
          case "taxable":
            let index8 = circleDatas.LONGTAXABLE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index8 !== -1) {
              circleDatas.LONGTAXABLE.splice(index8, 1);
            }
            circleDatas.LONGTAXABLE.push(asset);
            break;
          case "tax-free":
            let index9 = circleDatas.LONGTAXFREE.findIndex(
              (obj) => obj.id === asset.id
            );
            if (index9 !== -1) {
              circleDatas.LONGTAXABLE.splice(index9, 1);
            }
            circleDatas.LONGTAXFREE.push(asset);
            break;
          default:
            console.error("Asset has invalid tax treatment:", asset);
            break;
        }
        break;
      default:
        console.error("Asset has invalid duration:", asset);
        break;
    }
  });

  return circleDatas;
}

export function sumOfTotalInvestment(res) {
  const obj = res;
  const totalAmountInvested = Object.keys(obj).reduce((acc, key) => {
    if (Array.isArray(obj[key])) {
      return (
        acc +
        obj[key].reduce((innerAcc, innerObj) => {
          return innerAcc + Number(innerObj.amountinvested);
        }, 0)
      );
    }
    return acc;
  }, 0);

  return totalAmountInvested;
}
