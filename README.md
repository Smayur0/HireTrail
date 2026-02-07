# 🚀 HireTrail Monorepo

This repository is a **pnpm workspace-based monorepo** for the HireTrail project.

It manages multiple apps and shared packages from a single root using **pnpm workspaces**.

---

## 📦 Prerequisites

Make sure you have:

- **Node.js** (v18 or higher recommended)
- **pnpm** (v10+)

Install pnpm globally if not installed:

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm -v
```

---

## 📁 Project Structure

Example structure:

```
hiretrail-monorepo/
│
├── packages/
│   ├── app/        # Backend application
│   ├── web/        # Frontend application
│   └── ui/         # Shared UI components
│
├── pnpm-workspace.yaml
└── package.json (root)
```

---

## 🧠 How This Monorepo Works

This project uses **pnpm workspaces**, which means:

- All dependencies are managed from the root.
- Internal packages are automatically linked.
- Dependencies are stored efficiently in a global store.
- You can run scripts across all packages from the root.

Root `package.json`:

```json
{
  "name": "hiretrail-monorepo",
  "version": "1.0.0",
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint"
  },
  "packageManager": "pnpm@10.25.0",
  "devDependencies": {
    "tsx": "^4.21.0"
  }
}
```

---

## 🛠️ First Time Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd hiretrail-monorepo
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

This will:
- Install dependencies for all workspace packages
- Link internal packages automatically

---

## 🚀 Running the Project

Start all applications in development mode:

```bash
pnpm dev
```

This runs:

```bash
pnpm -r --parallel dev
```

Explanation:
- `-r` → Run recursively in all workspace packages
- `--parallel` → Run scripts simultaneously

---

## 🏗️ Build All Packages

```bash
pnpm build
```

---

## 🧹 Lint All Packages

```bash
pnpm lint
```

---

## 🎯 Running a Single Package

To run only one package:

```bash
pnpm --filter <package-name> dev
```

Example:

```bash
pnpm --filter app dev
```

---

## 📦 Adding Dependencies

### Add dependency to a specific package:

```bash
pnpm add express --filter app
```

### Add dev dependency to root:

```bash
pnpm add -D eslint
```

---

## 🧩 Internal Package Usage

If one package depends on another (example: `web` depends on `ui`):

In `web/package.json`:

```json
{
  "dependencies": {
    "@hiretrail/ui": "workspace:*"
  }
}
```

pnpm will automatically link it locally.

---

## 🔥 Clean Install (If Something Breaks)

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📌 Important Notes

- Always run commands from the root folder.
- Do NOT use npm or yarn.
- Use `pnpm --filter` when working on a specific package.

---

## 👨‍💻 Contributing

1. Create a new branch
2. Make your changes
3. Test locally using `pnpm dev`
4. Create a pull request

---

## 📄 License

ISC
