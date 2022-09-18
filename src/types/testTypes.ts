import { Tests } from "@prisma/client";

export type ITestData = Omit<Tests, 'id'>;
export type UniqueTest = {
    testId: number,
    testName: string,
    pdfUrl: string,
    termNumber: number,
    disciplineName: string,
    teacherName: string,
    categoryName: string
}