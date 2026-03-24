import test from 'node:test';
import assert from 'node:assert/strict';
import { contentRouter } from './routes/content.routes.js';
import { certificates, education, projects, skills } from './data/seed-data.js';

test('content router exposes the required portfolio endpoints', () => {
  const paths = contentRouter.stack
    .map((layer) => layer.route?.path)
    .filter(Boolean);

  assert.deepEqual(paths, [
    '/projects',
    '/projects/:slug',
    '/skills',
    '/education',
    '/certificates'
  ]);
});

test('seed data covers every required collection with portfolio content', () => {
  assert.equal(projects.length, 4);
  assert.equal(skills.length, 19);
  assert.equal(education.length, 3);
  assert.equal(certificates.length, 3);
});
