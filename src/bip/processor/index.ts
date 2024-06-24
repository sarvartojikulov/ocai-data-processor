import { SCORING, questions } from "./constants";
import { QuestionInfo, UserBIPResult } from "./types";

const ROW_ITEM_DELIMITER = '","';


export default function processBIP(rows: string[]) {
    const questionsInfoMap = new Map<number, QuestionInfo>();
    questions.forEach((question) => {
        questionsInfoMap.set(question.questionId, question);
    });

    const headline = rows[0].concat(rows[1]);

    const headers = headline.split(ROW_ITEM_DELIMITER);
    const userAnswers = rows.filter((_item, i) => i !== 0 && i !== 1);

    const questionRowIds = headers.map((item, index) => {
        const [questionNumber, _rest] = item.split(".");
        if (questionNumber && Number(questionNumber)) {
            return {
                itemIdxInRow: index,
                questionId: Number(questionNumber),
            };
        } else {
            return undefined;
        }
    });

    const result: Record<string, UserBIPResult[]> = {};

    userAnswers.forEach((userSurvey) => {
        const items = userSurvey.split(ROW_ITEM_DELIMITER);
        const username = items[2];

        const userQuestionAnswers: Record<string, any> = {};
        for (const question of questionRowIds) {
            if (!question) continue;

            let answer = Number(items[question.itemIdxInRow]);
            const questionInfo = questionsInfoMap.get(question.questionId)!;

            if (questionInfo.umkehr) {
                answer = 7 - answer;
            }

            if (userQuestionAnswers[questionInfo.category]) {
                userQuestionAnswers[questionInfo.category] += answer;
            } else {
                userQuestionAnswers[questionInfo.category] = answer;
            }
        }

        const userScores: UserBIPResult[] = [];

        Object.entries(SCORING).forEach(([category, scores]) => {
            const userAnswer = userQuestionAnswers[category];

            for (const [score, range] of Object.entries(scores)) {
                const [min, max] = range;
                if (userAnswer >= min && userAnswer <= max) {
                    userScores.push({
                        category: category,
                        score: Number(score),
                        sum: userAnswer,
                    });
                    break;
                }
            }
        });

        result[username] = userScores;
    });

    return result
}
