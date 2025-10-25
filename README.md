# Next.js User Management App

A small **User Management Dashboard** built with **Next.js**, **Redux Toolkit**, and **Tailwind CSS**.  
This project demonstrates dynamic forms, table management, and basic CRUD operations — designed to show practical frontend skills for an interview scenario.

---

## Features

- **User Table**

  - View all users with columns: Name, Email, LinkedIn, Gender, Address, Edit/Delete.
  - Expandable rows to show full address.
  - Inline Edit and Delete functionality with confirmation.

- **User Form**

  - Add or edit users using a dynamic form.
  - Validations included with **Yup** and **React Hook Form**:
    - Name (required, min/max length from config)
    - Email (required, valid email)
    - LinkedIn URL (required, valid URL)
    - Gender (required)
    - Address: Line 1 & 2, State/City dropdown, PIN code validation.
  - Dynamic **City dropdown based on selected State**.
  - Styled with Tailwind; mobile-responsive.

- **Redux Toolkit**

  - Centralized state management for users.
  - Easy to extend for future enhancements.

- **Configurable**
  - `config.ts` for editable toggle, name min/max lengths, etc.
  - Static JSON for States & Cities.

---

## Demo Screenshot

_Replace with screenshot if desired_

---

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn

### Installation

```bash
# Clone repo
git clone <your-repo-url>
cd nextjs-user-table

# Install dependencies
npm install

# Run dev server
npm run dev

```
