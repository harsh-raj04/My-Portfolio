import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    period: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    scoreLabel: { type: String, required: true, trim: true },
    scoreValue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    order: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

educationSchema.index({ order: 1 });

export const Education = mongoose.model('Education', educationSchema);

