import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

import Jobs from '../components/jobs/model';

fs.readFile(__dirname + '/mock_data.json', async (err, data) => {
    if (err) {
        console.log('An error occured: ', err);
        process.exit();
    }

    const jobs = await Jobs.insertMany(JSON.parse(data));
    console.log(`Data successfully added: ${jobs.length} jobs added.`);
    process.exit();
});
