import { useState } from 'react'
import { SearchForm } from './SearchForm/SearchForm'

interface GitHubRepo {
  id: number
  name: string
  description: string
  url: string
  updated_at: string
}

export const MainPage: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [errors, setErrors] = useState<string | null>()
  const [repos, setRepos] = useState<GitHubRepo[]>()

  const handleSubmit = async () => {
    try {
      setIsFetching(true)
      const response = await fetch(
        'https://api.github.com/users/danielgibsondev/repos'
      )

      if (!response.ok) {
        setErrors(`HTTP error! Status: ${response.status}`)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setRepos(data)
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
      {isFetching ? (
        <div className="mt-2 text-xl">Fetching Repositories...</div>
      ) : null}
      {errors ? (
        <div className="mt-2 text-xl text-red-600">{errors}</div>
      ) : null}
    </div>
  )
}
