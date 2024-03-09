import { useState } from 'react'
import { SearchForm } from './SearchForm/SearchForm'
import { RepoTable } from './RepoTable/RepoTable'
import parseLinkHeader from 'parse-link-header'

export interface GitHubRepo {
  id: number
  full_name: string
  description: string
  html_url: string
  updated_at: string
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

export const MainPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null)
  const [repoUsername, setRepoUsername] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  const handleFetch = async (username: string, page: string = '1') => {
    try {
      setRepoUsername(username)
      setErrors(null)
      setIsFetching(true)

      const response = await fetch(
        `https://api.github.com/users/${username}/repos?page=${page}`
      )

      if (!response.ok) {
        if (response.status === 404) {
          setErrors('Username or Organisation not found')
        } else {
          setErrors(`HTTP error! Status: ${response.status}`)
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      }

      if (response.headers.has('link')) {
        const links = parseLinkHeader(response.headers.get('link'))
        setPagination({ ...links, currentPage: page })
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

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 max-w-3xl text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900">
        List GitHub Public Repositories from a username or organisation name
      </h1>
      <SearchForm onSubmit={handleFetch} />
      {isFetching ? <div className="mt-2">Fetching Repositories...</div> : null}
      {errors ? <div className="mt-2 text-red-600">{errors}</div> : null}
      {!isFetching && !errors ? (
        <RepoTable
          username={repoUsername}
          repos={repos}
          pagination={pagination}
          onPaginationClick={handleFetch}
        />
      ) : null}
    </div>
  )
}
