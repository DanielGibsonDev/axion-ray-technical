import { useEffect, useState } from 'react'
import { SearchForm } from './SearchForm/SearchForm'
import { RepoTable } from './RepoTable/RepoTable'
import parseLinkHeader from 'parse-link-header'

export interface GitHubRepo {
  id: number
  full_name: string
  description: string
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface Pagination {
  first?: {
    page: string
    rel: string
    url: string
  }
  last?: {
    page: string
    rel: string
    url: string
  }
  next?: {
    page: string
    rel: string
    url: string
  }
  prev?: {
    page: string
    rel: string
    url: string
  }
  currentPage: string
}

type SortBy = 'full_name' | 'created' | 'updated' | 'pushed'
type Direction = 'asc' | 'desc'
type FilterOptions = 'all' | 'owner' | 'member'

interface SortingOptions {
  sortBy: SortBy
  direction: Direction
}

export const MainPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null)
  const [repoUsername, setRepoUsername] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: '1',
  })
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>({
    sortBy: 'full_name',
    direction: 'asc',
  })
  const [filterOptions, setFilterOptions] = useState<FilterOptions>('owner')

  useEffect(() => {
    if (repoUsername) {
      const handleFetch = async () => {
        try {
          setErrors(null)
          setIsFetching(true)

          const response = await fetch(
            `https://api.github.com/users/${repoUsername}/repos?page=${pagination.currentPage}&sort=${sortingOptions.sortBy}&direction=${sortingOptions.direction}&type=${filterOptions}`
          )

          if (!response.ok) {
            if (response.status === 404) {
              setErrors('Username or Organisation not found')
            } else {
              setErrors(
                `HTTP error! Status: ${response.status} - This may be due to rate limiting, please try again later`
              )
              throw new Error(
                `HTTP error! Status: ${response.status} - This may be due to rate limiting, please try again later`
              )
            }
          }

          if (response.headers.has('link')) {
            const links = parseLinkHeader(response.headers.get('link'))
            setPagination((prevValues) => ({ ...prevValues, ...links }))
          }

          const data = await response.json()
          setRepos(data as GitHubRepo[])
        } catch (error: any) {
          console.error('Error fetching data: ', error)
          setErrors(`Error: ${error.message}`)
        } finally {
          setIsFetching(false)
        }
      }
      handleFetch()
    }
  }, [
    repoUsername,
    pagination.currentPage,
    sortingOptions.direction,
    sortingOptions.sortBy,
    filterOptions,
  ])

  const handlePaginationChange = (newPage: string) => {
    setPagination((prevValues) => ({ ...prevValues, currentPage: newPage }))
  }

  const handleSortingClick = (sortBy: SortBy) => {
    setSortingOptions((values) => ({ ...values, sortBy }))
  }

  const handleSortingDirectionClick = (direction: Direction) => {
    setSortingOptions((values) => ({ ...values, direction }))
  }

  const handleFilteringClick = (type: FilterOptions) => {
    setFilterOptions(type)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 max-w-3xl text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900">
        List GitHub Public Repositories from a username or organisation name
      </h1>
      <SearchForm onSubmit={setRepoUsername} />
      {repos ? (
        <div>
          <div className="flex flex-col items-center">
            <h3 className="mt-8 mb-2 max-w-3xl text-center text-xl font-extrabold leading-none tracking-tight text-gray-900">
              Sorting options
            </h3>
            <div>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingClick('full_name')}
              >
                Full Name
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingClick('created')}
              >
                Last Created
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingClick('updated')}
              >
                Last Updated
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingClick('pushed')}
              >
                Last Pushed
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="mt-8 mb-2 max-w-3xl text-center text-xl font-extrabold leading-none tracking-tight text-gray-900">
              Sorting direction
            </h3>
            <div>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingDirectionClick('asc')}
              >
                Ascending
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleSortingDirectionClick('desc')}
              >
                Descending
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="mt-8 mb-2 max-w-3xl text-center text-xl font-extrabold leading-none tracking-tight text-gray-900">
              Filter by type
            </h3>
            <div>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleFilteringClick('all')}
              >
                All
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleFilteringClick('owner')}
              >
                Owner
              </button>
              <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={() => handleFilteringClick('member')}
              >
                Member
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {isFetching ? <div className="mt-2">Fetching Repositories...</div> : null}
      {errors ? <div className="mt-2 text-red-600">{errors}</div> : null}
      {!isFetching && !errors ? (
        <RepoTable
          username={repoUsername}
          repos={repos}
          pagination={pagination}
          onPaginationClick={handlePaginationChange}
        />
      ) : null}
    </div>
  )
}
