import { useFormik } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  searchTerm: string
}

interface SearchFormProps {
  onSubmit: (searchTerm: string) => void
}

const SearchFormSchema = Yup.object().shape({
  searchTerm: Yup.string()
    .min(1, 'Too short!')
    .max(100, 'Too long!')
    .required('Required'),
})

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const initialValues: FormValues = { searchTerm: '' }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: SearchFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.searchTerm.trim())
      resetForm()
    },
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label
        htmlFor="searchTerm"
        className="mb-2 block text-md font-medium leading-6 text-gray-900"
      >
        Enter a GitHub Username or Organisation name
      </label>
      <div className="flex gap-4 justify-center items-center">
        <div>
          <input
            id="searchTerm"
            type="text"
            name="searchTerm"
            value={values.searchTerm}
            onChange={handleChange}
            placeholder="e.g. Netflix"
            className="block border-1 rounded-md border-0 py-1.5 px-4 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300"
          />
          {errors.searchTerm ? (
            <div className="text-s text-red-600 absolute">
              {errors.searchTerm}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Find Repositories
        </button>
      </div>
    </form>
  )
}
