# Axion Ray Technical take-home test - React App

- My Application and technical choices
- Steps to run the app
- Steps to deploy the app
- Ideas for new features

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

## Instructions for running the app locally

- Run `npm install` to install dependencies
- Run `npm start` to run the app locally in dev mode
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Instructions for building and deploying the app

- Run `npm run build`
  - Builds the app for production to the `build` folder
- To deploy the app - I recommend using [Netlify](https://www.netlify.com/)
  - Follow their [instructions for deployment](https://docs.netlify.com/welcome/add-new-site/)
