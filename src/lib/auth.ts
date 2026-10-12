export interface AuthUser {
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export const ADMIN_EMAIL = 'aws.rungta@gmail.com';
export const ADMIN_PASS = 'RungtaAws@21#';

export const DEMO_USER_EMAIL = 'student@rungta.edu';
export const DEMO_USER_PASS = 'student@123';

const AUTH_STORAGE_KEY = 'aws_community_auth_user';

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => {
  const user = getAuthUser();
  return Boolean(user && user.role === 'admin' && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
};

export const loginUser = (
  emailInput: string,
  passwordInput: string,
  rememberMe: boolean = false
): { success: boolean; user?: AuthUser; message: string } => {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  // Admin Check
  if (email === ADMIN_EMAIL.toLowerCase()) {
    if (password === ADMIN_PASS) {
      const adminUser: AuthUser = {
        email: ADMIN_EMAIL,
        role: 'admin',
        name: 'Event Administrator'
      };
      saveSession(adminUser, rememberMe);
      return {
        success: true,
        user: adminUser,
        message: 'Admin access authorized. Redirecting to Organizer Console & Excel Database...'
      };
    } else {
      return {
        success: false,
        message: 'Incorrect password for admin account (aws.rungta@gmail.com).'
      };
    }
  }

  // Student / Normal User Check
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Please enter a valid email address.'
    };
  }

  if (password.length < 4) {
    return {
      success: false,
      message: 'Password must be at least 4 characters.'
    };
  }

  const normalUser: AuthUser = {
    email: emailInput.trim(),
    role: 'user',
    name: emailInput.trim().split('@')[0] || 'Student Builder'
  };

  saveSession(normalUser, rememberMe);
  return {
    success: true,
    user: normalUser,
    message: `Welcome, ${normalUser.name}! Student access granted.`
  };
};

const saveSession = (user: AuthUser, rememberMe: boolean) => {
  const serialized = JSON.stringify(user);
  sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, serialized);
  }
  // Dispatch custom storage event for live UI update across components
  window.dispatchEvent(new Event('auth_state_changed'));
};

export const logoutUser = (): void => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem('aws_admin_authenticated');
  window.dispatchEvent(new Event('auth_state_changed'));
};
