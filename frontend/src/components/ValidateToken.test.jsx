import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ValidateToken from "./ValidateToken"
import ApiService from '../api/ApiService';

jest.mock('../api/ApiService', () => ({
    post: jest.fn(),
    get: jest.fn()
}))


describe('ValidateToken Component', () => {
    it('render the component', () => {
        render(<ValidateToken data={{token: ''}}/>)
        expect(screen.getByText('Generated Token')).toBeInTheDocument()
    })

    it('validates a token', async () => {
        const mockedGet =(ApiService.validateToken = jest.fn()
        .mockResolvedValue({data:{isValid: true}}))

        const { getByText, getByRole } = render(
            <ValidateToken data={{ token: '1234-5678-9012-3456' }} />)

        fireEvent.change(getByRole('textbox'), { target: { value: '1234-5678-9012-3456' } })
        fireEvent.click(getByText('Validate Token'))
    
        await waitFor(() => {
            // expect(getByText('Valid')).toBeInTheDocument()
            expect(getByText('Valid')).toBeInTheDocument()
        })
    })
    
    it('handles an invalid token', async () => {
        const mockedGet =(ApiService.validateToken = jest.fn()
        .mockResolvedValue({data:{isValid: false}}))

        const { getByText, getByRole } = render(
            <ValidateToken data={{ token: '1234-5678-9012-3456' }} />)

        fireEvent.change(getByRole('textbox'), { target: { value: '1234-5678-9012-3456' } })
        fireEvent.click(getByText('Validate Token'))
    
        await waitFor(() => {
            expect(getByText('Invalid')).toBeInTheDocument();
        })
    })
})