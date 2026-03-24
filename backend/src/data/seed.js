import { connectDatabase } from '../db/mongoose.js';
import { certificates, education, projects, skills } from './seed-data.js';
import { Certificate } from '../models/certificate.model.js';
import { Education } from '../models/education.model.js';
import { Project } from '../models/project.model.js';
import { Skill } from '../models/skill.model.js';

async function upsertByKey(Model, key, records) {
  await Promise.all(
    records.map((record) =>
      Model.updateOne({ [key]: record[key] }, { $set: record }, { upsert: true })
    )
  );
}

async function seed() {
  await connectDatabase();

  await upsertByKey(Project, 'slug', projects);
  await upsertByKey(Skill, 'name', skills);
  await upsertByKey(Education, 'institution', education);
  await upsertByKey(Certificate, 'title', certificates);

  console.log('Portfolio seed completed');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Portfolio seed failed', error);
  process.exit(1);
});

