import {faker} from '@faker-js/faker';

export default async function testFactory() {
    return {
        name: faker.lorem.word(2),
        pdfUrl: faker.internet.url(),
        categoryId: faker.datatype.number({'min': 1, 'max': 3}),
        teacherDisciplineId: faker.datatype.number({'min': 1, 'max': 6}),
    }
}