import { GitHubRepo, Pagination } from '../MainPage'

interface RepoTablesProps {
  username: string | null
  repos: GitHubRepo[] | null
  pagination: Pagination | null
  onPaginationClick: (username: string, newPage: string) => Promise<void>
}

export const RepoTable = ({
  username,
  repos,
  pagination,
  onPaginationClick,
}: RepoTablesProps) => {
  if (repos === null || username === null) {
    return null
  }

  if (repos.length === 0) {
    return <div>No public repos</div>
  }

  const handlePrev = () => {
    const newPage = pagination?.prev?.page
    if (newPage) {
      onPaginationClick(username, newPage)
    } else {
      console.error(
        'Pagination previous button clicked with no new page value found'
      )
    }
  }

  const handleNext = () => {
    const newPage = pagination?.next?.page
    if (newPage) {
      onPaginationClick(username, newPage)
    } else {
      console.error(
        'Pagination previous button clicked with no new page value found'
      )
    }
  }

  return (
    <div className="mx-4 my-8 max-w-3xl">
      <h2 className="mb-6 text-center text-2xl font-extrabold">
        Public Repositories for {username}
      </h2>
      <table className="table-auto text-left">
        <thead>
          <tr className="border-b">
            <th>Full Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr className="border-b" key={repo.id}>
              <td>{repo.full_name}</td>
              <td>{repo.description}</td>
              <td>
                {repo.html_url ? (
                  <a
                    className="text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                    href={repo.html_url}
                  >
                    {repo.html_url}
                  </a>
                ) : (
                  'No URL available'
                )}
              </td>
              <td>
                {repo.updated_at
                  ? new Intl.DateTimeFormat('en-GB').format(
                      new Date(repo.updated_at)
                    )
                  : 'No update date available'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-6">
        <span>
          {`Page ${pagination?.currentPage ?? '1'}
          of ${pagination?.last?.page ?? pagination?.currentPage ?? 1}`}
        </span>
      </div>
      <div className="flex justify-center gap-6 my-4">
        <button
          disabled={!pagination?.prev}
          onClick={handlePrev}
          className={`mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${!pagination?.prev ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          disabled={!pagination?.next?.page}
          onClick={handleNext}
          className={`mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${!pagination?.next ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
