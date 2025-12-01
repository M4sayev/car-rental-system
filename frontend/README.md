A frontend application built with React, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router, React Query, and Axios.
This project is currently in early development and serves as the UI for a rental management system.

📌 Features (In Progress)

Dashboard page – structure implemented, fastAPI connection ensure to /dashboard endpoint

Clients page – placeholder page added

Cars page – placeholder page added

Rentals page – placeholder page added

Full functionality will be added as development continues.

🛠️ Tech Stack

Vite – build tool

React 18 – UI library

TypeScript – type safety

TailwindCSS – styling

shadcn/ui – component system

React Router v6 – client-side routing

React Query – server state management

Axios – HTTP client

🚀 Getting Started
1. Clone the repository
git clone [<repo-url>](https://github.com/M4sayev/car-rental-system.git)
cd car-rental-system

2. Run the server
python run_api.py

3. Change folder
cd frontend 

4. Install dependencies
npm install

( 
    If you encounter an error related to shadcn/ui:
    - Make sure the project is initialized:
        npx shadcn@latest init
    - If you already have a components.json file that is corrupted or misconfigured,
      delete it and run the initialization again.
)

5. Start development server
npm run dev

📁 Project Structure
```
src/
 ├─ components/       # Shared UI components
 ├─ pages/
 │   ├─ dashboard/
 │   ├─ clients/
 │   ├─ cars/
 │   └─ rentals/
 ├─ constants         
 ├─ utils     
 ├─ config.js
 ├─ index.css
 ├─ App.tsx
 └─ main.tsx
 ```

📌 Current Status

🚧 Work in Progress
UI structure is set up, routing works, and pages are scaffolded, dashboard page is fully connected to the api.
Functionality, full API integration, and full UI design are coming next.
