# HealthSync Rwanda 

This repository contains the frontend code for HealthSync Rwanda, a project aimed at improving healthcare record management systems in Rwanda. The frontend is built using React, Vite, and Tailwind CSS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Development](#development)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Folder Structure

```
.
├───public
└───src
    ├───Admin
    │   ├───Billing
    │   ├───Dashboard
    │   ├───LandingpageAdmin
    │   ├───ReportAdmin
    │   └───Users
    │       └───LandingUsers
    ├───assets
    ├───Billing
    ├───Components
    │   ├───About
    │   ├───Administrator
    │   ├───contact
    │   ├───features
    │   ├───footer
    │   ├───Home
    │   ├───Navbar
    │   └───team
    ├───LandingDash
    │   ├───Dashboard
    │   ├───DashboardReception
    │   ├───LandingRecDash
    │   └───Reports
    ├───Landingpage
    ├───LandingPatientList
    │   ├───PatientListReception
    │   └───PatientTable
    ├───pages
    └───Scheduling
```

## Setup Instructions

Follow these steps to get the project up and running:

1. **Clone the repository:**

   Open your terminal or command prompt and run the following command to clone the repository:

   ```bash
   git clone https://github.com/Samenergy/HealthSync-Rwanda.git
   ```

   Navigate into the project directory:

   ```bash
   cd HealthSync-Rwanda
   ```

2. **Install dependencies:**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Start the development server:**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

   This will start the development server. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**

   To create a production build of the application, run:

   ```bash
   npm run build
   ```

   This will generate optimized static files in the `dist` directory.

5. **Preview the production build:**

   To preview the production build locally, run:

   ```bash
   npm run preview
   ```

   This will serve the production build on [http://localhost:4173](http://localhost:4173).

6. **Lint the code:**

   To check for linting errors, run:

   ```bash
   npm run lint
   ```

## Available Scripts

In the project directory, you can run the following scripts:

- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build locally.
- **`npm run lint`**: Runs ESLint to check for linting errors.

## Dependencies

The project uses the following main dependencies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

For a complete list of dependencies, refer to the `package.json` file.

## Development

### Styling

This project uses Tailwind CSS for styling. Tailwind's utility-first approach allows for rapid and consistent styling of components.

### Components

Components are organized within the `src/Components` directory, with subdirectories for different sections of the application.

### Pages

The `src/pages` directory contains the main pages of the application. Each page typically imports and uses multiple components.

---

Now you should be ready to start developing the HealthSync Rwanda frontend. If you encounter any issues or have questions, please refer to the project's [issue tracker](https://github.com/your-username/healthsync-rwanda-frontend/issues) or contact the maintainers.

Happy coding!
