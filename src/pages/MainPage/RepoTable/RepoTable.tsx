import { GitHubRepo } from '../MainPage'

interface RepoTablesProps {
  username: string | null
  repos: GitHubRepo[] | null
}

export const RepoTable = ({ username, repos }: RepoTablesProps) => {
  if (repos === null) {
    return null
  }

  if (repos.length === 0) {
    return <div>No public repos</div>
  }

  return (
    <div className="mx-4 my-8 max-w-3xl">
      <h2 className="mb-6 text-center text-2xl font-extrabold">
        Public Repositories for {username}
      </h2>
      <table className="table-auto text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr className="border-b" key={repo.id}>
              <td>{repo.name}</td>
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

      <div className="flex justify-center gap-6 my-6">
        <button className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
          Previous
        </button>
        <button className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
          Next
        </button>
      </div>
    </div>
  )
}
