import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchForm } from './SearchForm'

describe('SearchForm Component', () => {
  test('renders correctly', () => {
    const onSubmitMock = jest.fn()
    render(<SearchForm onSubmit={onSubmitMock} />)

    expect(
      screen.getByLabelText(/Enter a GitHub Username or Organisation name/i)
    ).toBeInTheDocument()
  })

  test('submits the form with trimmed searchTerm', async () => {
    const onSubmitMock = jest.fn()
    render(<SearchForm onSubmit={onSubmitMock} />)

    const input = screen.getByPlaceholderText(/e.g. Netflix/i)
    const submitButton = screen.getByRole('button', {
      name: /Find Repositories/i,
    })

    fireEvent.change(input, { target: { value: ' Netflix ' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('Netflix')
    })
  })

  test('displays validation error for invalid input', async () => {
    const onSubmitMock = jest.fn()
    render(<SearchForm onSubmit={onSubmitMock} />)

    const input = screen.getByPlaceholderText(/e.g. Netflix/i)
    const submitButton = screen.getByRole('button', {
      name: /Find Repositories/i,
    })

    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).not.toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(screen.getByText('Required')).toBeInTheDocument()
    })
  })

  test('resets the form after successful submission', async () => {
    const onSubmitMock = jest.fn()
    render(<SearchForm onSubmit={onSubmitMock} />)

    const input = screen.getByPlaceholderText(
      /e.g. Netflix/i
    ) as HTMLInputElement
    const submitButton = screen.getByRole('button', {
      name: /Find Repositories/i,
    })

    fireEvent.change(input, { target: { value: 'NetFlix' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('NetFlix')
    })

    expect(input.value).toBe('')
  })
})
