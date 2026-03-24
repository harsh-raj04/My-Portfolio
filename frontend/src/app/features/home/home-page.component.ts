import { NgClass, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  fallbackCertificates,
  fallbackEducation,
  fallbackProjects,
  fallbackSkills,
  portfolioContent
} from '../../core/data/portfolio-fallback';
import {
  Certificate,
  EducationEntry,
  Project,
  Skill
} from '../../core/models/portfolio.models';
import { PortfolioApiService } from '../../core/services/portfolio-api.service';
import { ScrollService } from '../../core/services/scroll.service';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

const SKILL_LOGO_MAP: Record<string, { slug: string; color: string }> = {
  java: { slug: 'openjdk', color: 'ED8B00' },
  cpp: { slug: 'cplusplus', color: '00599C' },
  c: { slug: 'c', color: 'A8B9CC' },
  python: { slug: 'python', color: '3776AB' },
  javascript: { slug: 'javascript', color: 'F7DF1E' },
  shell: { slug: 'gnubash', color: '4EAA25' },
  react: { slug: 'react', color: '61DAFB' },
  node: { slug: 'nodedotjs', color: '339933' },
  html: { slug: 'html5', color: 'E34F26' },
  css: { slug: 'css', color: '663399' },
  aws: { slug: 'amazonwebservices', color: 'FF9900' },
  docker: { slug: 'docker', color: '2496ED' },
  jenkins: { slug: 'jenkins', color: 'D24939' },
  terraform: { slug: 'terraform', color: '844FBA' },
  git: { slug: 'git', color: 'F05032' },
  github: { slug: 'github', color: '181717' },
  linux: { slug: 'linux', color: 'FCC624' },
  maven: { slug: 'apachemaven', color: 'C71A36' },
  mongodb: { slug: 'mongodb', color: '47A248' }
};

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    RevealOnScrollDirective,
    SectionHeaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home-shell relative overflow-hidden" [class.ready-for-motion]="heroMotionReady()">
      <div
        *ngIf="showLandingIntro()"
        class="landing-intro"
        [ngClass]="{ 'landing-intro--exit': introClosing() }"
      >
        <div class="landing-intro__glow landing-intro__glow--left"></div>
        <div class="landing-intro__glow landing-intro__glow--right"></div>
        <div class="landing-intro__grid"></div>
        <div class="landing-intro__line landing-intro__line--top"></div>
        <div class="landing-intro__line landing-intro__line--bottom"></div>
        <div class="landing-intro__visual-stage">
          <div class="landing-intro__hud landing-intro__hud--left">
            <span class="landing-intro__hud-label">System Layers</span>
            <div class="landing-intro__hud-chip">CI / CD</div>
            <div class="landing-intro__hud-chip">Terraform</div>
            <div class="landing-intro__hud-chip">AWS Cloud</div>
            <div class="landing-intro__hud-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div class="landing-intro__core">
            <svg viewBox="0 0 520 520" class="landing-intro__core-svg" aria-hidden="true">
              <defs>
                <linearGradient id="coreStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38BDF8" />
                  <stop offset="55%" stop-color="#3B82F6" />
                  <stop offset="100%" stop-color="#22C55E" />
                </linearGradient>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(59,130,246,0.95)" />
                  <stop offset="100%" stop-color="rgba(59,130,246,0)" />
                </radialGradient>
              </defs>
              <circle cx="260" cy="260" r="168" class="landing-intro__core-ring landing-intro__core-ring--outer" />
              <circle cx="260" cy="260" r="128" class="landing-intro__core-ring landing-intro__core-ring--middle" />
              <circle cx="260" cy="260" r="92" class="landing-intro__core-ring landing-intro__core-ring--inner" />
              <circle cx="260" cy="260" r="182" class="landing-intro__core-dash landing-intro__core-dash--one" />
              <circle cx="260" cy="260" r="146" class="landing-intro__core-dash landing-intro__core-dash--two" />
              <path d="M260 78V170" class="landing-intro__core-link" />
              <path d="M260 350V442" class="landing-intro__core-link" />
              <path d="M78 260H170" class="landing-intro__core-link" />
              <path d="M350 260H442" class="landing-intro__core-link" />
              <path d="M132 132L196 196" class="landing-intro__core-link landing-intro__core-link--soft" />
              <path d="M388 132L324 196" class="landing-intro__core-link landing-intro__core-link--soft" />
              <path d="M132 388L196 324" class="landing-intro__core-link landing-intro__core-link--soft" />
              <path d="M388 388L324 324" class="landing-intro__core-link landing-intro__core-link--soft" />
              <circle cx="260" cy="260" r="48" fill="url(#coreGlow)" class="landing-intro__core-center" />
              <circle cx="260" cy="260" r="22" fill="url(#coreStroke)" class="landing-intro__core-pulse" />
              <circle cx="260" cy="78" r="8" fill="#38BDF8" class="landing-intro__core-node" />
              <circle cx="442" cy="260" r="8" fill="#22C55E" class="landing-intro__core-node" />
              <circle cx="260" cy="442" r="8" fill="#38BDF8" class="landing-intro__core-node" />
              <circle cx="78" cy="260" r="8" fill="#A78BFA" class="landing-intro__core-node" />
            </svg>
          </div>

          <div class="landing-intro__hud landing-intro__hud--right">
            <span class="landing-intro__hud-label">Live Signals</span>
            <div class="landing-intro__hud-metric">
              <span>Deploy Flow</span>
              <strong>Stable</strong>
            </div>
            <div class="landing-intro__hud-metric">
              <span>Cloud Infra</span>
              <strong>Online</strong>
            </div>
            <div class="landing-intro__hud-metric">
              <span>App Stack</span>
              <strong>Ready</strong>
            </div>
          </div>
        </div>

        <div class="landing-intro__content">
          <span class="landing-intro__eyebrow">Harsh Raj • Developer Portfolio</span>
          <h1 class="landing-intro__title">Welcome to my Portfolio</h1>
          <p class="landing-intro__copy">
            Cloud automation, DevOps systems, and full stack product work presented as a visual showcase.
          </p>

          <div class="landing-intro__chips">
            <span>DevOps</span>
            <span>Cloud</span>
            <span>Full Stack</span>
          </div>
        </div>
      </div>

      <div class="pointer-events-none absolute inset-0 bg-mesh"></div>
      <div
        class="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-500/10"
      ></div>
      <div
        class="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-400/10"
      ></div>

      <header class="pointer-events-none fixed left-0 right-0 top-0 z-50">
        <nav class="pointer-events-auto mx-auto flex max-w-7xl items-center justify-center px-6 py-5 lg:px-10">
          <div
            class="intro-from-top hidden items-center gap-3 md:flex"
            style="animation-delay: 0.1s;"
          >
            <button
              type="button"
              class="group relative overflow-hidden rounded-[1.25rem] border border-sky-400/25 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/50"
              (click)="scrollTo('about')"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-sky-500/35 via-cyan-400/35 to-sky-500/25"></span>
              <span class="absolute inset-[1px] rounded-[calc(1.25rem-1px)] bg-slate-900/85"></span>
              <span class="relative flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.65)]"></span>
                About
              </span>
            </button>
            <button
              type="button"
              class="group relative overflow-hidden rounded-[1.25rem] border border-cyan-400/25 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/50"
              (click)="scrollTo('skills')"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-cyan-500/35 via-sky-500/30 to-blue-500/25"></span>
              <span class="absolute inset-[1px] rounded-[calc(1.25rem-1px)] bg-slate-900/85"></span>
              <span class="relative flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.65)]"></span>
                Skills
              </span>
            </button>
            <button
              type="button"
              class="group relative overflow-hidden rounded-[1.25rem] border border-emerald-400/25 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/50"
              (click)="scrollTo('projects')"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-emerald-500/35 via-teal-400/30 to-sky-500/22"></span>
              <span class="absolute inset-[1px] rounded-[calc(1.25rem-1px)] bg-slate-900/85"></span>
              <span class="relative flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.65)]"></span>
                Projects
              </span>
            </button>
            <button
              type="button"
              class="group relative overflow-hidden rounded-[1.25rem] border border-violet-400/25 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/50"
              (click)="scrollTo('education')"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-indigo-500/35 via-violet-500/30 to-sky-500/20"></span>
              <span class="absolute inset-[1px] rounded-[calc(1.25rem-1px)] bg-slate-900/85"></span>
              <span class="relative flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.65)]"></span>
                Education
              </span>
            </button>
            <button
              type="button"
              class="group relative overflow-hidden rounded-[1.25rem] border border-slate-300/20 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-slate-200/40"
              (click)="scrollTo('contact')"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-slate-500/35 via-slate-400/25 to-slate-300/15"></span>
              <span class="absolute inset-[1px] rounded-[calc(1.25rem-1px)] bg-slate-900/85"></span>
              <span class="relative flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-slate-300 shadow-[0_0_16px_rgba(226,232,240,0.35)]"></span>
                Contact
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div class="h-[5.75rem]"></div>

      <section id="hero" class="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div class="max-w-3xl">
          <span
            class="intro-from-top inline-flex rounded-full border border-sky-200 bg-white/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 shadow-sm dark:border-sky-900 dark:bg-slate-900/80 dark:text-sky-300"
          >
            DevOps • Cloud • Full Stack
          </span>
          <h1
            class="intro-from-left mt-8 font-heading text-5xl font-semibold leading-[0.94] text-slate-950 dark:text-white md:text-7xl xl:text-[6rem]"
            style="animation-delay: 0.12s;"
          >
            {{ content().hero.name }}
          </h1>
          <p
            class="intro-from-left mt-6 max-w-2xl text-xl leading-8 text-slate-600 dark:text-slate-300 md:text-[2rem] md:leading-[2.5rem]"
            style="animation-delay: 0.22s;"
          >
            {{ content().hero.tagline }}
          </p>
          <p
            class="intro-from-bottom mt-5 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400 md:text-lg"
            style="animation-delay: 0.34s;"
          >
            {{ content().hero.intro }}
          </p>

          <div class="intro-from-bottom mt-12 flex flex-wrap gap-4" style="animation-delay: 0.46s;">
            <button
              type="button"
              class="rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300"
              (click)="scrollTo('projects')"
            >
              View Projects
            </button>
            <a
              class="rounded-full border border-slate-200 bg-white/80 px-8 py-4 text-base font-semibold text-slate-900 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:border-sky-400"
              [href]="content().hero.cvUrl"
              download
            >
              Download CV
            </a>
            <a
              *ngFor="let link of content().hero.links"
              class="rounded-full border border-slate-200 bg-white/80 px-8 py-4 text-base font-semibold text-slate-900 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:hover:border-sky-400"
              [href]="link.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="relative flex justify-center intro-from-right" style="animation-delay: 0.28s;">
          <div class="absolute inset-0 animate-drift rounded-full bg-gradient-to-br from-sky-500/10 to-emerald-400/10 blur-3xl"></div>
          <div class="relative flex h-[30rem] w-[30rem] items-center justify-center">
            <div class="absolute inset-6 rounded-full bg-gradient-to-br from-sky-500/16 via-transparent to-emerald-400/14 blur-2xl"></div>
            <div class="absolute inset-8 rounded-full border border-sky-400/25 shadow-[0_0_40px_rgba(56,189,248,0.12)] dark:border-cyan-400/20"></div>
            <div
              class="relative h-[24rem] w-[24rem] overflow-hidden rounded-full border border-sky-200/70 bg-white/85 p-4 shadow-soft backdrop-blur-xl dark:border-sky-400/35 dark:bg-slate-900/80"
            >
              <div class="h-full w-full overflow-hidden rounded-full bg-slate-950 dark:bg-slate-900">
                <img
                  [ngSrc]="content().hero.profileImage"
                  width="480"
                  height="540"
                  priority
                  alt="Portrait of Harsh Raj"
                  class="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div appRevealOnScroll class="reveal-on-scroll">
          <app-section-header
            title="About"
          />
        </div>

        <div class="mt-12 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <article
            appRevealOnScroll
            class="reveal-on-scroll relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900/85"
          >
            <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/18 blur-3xl dark:bg-sky-500/16"></div>
            <div class="pointer-events-none absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-emerald-400/14 blur-3xl dark:bg-emerald-500/14"></div>
            <div class="pointer-events-none absolute inset-y-8 right-8 w-px bg-gradient-to-b from-transparent via-sky-300/35 to-transparent dark:via-sky-500/20"></div>

            <div class="relative z-10">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
                  Snapshot
                </span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.65)]"></span>
              </div>

              <h3 class="mt-6 max-w-xl font-heading text-4xl font-semibold leading-tight text-slate-950 dark:text-white">
                Cloud systems, deployment workflows, and full stack product delivery.
              </h3>
              <p class="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                I build cloud-ready applications, automate release pipelines, and turn backend and frontend ideas into practical products.
              </p>

              <div class="mt-8 flex flex-wrap gap-3">
                <span
                  *ngFor="let item of aboutHighlights"
                  class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                >
                  {{ item }}
                </span>
              </div>

              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                <div
                  *ngFor="let item of aboutStats"
                  class="rounded-[1.35rem] border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-950/55"
                >
                  <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    {{ item.label }}
                  </p>
                  <p class="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </article>

          <div class="grid gap-4">
            <article
              *ngFor="let card of content().aboutCards; let i = index"
              appRevealOnScroll
              class="reveal-on-scroll group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/82 p-6 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900/82 dark:hover:border-sky-500/50"
            >
              <div
                class="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full blur-3xl opacity-25"
                [style.background]="aboutAccent(i)"
              ></div>

              <div class="relative z-10 flex items-start justify-between gap-4">
                <div
                  class="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg transition group-hover:scale-105"
                  [style.background]="aboutAccent(i)"
                >
                  {{ aboutIcon(card.icon) }}
                </div>
                <div class="flex gap-1.5 pt-2">
                  <span
                    *ngFor="let dot of [0, 1, 2]"
                    class="h-2 w-2 rounded-full"
                    [style.background]="aboutAccent(i)"
                    [style.opacity]="dot === 1 ? 0.95 : 0.35"
                  ></span>
                </div>
              </div>

              <h3 class="mt-5 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{{ card.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ card.description }}</p>

              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  *ngFor="let chip of aboutCardTags(card.title)"
                  class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  {{ chip }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="skills" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div appRevealOnScroll class="reveal-on-scroll flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <app-section-header
            title="Skills"
          />

          <div class="flex flex-wrap gap-3 self-start">
            <span
              *ngFor="let group of skillGroups()"
              class="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
            >
              {{ group.label }}
            </span>
          </div>
        </div>

        <div class="mt-10 grid gap-5 xl:grid-cols-[1.55fr_0.45fr]">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <article
              *ngFor="let skill of skills()"
              appRevealOnScroll
            class="reveal-on-scroll relative overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white/85 p-4 shadow-soft transition hover:-translate-y-1 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-sky-500/50"
            >
              <div
                class="pointer-events-none absolute -right-8 top-0 h-20 w-20 rounded-full blur-2xl opacity-20"
                [style.background]="skill.accent"
              ></div>
              <div class="flex items-center justify-between gap-4">
                <div
                  class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/95 p-2 shadow-lg dark:border-slate-700 dark:bg-slate-950/90"
                >
                  <img
                    [src]="skillLogoUrl(skill)"
                    [alt]="skill.name + ' logo'"
                    class="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <span
                  class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                >
                  {{ skill.category }}
                </span>
              </div>

              <div class="mt-5 flex items-end justify-between gap-4">
                <div>
                  <h3 class="text-base font-semibold text-slate-950 dark:text-white">{{ skill.name }}</h3>
                  <p class="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    {{ skill.category }}
                  </p>
                </div>
                <span
                  class="h-2.5 w-10 rounded-full"
                  [style.background]="skill.accent"
                  [style.boxShadow]="'0 0 20px ' + skill.accent + '55'"
                ></span>
              </div>
            </article>
          </div>

          <div class="space-y-4">
            <div
              appRevealOnScroll
              class="reveal-on-scroll rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-slate-400">Skill Groups</p>
              <h3 class="mt-2 font-heading text-xl font-semibold text-slate-950 dark:text-white">Current Focus</h3>
              <div class="mt-6 space-y-4">
                <div *ngFor="let group of skillGroups()" class="rounded-[1.1rem] bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div class="flex items-center justify-between gap-4">
                    <h4 class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                      {{ group.label }}
                    </h4>
                    <span class="h-2.5 w-2.5 rounded-full" [style.background]="group.accent"></span>
                  </div>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      *ngFor="let item of group.items"
                      class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      {{ item }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            @defer (on viewport) {
              <div
                appRevealOnScroll
                class="reveal-on-scroll rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.22em] text-slate-400">GitHub Activity</p>
                    <h3 class="mt-2 font-heading text-xl font-semibold text-slate-950 dark:text-white">Contribution Graph</h3>
                  </div>
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    Widget
                  </span>
                </div>

                <div class="mt-6 grid grid-cols-7 gap-2">
                  <ng-container *ngFor="let row of content().contributionGraph">
                    <div
                      *ngFor="let cell of row"
                      class="aspect-square rounded-md"
                      [ngClass]="contributionCellClass(cell)"
                    ></div>
                  </ng-container>
                </div>
              </div>
            } @placeholder {
              <div class="h-72 rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 dark:border-slate-700 dark:bg-slate-900/40"></div>
            }
          </div>
        </div>
      </section>

      <section id="projects" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div appRevealOnScroll class="reveal-on-scroll flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <app-section-header
            title="Projects"
          />

          <div class="flex flex-wrap gap-3">
            <button
              *ngFor="let filter of projectFilters()"
              type="button"
              class="rounded-full border px-4 py-2 text-sm font-semibold transition"
              [ngClass]="
                selectedFilter() === filter
                  ? 'border-sky-500 bg-sky-500 text-white'
                  : 'border-slate-200 bg-white/80 text-slate-600 hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300'
              "
              (click)="selectedFilter.set(filter)"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <div class="mt-12 grid gap-8">
          <article
            *ngFor="let project of filteredProjects()"
            appRevealOnScroll
            class="reveal-on-scroll overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-soft dark:border-slate-800 dark:bg-slate-900/85 lg:grid lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div class="relative min-h-[22rem] overflow-hidden border-b border-slate-200 bg-slate-950 lg:border-b-0 lg:border-r dark:border-slate-800">
              <img
                [ngSrc]="project.previewImage"
                width="900"
                height="620"
                [alt]="project.title + ' preview'"
                class="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-slate-950/65 via-transparent to-sky-500/20"></div>
            </div>

            <div class="flex flex-col justify-between p-8 lg:p-10">
              <div>
                <div class="flex flex-wrap items-center gap-3">
                  <span class="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                    {{ project.metric.label }}
                  </span>
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {{ project.metric.value }}
                  </span>
                </div>

                <h3 class="mt-6 font-heading text-3xl font-semibold text-slate-950 dark:text-white">
                  {{ project.title }}
                </h3>
                <p class="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{{ project.summary }}</p>

                <div class="mt-6 flex flex-wrap gap-3">
                  <span
                    *ngFor="let tech of project.techStack"
                    class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {{ tech }}
                  </span>
                </div>

                <ul class="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <li *ngFor="let highlight of project.highlights" class="flex items-start gap-3">
                    <span class="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"></span>
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>

              <div class="mt-10 flex flex-wrap gap-4">
                <a
                  class="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-sky-600 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300"
                  [routerLink]="['/project', project.slug]"
                >
                  View Case Study
                </a>
                <a
                  *ngIf="project.liveUrl"
                  class="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-1 hover:border-emerald-400 hover:text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Site
                </a>
                <button
                  *ngIf="project.demoUrl"
                  type="button"
                  class="rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-700 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300"
                  (click)="openDemo(project)"
                >
                  {{ project.demoLabel || 'Watch Demo' }}
                </button>
                <a
                  *ngIf="project.githubUrl"
                  class="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-slate-950 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
                  [href]="project.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div *ngIf="activeDemoProject() as demo" class="project-demo-modal" (click)="closeDemo()">
        <div class="project-demo-modal__backdrop"></div>
        <div class="project-demo-modal__panel" (click)="$event.stopPropagation()">
          <button type="button" class="project-demo-modal__close" (click)="closeDemo()">×</button>
          <div class="project-demo-modal__media">
            <img
              [ngSrc]="demo.previewImage"
              width="1200"
              height="760"
              [alt]="demo.title + ' demo preview'"
              class="project-demo-modal__image"
            />
            <div class="project-demo-modal__overlay">
              <span class="project-demo-modal__pill">Demo Preview</span>
              <h3>{{ demo.title }}</h3>
              <p>LinkedIn blocks direct embedded playback here, so the demo opens externally from this preview.</p>
            </div>
          </div>

          <div class="project-demo-modal__actions">
            <a
              class="project-demo-modal__primary"
              [href]="demo.demoUrl"
              target="_blank"
              rel="noreferrer"
            >
              Open Demo on LinkedIn
            </a>
            <button type="button" class="project-demo-modal__secondary" (click)="closeDemo()">
              Close
            </button>
          </div>
        </div>
      </div>

      <section id="education" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div appRevealOnScroll class="reveal-on-scroll">
          <app-section-header
            title="Education"
          />
        </div>

        <div class="education-timeline mt-12">
          <div class="education-timeline__line"></div>
          <div class="education-timeline__grid">
            <article
              *ngFor="let item of education()"
              appRevealOnScroll
              class="education-timeline__item reveal-on-scroll"
            >
              <span class="education-timeline__dot"></span>
              <div class="h-full rounded-[1.5rem] border border-slate-200 bg-white/85 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">{{ item.period }}</p>
                <h3 class="mt-3 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{{ item.institution }}</h3>
                <p class="mt-2 text-base text-slate-600 dark:text-slate-300">{{ item.program }}</p>
                <div class="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span class="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/80">{{ item.scoreLabel }}: {{ item.scoreValue }}</span>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="certifications" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div appRevealOnScroll class="reveal-on-scroll">
          <app-section-header
            title="Certificates"
          />
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <article
            *ngFor="let certificate of certificates()"
            appRevealOnScroll
            class="reveal-on-scroll rounded-[1.75rem] border border-slate-200 bg-white/85 p-6 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <a
              *ngIf="certificate.previewImage"
              [href]="certificate.credentialUrl"
              target="_blank"
              rel="noreferrer"
              class="block overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            >
              <img
                [ngSrc]="certificate.previewImage"
                width="960"
                height="640"
                [alt]="certificate.title + ' certificate preview'"
                class="h-44 w-full object-cover transition duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </a>

            <div class="flex items-start justify-between gap-4">
              <img
                [ngSrc]="certificate.logo"
                width="72"
                height="72"
                [alt]="certificate.issuer + ' logo'"
                class="h-14 w-14 rounded-2xl object-contain"
                loading="lazy"
              />
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                {{ certificate.issuer }}
              </span>
            </div>
            <h3 class="mt-6 font-heading text-2xl font-semibold text-slate-950 dark:text-white">{{ certificate.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ certificate.issuer }}</p>
            <a
              class="mt-8 inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
              [href]="certificate.credentialUrl"
              target="_blank"
              rel="noreferrer"
            >
              View certificate
            </a>
          </article>
        </div>
      </section>

      <section id="contact" appRevealOnScroll class="section-shell reveal-on-scroll mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
        <div
          appRevealOnScroll
          class="contact-shell reveal-on-scroll rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 to-sky-700 p-10 text-white shadow-soft dark:border-slate-800"
        >
          <div class="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div class="contact-form-shell flex h-full flex-col rounded-[1.75rem] border border-white/12 bg-slate-950/35 p-6 backdrop-blur md:p-8">
              <h2 class="font-heading text-4xl font-semibold md:text-5xl">Contact</h2>
              <form
                class="mt-8 flex flex-1 flex-col space-y-5"
                action="mailto:nameharshraj@gmail.com"
                method="post"
                enctype="text/plain"
              >
                <div>
                  <label class="mb-3 block text-xl font-medium text-white" for="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    class="w-full rounded-[1rem] border border-white/10 bg-slate-950/30 px-6 py-5 text-lg text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400"
                  />
                </div>

                <div>
                  <label class="mb-3 block text-xl font-medium text-white" for="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    class="w-full rounded-[1rem] border border-white/10 bg-slate-950/30 px-6 py-5 text-lg text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400"
                  />
                </div>

                <div>
                  <label class="mb-3 block text-xl font-medium text-white" for="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Your message"
                    class="w-full rounded-[1rem] border border-white/10 bg-slate-950/30 px-6 py-5 text-lg text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="mt-auto self-start rounded-[1rem] bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-1 hover:from-violet-400 hover:to-fuchsia-400"
                >
                  Send message
                </button>
              </form>
            </div>

            <div class="contact-links-shell flex h-full flex-col rounded-[1.75rem] border border-white/12 bg-slate-950/35 p-6 backdrop-blur md:p-8">
              <h3 class="font-heading text-3xl font-semibold md:text-4xl">Connect</h3>
              <div class="mt-8 grid flex-1 gap-4 content-start">
              <a
                *ngFor="let link of content().contactLinks"
                [href]="contactHref(link)"
                [attr.target]="contactTarget(link)"
                rel="noreferrer"
                class="contact-link-card group flex items-center justify-between rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                <span class="flex items-center gap-3">
                  <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-lg">
                    {{ contactIcon(link.label) }}
                  </span>
                  <span class="text-sm font-semibold uppercase tracking-[0.18em]">{{ link.label }}</span>
                </span>
                <span class="text-sm text-sky-100 transition group-hover:translate-x-1">
                  {{ link.label === 'Email' ? 'Compose' : link.label === 'Phone' ? 'Call' : 'Open' }}
                </span>
              </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="portfolio-chat">
        <div *ngIf="chatOpen()" class="portfolio-chat__panel">
          <div class="portfolio-chat__header">
            <div>
              <p class="portfolio-chat__eyebrow">Portfolio AI</p>
              <h3 class="portfolio-chat__title">Ask about Harsh Raj</h3>
            </div>
            <button type="button" class="portfolio-chat__close" (click)="chatOpen.set(false)">×</button>
          </div>

          <div class="portfolio-chat__messages">
            <div
              *ngFor="let message of chatMessages()"
              class="portfolio-chat__message"
              [ngClass]="message.role === 'user' ? 'portfolio-chat__message--user' : 'portfolio-chat__message--assistant'"
            >
              {{ message.text }}
            </div>
          </div>

          <form class="portfolio-chat__composer" (submit)="$event.preventDefault(); sendChatMessage(chatInput.value); chatInput.value = ''">
            <input
              #chatInput
              type="text"
              placeholder="Ask about projects, skills, certificates..."
              class="portfolio-chat__input"
            />
            <button type="submit" class="portfolio-chat__send">Send</button>
          </form>
        </div>

        <button type="button" class="portfolio-chat__toggle" (click)="toggleChat()">
          <span class="portfolio-chat__toggle-dot"></span>
          <span class="portfolio-chat__toggle-copy">
            <strong>{{ chatOpen() ? 'Close Copilot' : 'Portfolio Copilot' }}</strong>
            <small>{{ chatOpen() ? 'Hide assistant' : 'Ask about Harsh Raj' }}</small>
          </span>
        </button>
      </div>
    </div>
  `
})
export class HomePageComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly portfolioApi = inject(PortfolioApiService);
  private readonly scrollService = inject(ScrollService);
  private readonly introSeenStorageKey = 'harsh-raj-portfolio-intro-seen';
  private introExitTimer?: ReturnType<typeof setTimeout>;
  private introHideTimer?: ReturnType<typeof setTimeout>;

  readonly content = signal(portfolioContent);
  readonly projects = signal<Project[]>([]);
  readonly skills = signal<Skill[]>([]);
  readonly education = signal<EducationEntry[]>([]);
  readonly certificates = signal<Certificate[]>([]);
  readonly selectedFilter = signal('All');
  readonly showLandingIntro = signal(!this.hasSeenIntro());
  readonly introClosing = signal(false);
  readonly heroMotionReady = signal(this.hasSeenIntro());
  readonly chatOpen = signal(false);
  readonly activeDemoProject = signal<Project | null>(null);
  readonly chatMessages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Ask me about Harsh Raj, his projects, skills, education, certificates, or contact details.'
    }
  ]);
  readonly aboutHighlights = ['DevOps', 'Cloud', 'Full Stack', 'Automation'];
  readonly aboutStats = [
    { label: 'Focus', value: 'Cloud + CI/CD' },
    { label: 'Build', value: 'Full Stack Apps' },
    { label: 'Strength', value: 'Problem Solving' }
  ];

  readonly projectFilters = computed(() => [
    'All',
    ...new Set(this.projects().flatMap((project) => project.techStack))
  ]);

  readonly filteredProjects = computed(() => {
    if (this.selectedFilter() === 'All') {
      return [...this.projects()].sort((a, b) => a.order - b.order);
    }

    return this.projects()
      .filter((project) => project.techStack.includes(this.selectedFilter()))
      .sort((a, b) => a.order - b.order);
  });

  readonly skillGroups = computed(() => {
    const groupOrder = ['Languages', 'Frameworks', 'DevOps Tools'];

    return groupOrder
      .map((label, index) => {
        const items = this.skills()
          .filter((skill) => skill.category === label)
          .map((skill) => skill.name);

        return {
          label,
          items,
          accent: ['#3B82F6', '#22C55E', '#0F172A'][index] ?? '#3B82F6'
        };
      })
      .filter((group) => group.items.length);
  });

  constructor() {
    if (this.showLandingIntro()) {
      this.introExitTimer = setTimeout(() => {
        this.markIntroSeen();
        this.introClosing.set(true);
        this.heroMotionReady.set(true);
      }, 2400);

      this.introHideTimer = setTimeout(() => {
        this.showLandingIntro.set(false);
      }, 3600);
    }

    this.destroyRef.onDestroy(() => {
      if (this.introExitTimer) {
        clearTimeout(this.introExitTimer);
      }

      if (this.introHideTimer) {
        clearTimeout(this.introHideTimer);
      }
    });

    this.portfolioApi
      .loadPortfolioSnapshot()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((snapshot) => {
        this.content.set(snapshot.content);
        this.projects.set(snapshot.projects);
        this.skills.set(snapshot.skills);
        this.education.set(snapshot.education);
        this.certificates.set(snapshot.certificates);
      });
  }

  private hasSeenIntro() {
    return typeof window !== 'undefined' && window.sessionStorage.getItem(this.introSeenStorageKey) === 'true';
  }

  private markIntroSeen() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(this.introSeenStorageKey, 'true');
    }
  }

  scrollTo(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  toggleChat() {
    this.chatOpen.update((value) => !value);
  }

  openDemo(project: Project) {
    this.activeDemoProject.set(project);
  }

  closeDemo() {
    this.activeDemoProject.set(null);
  }

  aboutIcon(type: string) {
    const icons: Record<string, string> = {
      cloud: '☁',
      code: '</>',
      brain: '◉'
    };

    return icons[type] ?? '•';
  }

  aboutAccent(index: number) {
    return ['linear-gradient(135deg, #38BDF8, #3B82F6)', 'linear-gradient(135deg, #34D399, #22C55E)', 'linear-gradient(135deg, #A78BFA, #6366F1)'][index] ?? 'linear-gradient(135deg, #38BDF8, #3B82F6)';
  }

  aboutCardTags(title: string) {
    const tags: Record<string, string[]> = {
      'Cloud & DevOps': ['CI/CD', 'IaC', 'Automation'],
      'Full Stack Development': ['Frontend', 'Backend', 'APIs'],
      'Problem Solver': ['DSA', 'Systems', 'Logic']
    };

    return tags[title] ?? ['Build', 'Ship', 'Scale'];
  }

  contactIcon(label: string) {
    const icons: Record<string, string> = {
      GitHub: '{}',
      LinkedIn: 'in',
      Email: '@',
      Phone: '☎'
    };

    return icons[label] ?? '•';
  }

  contactHref(link: { label: string; href: string }) {
    if (link.label === 'Email') {
      return 'https://mail.google.com/mail/?view=cm&fs=1&to=nameharshraj@gmail.com';
    }

    return link.href;
  }

  contactTarget(link: { label: string }) {
    return link.label === 'Phone' ? null : '_blank';
  }

  skillLogoUrl(skill: Skill) {
    const logo = SKILL_LOGO_MAP[skill.iconKey];

    if (!logo) {
      return `https://cdn.simpleicons.org/code/${skill.accent.replace('#', '')}`;
    }

    return `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`;
  }

  contributionCellClass(value: number) {
    const classes = [
      'bg-slate-100 dark:bg-slate-800',
      'bg-sky-100 dark:bg-sky-950/80',
      'bg-sky-200 dark:bg-sky-900/70',
      'bg-sky-400 dark:bg-sky-700/80',
      'bg-emerald-400 dark:bg-emerald-500/70'
    ];

    return classes[value] ?? classes[0];
  }

  sendChatMessage(rawValue: string) {
    const question = rawValue.trim();

    if (!question) {
      return;
    }

    this.chatMessages.update((messages) => [...messages, { role: 'user', text: question }]);

    const reply = this.buildChatReply(question);
    this.chatMessages.update((messages) => [...messages, { role: 'assistant', text: reply }]);
    this.chatOpen.set(true);
  }

  private buildChatReply(question: string) {
    const query = question.toLowerCase();
    const normalizedQuery = this.normalizeQuery(question);
    const projects = this.projects().length ? this.projects() : fallbackProjects;
    const skills = this.skills().length ? this.skills() : fallbackSkills;
    const education = this.education().length ? this.education() : fallbackEducation;
    const certificates = this.certificates().length ? this.certificates() : fallbackCertificates;

    if (/(hi|hello|hey|hii)\b/.test(query)) {
      return `${this.content().hero.name} is a ${this.content().hero.tagline}. Ask about projects, skills, education, certificates, or contact details.`;
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('linkedin') || query.includes('github')) {
      return `You can reach Harsh Raj at nameharshraj@gmail.com or +91 7992336832. GitHub: https://github.com/harsh-raj04 and LinkedIn: https://www.linkedin.com/in/harshraj04/.`;
    }

    if (query.includes('certificate') || query.includes('certification')) {
      return `Certificates: ${certificates.map((item) => `${item.title} (${item.issuer})`).join(', ')}.`;
    }

    if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('school')) {
      return education
        .map((item) => `${item.period}: ${item.institution}, ${item.program}, ${item.scoreLabel} ${item.scoreValue}`)
        .join(' | ');
    }

    if (query.includes('skill') || query.includes('tech stack') || query.includes('technology')) {
      const grouped = ['Languages', 'Frameworks', 'DevOps Tools']
        .map((category) => {
          const items = skills.filter((skill) => skill.category === category).map((skill) => skill.name);
          return `${category}: ${items.join(', ')}`;
        })
        .join(' | ');

      return grouped;
    }

    if (
      normalizedQuery === 'project' ||
      normalizedQuery === 'projects' ||
      normalizedQuery.includes('all projects') ||
      normalizedQuery.includes('list projects') ||
      normalizedQuery.includes('show projects') ||
      normalizedQuery.includes('about project') ||
      normalizedQuery.includes('tell me about project')
    ) {
      return `Projects: ${projects.map((project) => project.title).join(', ')}.`;
    }

    const matchedProject = projects.find((project) => this.matchesProjectQuery(normalizedQuery, project));

    if (matchedProject) {
      return `${matchedProject.title}: ${matchedProject.summary} Tech stack: ${matchedProject.techStack.join(', ')}. Highlights: ${matchedProject.highlights.join(', ')}.`;
    }

    if (query.includes('about') || query.includes('who is harsh') || query.includes('who are you')) {
      return `${this.content().hero.name} is a ${this.content().hero.tagline}. ${this.content().hero.intro}`;
    }

    const matchedSkill = skills.find((skill) => this.matchesSkillQuery(query, skill));

    if (matchedSkill) {
      return `${matchedSkill.name} is part of the ${matchedSkill.category} stack in this portfolio.`;
    }

    return 'I can help with projects, skills, education, certificates, or contact details. Try asking: "Tell me about AI Task Manager" or "What certificates does Harsh Raj have?"';
  }

  private normalizeQuery(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9+]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private matchesProjectQuery(normalizedQuery: string, project: Project) {
    const projectTerms = [
      project.title,
      project.slug.replace(/-/g, ' '),
      ...project.categories,
      ...project.techStack,
      ...project.highlights
    ].map((value) => this.normalizeQuery(value));

    return projectTerms.some((term) => term && normalizedQuery.includes(term));
  }

  private matchesSkillQuery(query: string, skill: Skill) {
    const lowerName = skill.name.toLowerCase();

    if (skill.name === 'C') {
      return /\bc\b/.test(query);
    }

    if (skill.name === 'C++') {
      return /c\+\+/.test(query);
    }

    if (skill.name === 'Node.js') {
      return /\bnode(?:\.js)?\b/.test(query);
    }

    if (skill.name === 'JavaScript') {
      return /\bjavascript\b|\bjs\b/.test(query);
    }

    if (skill.name === 'Shell scripting') {
      return /\bshell scripting\b|\bbash\b|\bshell\b/.test(query);
    }

    return query.includes(lowerName);
  }
}
