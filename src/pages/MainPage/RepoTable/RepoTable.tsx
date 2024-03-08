import { GitHubRepo } from '../MainPage'

interface RepoTablesProps {
  repos: GitHubRepo[] | null
}

export const RepoTable = ({ repos }: RepoTablesProps) => {
  console.log(repos)

  if (repos === null) {
    return null
  }

  if (repos.length === 0) {
    return <div>No public repos</div>
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Details</td>
        </tr>
      </tbody>
    </table>
  )
}
