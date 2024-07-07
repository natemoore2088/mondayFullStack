import mongoose, { Schema, Document } from 'mongoose';

export interface IFragrance extends Document {
    name: string;
    description: string;
    category: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
}

const fragranceSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image_url: { type: String, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model<IFragrance>('Fragrance', fragranceSchema);