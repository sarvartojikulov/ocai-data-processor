import { CATEGORIES, DIMENSIONS } from "./constants";

export type QuestionInfo = {
    questionId: number;
    dimension: keyof typeof DIMENSIONS | string;
    category: keyof typeof CATEGORIES | string;
    umkehr: boolean;
};

export type UserBIPResult = { category: string; score: number; sum: number};
