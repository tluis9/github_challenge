# GitHub Frontend - Next.js App

Welcome to the GitHub Frontend Next.js app! This application allows you to perform user authentication, search for GitHub users, view their repositories, and manage search history.


## Technologies Used
- Next.js
- React
- Bootstrap
- Reactstrap
- Axios
- SWR
- React Icons
- React Modal
- JS-Cookie
- UUID
- Sass
- Tailwind CSS
- TypeScript


## Getting Started

To run the app locally, follow these steps:

1. Install dependencies:

   ```bash
   npm install

2. Run the development server::

   ```bash
   npm run dev

3. Open http://localhost:3000 in your browser.


## Features

### Login Page

- On the first visit, you can log in or register with basic user information and GitHub profile.
- During registration, the backend fetches data from the GitHub API and stores it in the database.
- Login generates an access token for protected routes.

### Top Bar

- Your GitHub username and profile picture appear in a fixed top bar on all screens.
- Clicking your name redirects to your user data screen.

### Search/User Data Page

- Search for GitHub users by username and view their repositories.
- Access the search history of the last 20 searches.

### Repository List Page

- Displays user information, total repositories, and a list of repositories.
- Click on a repository to open it on GitHub.

### History Page

- Shows search history with date, time, username, status, and the number of repositories found.
- Clicking on a username opens the user data screen; clicking on the total repositories redirects to the repository list.
- Delete button allows removing items from history.

### User Data Page
- Displays user details, including name, username, followers, following, repositories, bio, email, Twitter, company, and website.
- Edit button allows changing email, password, and GitHub username (only if accessed by the logged-in user).
- Logout button redirects to the login page.


## Additional Information

If you close the page/app, the last configured username will appear when you return.


Feel free to reach out if you have any questions or need further assistance!

