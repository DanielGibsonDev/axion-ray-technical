# Axion Ray Technical take-home test - React App

## Application and technical choices

- This application aims to utilise the GitHub API to fetch public repositories for a given username or organisation name and display the results in a table
- The data can be sorted, filtered and includes pagination

- Structured the project folders in a common way by separating components and pages with sub sections of the page
- Used useEffect with useState variables as dependencies when fetching the API
- Standard form handling with Formik and validation checks with Yup
- Standard use of data table
- Added a reset filters/storing on new form submit
- Added multiple ternary operations to check loading/error/empty states
- For time sake made sorting and filtering buttons outside of the table component, for better useability it should be brought closer to table headers
- Added basic unit testing, could include a lot more tests and even end-to-end tests

## Ideas for new features

- Move code into components such as button, input, table layout, pagination, sorting, filtering for better reusability and unified design
- Better styling of the sorting, sorting direction, and filter options by integrating them into the table headers with filters above
- Could use a component library to make the design better
- Add authenticated requests with a GitHub token to increase the rate limits
- Add better error handling with clearer instructions to a user on all cases
- Add session cache to save the users last search results
- Handle loading states better by displaying a skeleton outline of the table
- Add a backend which handles fetching the GitHub API and add state handler such as React Query
- Add further validation checks on form input so it matches requirements of GitHub usernames

## 3rd party library choices

- TailwindCSS for quick and easy CSS styling
- Prettier for unified code formatting with ESLint
- Husky for pre-commit Prettier check
- Formik for easier handling of forms, helps greatly with
  - Getting values in and out of a form state
  - Validation and error messages
  - Handling form submissions
- Yup form validations for ease of use
  - Far more easier to apply and create a unified schema of input validations
- Parse-link-header, Querystring, url - all used for parsing the Link response header from GitHub API for pagination information

## Instructions for running the app locally

- Run `npm install` to install dependencies
- Run `npm start` to run the app locally in dev mode

  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser

- Run `npm test` to run tests

## Instructions for building and deploying the app

- Run `npm run build`
  - Builds the app for production to the `build` folder
- To deploy the app - I recommend using [Netlify](https://www.netlify.com/)
  - Follow their [instructions for deployment](https://docs.netlify.com/welcome/add-new-site/)
