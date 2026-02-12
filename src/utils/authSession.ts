export const AUTH_STORAGE_KEYS = {
  name: 'tfUserName',
  email: 'tfUserEmail',
  phone: 'tfUserPhone',
} as const;

export const setAuthSession = (payload: {
  name?: string;
  email?: string;
  phone?: string;
}) => {
  if (payload.name) {
    localStorage.setItem(AUTH_STORAGE_KEYS.name, payload.name);
  }
  if (payload.email) {
    localStorage.setItem(AUTH_STORAGE_KEYS.email, payload.email);
  }
  if (payload.phone) {
    localStorage.setItem(AUTH_STORAGE_KEYS.phone, payload.phone);
  }
};

export const getAuthSession = () => {
  return {
    name: localStorage.getItem(AUTH_STORAGE_KEYS.name) || '',
    email: localStorage.getItem(AUTH_STORAGE_KEYS.email) || '',
    phone: localStorage.getItem(AUTH_STORAGE_KEYS.phone) || '',
  };
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEYS.name);
  localStorage.removeItem(AUTH_STORAGE_KEYS.email);
  localStorage.removeItem(AUTH_STORAGE_KEYS.phone);
};
