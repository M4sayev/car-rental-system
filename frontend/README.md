# 🚗 Car Rental Management System - Frontend

[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)

A modern frontend application built with React, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router, React Query, and Axios. This project serves as the UI for a car rental management system.

---

## 📌 Features

### Implemented ✅
- **Dashboard** - Fully connected to FastAPI `/dashboard` endpoint with real-time statistics
- **Cars Management** - Complete CRUD operations with image upload, filtering (all/available/rented), soft delete
- **Clients Management** - Full CRUD with form validation, search, soft delete
- **Form Validation** - Zod schemas with React Hook Form
- **File Upload** - Drag-and-drop with React Dropzone
- **Testing** - Comprehensive tests with Vitest and RTL

### In Development 🚧
- **Rentals** - Currently mock implementation, real API integration coming soon
- **Authentication** - JWT-based auth with role-based access control (Admin, Employee, Customer)
- **Dashboard Analytics** - Charts for revenue, statistics, and vehicle utilization

---

## 🛠️ Tech Stack

**Core:** Vite, React 18, TypeScript, TailwindCSS  
**UI:** shadcn/ui, Lucide Icons, Radix UI  
**Routing & State:** React Router v6, React Query (TanStack Query)  
**Forms:** React Hook Form, Zod, React Dropzone  
**API:** Axios with configured interceptors  
**Testing:** Vitest, React Testing Library

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Backend API running on `http://127.0.0.1:8000`

### Installation

```bash
# 1. Clone repository
git clone https://github.com/M4sayev/car-rental-system.git
cd car-rental-system

# 2. Start backend API (granted you create a virtual environment and installed python packages in requirements.txt)
python run_api.py

# 3. Install frontend dependencies
cd frontend
npm install

# 4. shadcn/ui setup (if needed)
# If you encounter shadcn/ui errors:
npx shadcn@latest init
# If components.json is corrupted, delete it first

# 5. Start development server
npm run dev
or npm run dev -- --host to run over the network
```

App runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
src/
 ├── components/          # UI components

 │   ├── Cars/            # contains car page related components (CarCard, AddCarDropdown,...)
 │   ├── Clients/         # contains client page related components (ClientsTable,...)
 │   ├── DashBoard/       # contains dashboard related components (Cards, RecentRentals,...)
 │   ...                  # generic components (FormDialog, FormField, DataTableCard,...)
 │   ├── ui/              # shadcn/ui components
 │   ├── custom/          # Custom components (CarCard, ErrorMessage, etc.)
 │   └── layout/          # Layout components (navbars, Footer)
 ├── pages/               # Page components
 │   ├── Dashboard        # Dashboard 
 │   ├── Cars             # Cars management
 │   ├── Clients          # Clients management
 │   └── Rentals          # Rentals (mock)
 ├── hooks/               # Custom hooks
 │   └── queryHooks/      # React Query hooks (clients, dashboard, cars) 
 ├── lib/                 # Utilities (shadcn auto-generated folder)
 ├── constants/           # Templates, Zod schemas, reusable statics
 ├── test/                # test setup files, mockData for tests
 ├── types/               # reusable types
 ├── utils/               # shortenId, formatStringToISO,... utility functions
 ├── config.ts
 ├── App.tsx
 └── main.tsx
```

---

## 📋 Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run test             # Run tests
npm run test:coverage    # Tests with coverage
npm run lint             # Lint code
```

---

## 🎯 Roadmap

### Current Phase
- [x] Cars & Clients CRUD
- [x] Dashboard with API
- [x] Form validation & file upload
- [ ] Complete rentals functionality
- [ ] Authentication system

### Next Phase
- [ ] Dashboard charts & analytics
- [ ] Export data (PDF/Excel)
- [ ] AI intergration

---

## 🐛 Troubleshooting

**API connection error:**
```bash
# Ensure backend is running
python run_api.py
# Check .env has VITE_API_BASE_URL=http://127.0.0.1:8000
```

**shadcn/ui error:**
```bash
rm components.json
npx shadcn@latest init
```

**Port 5173 in use:**
```bash
npm run dev -- --port 3000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

Ensure tests pass: `npm run test && npm run lint && npm run type-check`

## 📄 License

MIT License - see [LICENSE](LICENSE) file
