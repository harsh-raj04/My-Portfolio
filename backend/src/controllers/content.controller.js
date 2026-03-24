import {
  findProjectBySlug,
  listCertificates,
  listEducation,
  listProjects,
  listSkills
} from '../services/content.service.js';

function setCacheHeaders(response) {
  response.set({
    'Cache-Control': 'public, max-age=300',
    'CDN-Cache-Control': 'public, max-age=600'
  });
}

export async function getProjects(_request, response, next) {
  try {
    setCacheHeaders(response);
    response.json(await listProjects());
  } catch (error) {
    next(error);
  }
}

export async function getProjectBySlug(request, response, next) {
  try {
    const project = await findProjectBySlug(request.params.slug);

    if (!project) {
      response.status(404).json({ message: 'Project not found' });
      return;
    }

    setCacheHeaders(response);
    response.json(project);
  } catch (error) {
    next(error);
  }
}

export async function getSkills(_request, response, next) {
  try {
    setCacheHeaders(response);
    response.json(await listSkills());
  } catch (error) {
    next(error);
  }
}

export async function getEducation(_request, response, next) {
  try {
    setCacheHeaders(response);
    response.json(await listEducation());
  } catch (error) {
    next(error);
  }
}

export async function getCertificates(_request, response, next) {
  try {
    setCacheHeaders(response);
    response.json(await listCertificates());
  } catch (error) {
    next(error);
  }
}

