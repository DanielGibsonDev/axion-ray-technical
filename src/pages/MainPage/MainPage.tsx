import { SearchForm } from './SearchForm/SearchForm'

export const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 max-w-3xl text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900">
        List GitHub Public Repositories from a username or organisation name
      </h1>
      <SearchForm />
    </div>
  )
}
