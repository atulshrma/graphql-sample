import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const TEST_DATA = [
    {
        name: 'The Lord of the Rings: The Return of the King',
        image: 'http://lorempixel.com/640/480',
        description:
            'Nihil hic neque dignissimos totam omnis ut aut. Fugiat voluptatem rem quisquam provident est odit. Necessitatibus veniam architecto quia. Rerum deserunt reiciendis velit voluptatem tempora iusto similique. Atque mollitia pariatur quia voluptatem qui laborum laborum rerum molestias.',
        dateLastEdited: '2018-08-06T08:27:26.187Z',
    },
    {
        name: 'District Solutions Orchestrator',
        image: 'http://lorempixel.com/640/480',
        description:
            'Laboriosam occaecati modi sit voluptatem. Quis harum rerum similique at. The Lion King. Et porro eum quia eligendi doloribus aut. Tenetur provident maxime quod illum vitae excepturi. Nemo ipsum non.',
        dateLastEdited: '2018-10-03T18:56:53.492Z',
    },
    {
        name: 'Human Web Agent',
        image: 'http://lorempixel.com/640/480',
        description:
            'Vitae dolor natus aut aut. Totam dolor porro. Rem est repellendus voluptas eos soluta. The Lord of the Rings: The Return of the King',
        dateLastEdited: '2018-04-16T09:57:36.659Z',
    },
    {
        name: 'The Lion King',
        image: 'http://lorempixel.com/640/480',
        description:
            'Fugiat praesentium aspernatur accusantium praesentium blanditiis modi. Ipsam dignissimos odio eum aut fugit aliquam error facilis explicabo. Voluptatum eaque ullam voluptate hic dolorem dolores ab quod. Incidunt consequatur nam et voluptatem reprehenderit quibusdam hic aut. Architecto voluptas numquam est natus quis. Reprehenderit eaque voluptas voluptas nihil cupiditate.',
        dateLastEdited: '2017-12-28T04:21:00.923Z',
    },
    {
        name: 'Future Functionality Officer',
        image: 'http://lorempixel.com/640/480',
        description:
            'Magni ut eius impedit suscipit. Facere autem accusantium. Eligendi molestiae quibusdam eaque aliquid hic debitis. Iusto dolorem laudantium velit eveniet quia repudiandae omnis.',
        dateLastEdited: '2017-12-10T07:12:57.891Z',
    },
];

export const mochaHooks = {
    beforeAll(done) {
        mongoose
            .connect(process.env.MONGODB_TEST_URL)
            .then(() => {
                console.log('MongoDB connected...');

                // Delete all existing test documents
                mongoose.connection.collections.jobs.drop(() => {
                    mongoose.connection.collections.jobs.insertMany(
                        TEST_DATA,
                        () => {
                            mongoose.connection.collections.jobs.createIndex(
                                {
                                    name: 'text',
                                    description: 'text',
                                },
                                () => {
                                    console.log(`Data successfully added.`);
                                    return done();
                                },
                            );
                        },
                    );
                });
            })
            .catch((err) => {
                console.log('An error occured: ', err);
                return this.skip();
            });
    },
};
