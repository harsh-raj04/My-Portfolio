import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="max-w-2xl">
      <span
        *ngIf="eyebrow()"
        class="mb-4 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:text-sky-300"
      >
        {{ eyebrow() }}
      </span>
      <h2 class="font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
        {{ title() }}
      </h2>
      <p *ngIf="description()" class="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
        {{ description() }}
      </p>
    </div>
  `
})
export class SectionHeaderComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
}
