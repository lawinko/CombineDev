import React from 'react';
import { render } from '@testing-library/react-native';
import Spacer from '../Spacer';

describe('Spacer', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Spacer />);
    const spacer = getByTestId('spacer');
    expect(spacer.props.style).toEqual({ marginTop: 0, marginLeft: 0 });
  });

  it('renders correctly with vertical prop', () => {
    const { getByTestId } = render(<Spacer vertical={10} />);
    const spacer = getByTestId('spacer');
    expect(spacer.props.style).toEqual({ marginTop: 10, marginLeft: 0 });
  });

  it('renders correctly with horizontal prop', () => {
    const { getByTestId } = render(<Spacer horizontal={15} />);
    const spacer = getByTestId('spacer');
    expect(spacer.props.style).toEqual({ marginTop: 0, marginLeft: 15 });
  });

  it('renders correctly with both vertical and horizontal props', () => {
    const { getByTestId } = render(<Spacer vertical={10} horizontal={15} />);
    const spacer = getByTestId('spacer');
    expect(spacer.props.style).toEqual({ marginTop: 10, marginLeft: 15 });
  });
});
