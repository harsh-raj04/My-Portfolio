import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Project } from '../../core/models/portfolio.models';
import { PortfolioApiService } from '../../core/services/portfolio-api.service';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CdkTrapFocus],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen px-4 py-20 sm:px-6 lg:px-10">
      <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

      <div class="relative mx-auto max-w-6xl" cdkTrapFocus>
        <a
          href="#"
          (click)="goBack($event)"
          class="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/15"
        >
          Back to portfolio
        </a>

        <article
          *ngIf="project() as item; else missingProject"
          class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/95 shadow-soft"
        >
          <div class="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <div class="border-b border-white/10 lg:border-b-0 lg:border-r">
              <img
                [ngSrc]="item.previewImage"
                width="1200"
                height="880"
                [alt]="item.title + ' preview'"
                class="h-full w-full object-cover"
                priority
              />
            </div>

            <div class="p-8 lg:p-10">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                  {{ item.metric.label }}
                </span>
                <span class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  {{ item.metric.value }}
                </span>
              </div>

              <h1 class="mt-6 font-heading text-4xl font-semibold text-white md:text-5xl">{{ item.title }}</h1>
              <p class="mt-5 max-w-2xl text-base leading-8 text-slate-300">{{ item.summary }}</p>

              <div class="mt-6 flex flex-wrap gap-3">
                <span
                  *ngFor="let tech of item.techStack"
                  class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="mt-10 grid gap-6 md:grid-cols-2">
                <div>
                  <h2 class="text-lg font-semibold text-white">Highlights</h2>
                  <ul class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
                    <li *ngFor="let highlight of item.highlights" class="flex items-start gap-3">
                      <span class="mt-2 h-2 w-2 rounded-full bg-sky-400"></span>
                      <span>{{ highlight }}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 class="text-lg font-semibold text-white">Features</h2>
                  <ul class="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
                    <li *ngFor="let feature of item.features" class="flex items-start gap-3">
                      <span class="mt-2 h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-10 flex flex-wrap gap-4">
                <a
                  *ngIf="item.githubUrl"
                  [href]="item.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-sky-300"
                >
                  Open GitHub
                </a>
                <a
                  [href]="item.architectureImage"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-white/40"
                >
                  View architecture
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-white/10 px-8 py-10 lg:px-10">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.22em] text-slate-500">Gallery</p>
                <h2 class="mt-2 font-heading text-2xl font-semibold text-white">Screenshots and diagrams</h2>
              </div>
            </div>

            <div class="mt-8 grid gap-6 md:grid-cols-2">
              <figure
                *ngFor="let image of item.gallery"
                class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80"
              >
                <img
                  [ngSrc]="image.image"
                  width="960"
                  height="640"
                  [alt]="image.label"
                  class="h-72 w-full object-cover"
                  loading="lazy"
                />
                <figcaption class="px-5 py-4 text-sm text-slate-300">{{ image.label }}</figcaption>
              </figure>
            </div>
          </div>
        </article>

        <ng-template #missingProject>
          <div class="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 text-white">
            <h1 class="font-heading text-4xl font-semibold">Project not found</h1>
            <p class="mt-4 max-w-xl text-slate-300">
              The requested project slug does not exist in the seeded portfolio data. Return to the landing page and verify the content configuration.
            </p>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class ProjectDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly portfolioApi = inject(PortfolioApiService);
  private readonly location = inject(Location);
  private readonly projectSignal = signal<Project | null>(null);

  readonly project = computed(() => this.projectSignal());

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.portfolioApi.loadProjectBySlug(params.get('slug') ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((project) => {
        this.projectSignal.set(project);
      });
  }

  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
