import {prisma} from '../src/config/database';
import {terms, categories, teachers, disciplines, teachersDisciplines} from './fakeData';
async function main() {

    await prisma.$executeRaw`TRUNCATE TABLE *`;

    for(let term of terms) {
        await prisma.terms.create({
            data: term
        })
    }

    for(let category of categories) {
        await prisma.categories.create({
            data: category
        })
    }

    for(let teacher of teachers) {
        await prisma.teachers.create({
            data: teacher
        })
    }

    for(let discipline of disciplines) {
        await prisma.disciplines.create({
            data: discipline
        })
    }

    for(let teachersDiscipline of teachersDisciplines) {
        await prisma.teachersDisciplines.create({
            data: teachersDiscipline
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});