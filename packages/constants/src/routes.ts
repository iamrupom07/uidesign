export const API_ROUTES = {
  HEALTH: "/api/v1/health",
  AUTH: {
    ROOT: "/api/v1/auth",
    SIGN_IN: "/api/v1/auth/sign-in",
    SIGN_UP: "/api/v1/auth/sign-up",
    SIGN_OUT: "/api/v1/auth/sign-out",
    SESSION: "/api/v1/auth/session",
    ME: "/api/v1/auth/me",
  },
  USERS: {
    ROOT: "/api/v1/users",
    PROFILE: "/api/v1/users/profile",
  },
  PRODUCTS: {
    ROOT: "/api/v1/products",
  },
  CATEGORIES: {
    ROOT: "/api/v1/categories",
  },
  LEADS: {
    ROOT: "/api/v1/leads",
  },
  FINANCE: {
    ROOT: "/api/v1/finance",
  },
} as const;
