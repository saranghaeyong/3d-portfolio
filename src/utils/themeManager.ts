import { ThemeMode } from '../types';

const THEME_STORAGE_KEY = 'portfolio_theme';

/**
 * Get initial theme from localStorage or default to 'dark'.
 */
export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (err) {
    console.warn('Unable to access localStorage for theme persistence:', err);
  }

  // Dark mode is default
  return 'dark';
}

/**
 * Persist theme and apply DOM attributes.
 */
export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.setAttribute('data-theme', theme);

  if (theme === 'light') {
    root.classList.add('theme-light');
    root.classList.remove('theme-dark');
  } else {
    root.classList.add('theme-dark');
    root.classList.remove('theme-light');
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.warn('Unable to save theme to localStorage:', err);
  }
}
