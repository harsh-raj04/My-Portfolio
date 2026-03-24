import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['screenshot', 'diagram'], required: true },
    label: { type: String, required: true },
    image: { type: String, required: true }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    metric: {
      label: { type: String, required: true },
      value: { type: String, required: true }
    },
    previewImage: { type: String, required: true },
    architectureImage: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    highlights: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    gallery: [galleryItemSchema],
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, default: '' },
    demoUrl: { type: String, default: '' },
    demoLabel: { type: String, default: '' },
    order: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

projectSchema.index({ order: 1 });

export const Project = mongoose.model('Project', projectSchema);
