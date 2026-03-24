import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  fallbackCertificates,
  fallbackEducation,
  fallbackProjects,
  fallbackSkills,
  portfolioContent
} from '../data/portfolio-fallback';
import {
  Certificate,
  EducationEntry,
  PortfolioContent,
  Project,
  Skill
} from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  loadPortfolioSnapshot() {
    return forkJoin({
      projects: this.http
        .get<Project[]>(`${this.apiBaseUrl}/projects`)
        .pipe(catchError(() => of(fallbackProjects))),
      skills: this.http
        .get<Skill[]>(`${this.apiBaseUrl}/skills`)
        .pipe(catchError(() => of(fallbackSkills))),
      education: this.http
        .get<EducationEntry[]>(`${this.apiBaseUrl}/education`)
        .pipe(catchError(() => of(fallbackEducation))),
      certificates: this.http
        .get<Certificate[]>(`${this.apiBaseUrl}/certificates`)
        .pipe(catchError(() => of(fallbackCertificates))),
      content: of<PortfolioContent>(portfolioContent)
    });
  }

  loadProjectBySlug(slug: string) {
    return this.http
      .get<Project>(`${this.apiBaseUrl}/projects/${slug}`)
      .pipe(catchError(() => of(fallbackProjects.find((project) => project.slug === slug) ?? null)));
  }
}

