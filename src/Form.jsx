import React, { useState } from 'react';

const Form = () => {
  const [assetName, setAssetName] = useState('');
  const [assetClass, setAssetClass] = useState('');
  const [taxTreatment, setTaxTreatment] = useState('');
  const [duration, setDuration] = useState('');
  const [amount, setAmount] = useState('');
  const [isFixedIncome, setIsFixedIncome] = useState(false);

  const handleAssetNameChange = (event) => {
    setAssetName(event.target.value);
  };

  const handleAssetClassChange = (event) => {
    setAssetClass(event.target.value);
  };

  const handleTaxTreatmentChange = (event) => {
    setTaxTreatment(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleIsFixedIncomeChange = (event) => {
    setIsFixedIncome(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div style={{width:"65%",height:"50%",display:"flex" ,margin:"10rem auto"}}>
        <div style={{width:"80%"}}>
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'black', color: 'white', height: '100%', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '16px', margin: '21px 12px 8px 12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <label style={{ marginBottom: '8px' }}>
                    Asset Name<span style={{ color: 'red' }}>*</span>:
                </label>
                <input type="text" value={assetName} onChange={handleAssetNameChange} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <label style={{ marginBottom: '8px' }}>
                    Asset Class<span style={{ color: 'red' }}>*</span>:
                </label>
                <input type="text" value={assetClass} onChange={handleAssetClassChange} />
            </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', margin: '21px 12px 8px 12px', rowGap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <label style={{ marginBottom: '8px' }}>
                Tax Treatment<span style={{ color: 'red' }}>*</span>:
                </label>
                <select value={taxTreatment} onChange={handleTaxTreatmentChange}>
                <option value="">Select Tax Treatment</option>
                <option value="tax-deferred">Tax Deferred</option>
                <option value="taxable">Taxable</option>
                <option value="tax-free">Tax Free</option>
                </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <label style={{ marginBottom: '8px' }}>
                Duration<span style={{ color: 'red' }}>*</span>:
                </label>
                <select value={duration} onChange={handleDurationChange}>
                <option value="">Select Duration</option>
                <option value="Short">Short</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Long">Long</option>
                </select>
            </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'start', margin: '21px 12px 8px 12px', rowGap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px' }}>
                        Amount<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input type="number" value={amount} onChange={handleAmountChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "18px 25px" }}>
                <label style={{ marginRight: '8px' }}>
                    Is Fixed Income:
                </label>
                <input type="checkbox" checked={isFixedIncome} onChange={handleIsFixedIncomeChange} style={{ marginLeft: '8px' }} />
            </div>
        </div>
            <button type="submit" style={{ margin: '16px 0', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px' }}>Submit</button>
        </form>
        </div>
    <div style={{width:"35%",backgroundColor:"grey"}}>
    </div>
    </div>
    );
};
export default Form;