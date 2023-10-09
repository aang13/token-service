import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CreateToken from './CreateToken';
import ApiService from '../api/ApiService';
import userEvent from '@testing-library/user-event';

jest.mock('../api/ApiService', () => ({
    post: jest.fn(),
    get: jest.fn()
}))

describe('CreateToken Component', () => {
    it('renders the component', () => {
        render(<CreateToken />)
        expect(screen.getByText('Generate and validate your tokens at one stop!')).toBeInTheDocument()
    });

    it('handles digit selection and generation', async () => {
        const mockedPost =(ApiService.getToken = jest.fn()
        .mockResolvedValue({data:[]}))
        const { getByText, getAllByRole, getByRole } = render(<CreateToken />)
        const digitButtons = getAllByRole('button', { name: /[0-9]/ })

        fireEvent.click(digitButtons[0]);
        fireEvent.click(digitButtons[3]);

        const generateButton = getByText('Generate Token');
        await userEvent.click(generateButton)


        expect(mockedPost).toHaveBeenCalled()

        await waitFor(() => {
            expect(screen.getByText('Generated Token')).toBeInTheDocument();
        });
    });

    it('handles generating token with no digit selected', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const { getByText } = render(<CreateToken />);

        const generateButton = getByText('Generate Token');

        userEvent.click(generateButton)

        expect(window.alert).toHaveBeenCalledWith('Please select atleast 1 digit!');
    });
});
