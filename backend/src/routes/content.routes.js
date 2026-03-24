import { Router } from 'express';
import {
  getCertificates,
  getEducation,
  getProjectBySlug,
  getProjects,
  getSkills
} from '../controllers/content.controller.js';

export const contentRouter = Router();

contentRouter.get('/projects', getProjects);
contentRouter.get('/projects/:slug', getProjectBySlug);
contentRouter.get('/skills', getSkills);
contentRouter.get('/education', getEducation);
contentRouter.get('/certificates', getCertificates);

