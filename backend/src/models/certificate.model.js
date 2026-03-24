import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    previewImage: { type: String, required: true },
    credentialUrl: { type: String, required: true },
    order: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

certificateSchema.index({ order: 1 });

export const Certificate = mongoose.model('Certificate', certificateSchema);
