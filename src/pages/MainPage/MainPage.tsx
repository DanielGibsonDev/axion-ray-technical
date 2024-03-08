import { useState } from 'react'
import { SearchForm } from './SearchForm/SearchForm'
import { RepoTable } from './RepoTable/RepoTable'

export interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  updated_at: string
}

export const MainPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null)
  const [repoUsername, setRepoUsername] = useState<string | null>(null)

  const handleSubmit = async (username: string) => {
    try {
      setRepoUsername(username)
      setErrors(null)
      setIsFetching(true)
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      )

      if (!response.ok) {
        if (response.status === 404) {
          setErrors('Username or Organisation not found')
        } else {
          setErrors(`HTTP error! Status: ${response.status}`)
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
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
      <SearchForm onSubmit={handleSubmit} />
      {isFetching ? <div className="mt-2">Fetching Repositories...</div> : null}
      {errors ? <div className="mt-2 text-red-600">{errors}</div> : null}
      {!isFetching && !errors ? (
        <RepoTable username={repoUsername} repos={repos} />
      ) : null}
    </div>
  )
}
