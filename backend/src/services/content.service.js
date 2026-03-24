import { Certificate } from '../models/certificate.model.js';
import { Education } from '../models/education.model.js';
import { Project } from '../models/project.model.js';
import { Skill } from '../models/skill.model.js';

export function listProjects() {
  return Project.find().sort({ order: 1 }).lean();
}

export function listSkills() {
  return Skill.find().sort({ category: 1, order: 1 }).lean();
}

export function listEducation() {
  return Education.find().sort({ order: 1 }).lean();
}

export function listCertificates() {
  return Certificate.find().sort({ order: 1 }).lean();
}

export function findProjectBySlug(slug) {
  return Project.findOne({ slug }).lean();
}

