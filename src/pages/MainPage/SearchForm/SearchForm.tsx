import { ChangeEvent, useState, FormEvent } from 'react'

interface FormData {
  searchTerm: string
}

export const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    searchTerm: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter GitHub Username
        <input
          type="text"
          name="searchTerm"
          value={formData.searchTerm}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  )
}
