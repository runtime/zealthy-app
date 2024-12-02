# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `using the app`
#### `admin`

You can configure the onboarding components by clicking on the admin button
```
/admin
```

#### `create user`
You are prompted to create a user to begin. this initializes a user object and it is submitted to the api and saved to the database
```
'/create-user'
```
you can check out the user data at any time and see how the current user is being updated
```
/users
```

#### `onboarding the user`

based on the admin config you chose you will be given two onboarding steps. when each component on the step is complete, you can click the next button at the very bottom of the step to move to the next step.

#### Breadcrumbs
The app has nav breadcrumbs that show you each step. 

#### Restarting the app
in the /users page is a restart app button that will reset the app state

#### :)
