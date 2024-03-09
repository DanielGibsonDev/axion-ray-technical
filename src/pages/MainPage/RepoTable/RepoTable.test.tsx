import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { RepoTable } from './RepoTable'

const mockRepos = [
  {
    id: 1,
    full_name: 'user/repo1',
    description: 'Repository 1',
    created_at: '2022-01-01T12:00:00Z',
    updated_at: '2022-02-01T12:00:00Z',
    pushed_at: '2022-02-15T12:00:00Z',
  },
]

const mockPagination = {
  currentPage: '1',
  last: { page: '3' },
  prev: { page: '1' },
  next: { page: '2' },
}

describe('RepoTable component', () => {
  test('renders correctly with repositories', () => {
    render(
      <RepoTable
        username="testUser"
        repos={mockRepos}
        pagination={mockPagination}
        onPaginationClick={jest.fn()}
      />
    )

    expect(
      screen.getByText('Public Repositories for testUser')
    ).toBeInTheDocument()
    expect(screen.getByText('Repository 1')).toBeInTheDocument()
  })

  test('renders correctly with no repositories', () => {
    render(
      <RepoTable
        username="testUser"
        repos={[]}
        pagination={mockPagination}
        onPaginationClick={jest.fn()}
      />
    )

    expect(
      screen.getByText('No public repos or matching results to selected filter')
    ).toBeInTheDocument()
  })

  test('handles pagination click', () => {
    const onPaginationClickMock = jest.fn()
    render(
      <RepoTable
        username="testUser"
        repos={mockRepos}
        pagination={mockPagination}
        onPaginationClick={onPaginationClickMock}
      />
    )

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(onPaginationClickMock).toHaveBeenCalledWith('2')
  })

  test('disables and shows cursor-not-allowed for disabled pagination buttons', () => {
    render(
      <RepoTable
        username="testUser"
        repos={mockRepos}
        pagination={mockPagination}
        onPaginationClick={jest.fn()}
      />
    )

    const prevButton = screen.getByText('Previous')
    const nextButton = screen.getByText('Next')

    expect(prevButton).toHaveAttribute('disabled')
    expect(prevButton).toHaveClass('opacity-50 cursor-not-allowed')

    expect(nextButton).not.toHaveAttribute('disabled')
    expect(nextButton).not.toHaveClass('opacity-50 cursor-not-allowed')
  })
})
