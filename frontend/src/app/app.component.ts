import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  effect,
  inject,
  signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-400 transition-[width] duration-150"
      [style.width.%]="scrollProgress()"
    ></div>

    <button
      type="button"
      class="theme-toggle fixed right-5 top-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-900 shadow-soft backdrop-blur transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-950/70 dark:text-white"
      (click)="theme.toggleTheme()"
      [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span class="text-lg">{{ theme.isDark() ? '☀' : '☾' }}</span>
    </button>

    <main class="site-stage min-h-screen bg-mist text-slate-950 dark:bg-slate-950 dark:text-white">
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  readonly theme = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  readonly scrollProgress = signal(0);

  constructor() {
    effect(() => {
      this.theme.mode();
      this.updateScrollProgress();
    });
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateScrollProgress() {
    const root = this.document.documentElement;
    const scrollTop = root.scrollTop || this.document.body.scrollTop;
    const scrollHeight = root.scrollHeight - root.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    this.scrollProgress.set(Number(progress.toFixed(2)));
  }
}
