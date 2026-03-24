import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    iconKey: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    accent: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model('Skill', skillSchema);

