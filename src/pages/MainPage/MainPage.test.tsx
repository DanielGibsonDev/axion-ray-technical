import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MainPage } from './MainPage'

const mockResponse = [
  {
    id: 1,
    full_name: 'user/repo1',
    description: 'Description 1',
    created_at: '2022-01-01T12:00:00Z',
    updated_at: '2022-01-02T12:00:00Z',
    pushed_at: '2022-01-03T12:00:00Z',
  },
]

describe('MainPage component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
      status: 200,
      ok: true,
      headers: new Headers({
        link: '<https://api.github.com/user/913567/repos?page=2>; rel="next"',
      }),
    } as any)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders search form and repo table', () => {
    render(<MainPage />)

    // Search form
    expect(
      screen.getByLabelText(/Enter a GitHub Username or Organisation name/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Find Repositories/i })
    ).toBeInTheDocument()

    // Repo table (initially not present)
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('fetches repositories on form submit', async () => {
    render(<MainPage />)

    // Mock user input
    const input = screen.getByPlaceholderText(/e.g. Netflix/i)
    const submitButton = screen.getByRole('button', {
      name: /Find Repositories/i,
    })

    fireEvent.change(input, { target: { value: 'Netflix' } })

    // Mock form submission
    fireEvent.click(submitButton)

    // Ensure that fetch was called with the correct URL
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/users/Netflix/repos?page=1&sort=full_name&direction=asc&type=owner'
      )
    })

    // Display loading text
    expect(screen.getByText(/Fetching Repositories.../)).toBeInTheDocument()

    // Repo table should be present
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  // Additional tests can be added for handling sorting, pagination, and filtering interactions.
})
