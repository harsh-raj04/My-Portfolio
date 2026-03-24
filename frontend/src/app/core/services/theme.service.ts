import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'harsh-raj-theme';
  private readonly modeSignal = signal<ThemeMode>(this.readInitialTheme());

  readonly mode = computed(() => this.modeSignal());
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      const root = this.document.documentElement;
      const isDark = this.isDark();

      root.classList.toggle('dark', isDark);
      root.classList.toggle('light', !isDark);
      localStorage.setItem(this.storageKey, this.mode());
    });
  }

  toggleTheme() {
    this.modeSignal.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  private readInitialTheme(): ThemeMode {
    const stored = localStorage.getItem(this.storageKey);

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
