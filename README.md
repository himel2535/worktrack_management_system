# WorkTrack ERP

Employee attendance and productivity tracking ERP built with Next.js.

**Work Smart, Every Hour.**

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Recharts
- Lucide React

## Modules

| Route | Module |
|-------|--------|
| `/` | Dashboard |
| `/my-work` | My Work — work sessions, updates |
| `/projects` | Projects |
| `/tasks` | Tasks |
| `/hourly-updates` | Hourly Updates |
| `/breaks` | Breaks |
| `/attendance` | Attendance |
| `/performance` | My Performance |
| `/settings` | Settings |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Pages (App Router)
├── components/
│   ├── dashboard/    # Dashboard widgets
│   ├── layout/       # Sidebar, headers
│   ├── shared/       # StatCard, badges, etc.
│   ├── charts/       # Recharts wrappers
│   └── ui/           # shadcn components
└── lib/
    ├── mock-data/    # Demo data (replace with API later)
    └── types/        # TypeScript interfaces
```

## Cursor Workspace

Open this folder as your Cursor workspace:

```
C:\Users\sdfsa\Desktop\worktrack
```

File → Open Folder → select `worktrack`

## License

Private — all rights reserved.
