import type { UserRole } from "@/lib/api/client";

export type DemoUser = {
  email: string;
  name: string;
  role: UserRole;
  designation: string;
  avatar?: string;
};

export const DEMO_PASSWORD = "password123";

export const DEMO_USERS: DemoUser[] = [
  {
    email: "admin@worktrack.com",
    name: "Admin User",
    role: "admin",
    designation: "HR Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
  {
    email: "manager.dev@worktrack.com",
    name: "Dev Manager",
    role: "manager",
    designation: "Development Head",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevManager",
  },
  {
    email: "manager.catering@worktrack.com",
    name: "Catering Manager",
    role: "manager",
    designation: "Catering Head",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CateringManager",
  },
  {
    email: "himel@worktrack.com",
    name: "Himel Hossain",
    role: "employee",
    designation: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Himel",
  },
  {
    email: "dev1@worktrack.com",
    name: "Rahim Dev",
    role: "employee",
    designation: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim",
  },
  {
    email: "dev2@worktrack.com",
    name: "Farhan Dev",
    role: "employee",
    designation: "Backend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan",
  },
  {
    email: "catering1@worktrack.com",
    name: "Karim Catering",
    role: "employee",
    designation: "Chef",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
  },
  {
    email: "marketing1@worktrack.com",
    name: "Sadia Marketing",
    role: "employee",
    designation: "Social Media Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sadia",
  },
];

const ROLE_RANK: Record<UserRole, number> = {
  admin: 0,
  manager: 1,
  employee: 2,
};

export function isDemoModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
}

export function isDemoUserEmail(email: string): boolean {
  return DEMO_USERS.some((u) => u.email === email.toLowerCase());
}

export function sortDemoUsersByRole(users: DemoUser[]): DemoUser[] {
  return [...users].sort((a, b) => {
    const rankDiff = ROLE_RANK[a.role] - ROLE_RANK[b.role];
    if (rankDiff !== 0) return rankDiff;
    return a.name.localeCompare(b.name);
  });
}

export function defaultRouteForRole(role: UserRole): string {
  if (role === "admin") return "/admin";
  if (role === "manager") return "/manager";
  return "/";
}

export function getRoleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "manager") return "Manager";
  return "Employee";
}
