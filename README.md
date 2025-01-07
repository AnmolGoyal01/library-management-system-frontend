
# Library Management System

## Overview

This is a responsive Library Management System application built with the MERN stack. This project supports crud operations on user and books of library with special powers to admin

You can check out the live demo of the project [here](https://anmolgoyal-lib-management-sys.netlify.app/).

## Features

- **User Authentication**: Register, login, logout, password management.
- **Admin Features**: Admin can add, update and delete books.
- **Books**: Available books can be listed with pagination support
- **Transactions**: Books can be borrowed or returned based on their availability
- **Dashboard**: Dashboard to check the statistics of All Books, Total Available Books and Borrowed books


## Technologies Used

- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Backend**: Node js
- **Routing**: React Router DOM
- **Styling**: TailwindCSS

## Project Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/AnmolGoyal01/library-management-system-frontend
   ```
2. **Navigate to the project directory**:
   ```sh
   cd library-management-system-frontend
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```
4. **Create a _redirects file**:
- In the public folder of the project, create a file named _redirects with the following content:
   ```sh
   /* /index.html 200
   ```
5. **Configure Vite**:
- configure vite.config file with the following code (if using my hosted backend on azure):

   ```sh
   import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api/v1": "https://anmol-library-management.azurewebsites.net",
      },
    },
  });

   ```
   - configure vite.config file with the following code (if you are running my [backend server](https://github.com/AnmolGoyal01/library-management-system-backend) locally):

   ```sh
   import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api/v1": "http://localhost:4000",
      },
    },
  });

   ```
   
6. - **Run in Development:**:
   ```sh
   npm run dev
   ```
   - **Build and start server:**:
   ```sh
   npm run dev
   ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_URL`

## Author

- **Anmol Goyal:** [GitHub](https://github.com/Anmolgoyal01)

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://anmolgoyal.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anmol-goyal-358804235/)
[![twitter](https://img.shields.io/badge/github-010101?style=for-the-badge&logo=github&logoColor=white)](https://anmolgoyal.me/_next/static/media/github-icon.04fa7de0.svg)
