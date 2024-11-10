import React from 'react';
import { render } from '@testing-library/react-native';
import { Separator } from '../Separator';

describe('Separator', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Separator direction="horizontal" />);
    const separator = getByTestId('separator');
    expect(separator).toBeTruthy();
    expect(separator.props.style).toContainEqual({ height: 1, width: '100%' });
  });

  it('renders correctly with vertical direction', () => {
    const { getByTestId } = render(<Separator direction="vertical" />);
    const separator = getByTestId('separator');
    expect(separator).toBeTruthy();
    expect(separator.props.style).toContainEqual({ width: 1, height: '100%' });
  });

  it('renders correctly with custom color and thickness', () => {
    const { getByTestId } = render(<Separator direction="horizontal" color="red" thickness={2} />);
    const separator = getByTestId('separator');
    expect(separator).toBeTruthy();
    expect(separator.props.style).toContainEqual({ backgroundColor: 'red', height: 2, width: '100%' });
  });
});
