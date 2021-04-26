import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const jobsSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    description: String,
    image: String,
    dateLastEdited: Date,
});

jobsSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Jobs', jobsSchema);
