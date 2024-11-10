import React from 'react';
import { render } from '@testing-library/react-native';
import { CDLoader, CDLoaderProps } from '../CDLoader';
import { LoadingStatus } from "@/utils/customTypes";
import Modal from 'react-native-modal';

jest.mock('react-native-modal', () => 'Modal');

describe('CDLoder', () => {
    const renderComponent = (props: Partial<CDLoaderProps> = {}) => {
        const defaultProps: CDLoaderProps = {
            statuses: [],
            isModalEnable: true,
            style: {},
        };
        return render(<CDLoader {...defaultProps} {...props} />);
    };

    it('renders correctly when loading status is present and modal is enabled', () => {
        const { getByTestId } = renderComponent({ statuses: ['loading'] });
        expect(getByTestId('modal')).toBeTruthy();
    });

    it('renders correctly when loading status is present and modal is disabled', () => {
        const { getByTestId, queryByTestId, debug } = renderComponent({ statuses: ['loading'], isModalEnable: false });
        expect(getByTestId('spinner')).toBeTruthy();
        expect(queryByTestId('modal')).toBeNull();
    });

    it('does not render when there is no loading status', () => {
        const { queryByTestId, debug } = renderComponent({ statuses: ['succeeded'] });
        expect(queryByTestId('modal')).toBeNull()
        expect(queryByTestId('spinner')).toBeNull();
    });

    it('does not render when status is failed', () => {
        const { queryByTestId, debug } = renderComponent({ statuses: ['failed'] });
        debug()
        expect(queryByTestId('modal')).toBeNull();
        expect(queryByTestId('spinner')).toBeNull();
    });
});
