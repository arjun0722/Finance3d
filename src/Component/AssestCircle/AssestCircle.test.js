import React from 'react';
import { render } from '@testing-library/react';
import AssestCircle from './AssestCircle';

//-------------------------------------//
//--------component testing----------------//
//-------------------------------------//


test('renders without errors', () => {
  render(<AssestCircle
    radiuss={100}
    value="SHORTTAXDEF"
    fixedincome={10}
    assestname={['Asset 1', 'Asset 2']}
    percentageInvested={50}
    investment={true}
  />);
});


