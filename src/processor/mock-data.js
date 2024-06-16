import { SURVEY } from "./constants.js";

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// there are 6 sections
// each section has 4 questions, the sum of all 4 question should be 100

// user input 
/*
    [
        [25, 25, 25, 25],
        [25, 25, 25, 25],
        [25, 25, 25, 25],
        [25, 25, 25, 25],
        [25, 25, 25, 25],
        [25, 25, 25, 25],
    ]
*/

function fakeQuestionResponse() {
    const result = [];
    for (let i = 0; i < SURVEY.SURVEY_SECTION_QUESTIONS_AMOUNT; i++) {
        if (result.length === 0) {
            const random = randomIntBetween(0, 100);
            result.push(random);
            continue;
        }

        let sum = 0;
        result.forEach((num) => (sum += num));

        if (i === SURVEY.SURVEY_SECTION_QUESTIONS_AMOUNT - 1) {
            result.push(100 - sum);
            continue;
        }
        const random = randomIntBetween(0, 100 - sum);
        result.push(random);
    }

    return result;
}

function fakeUserSurvey() {
    const result = [];
    for (let i = 0; i < SURVEY.SURVEY_SECTIONS_AMOUNT; i++) {
        const questionResponse = fakeQuestionResponse();
        result.push(questionResponse);
    }

    return result;
}

export function fakeUserSurveyForAmount(amount = 5) {
    const result = [];
    for (let i = 0; i < amount; i++) {
        result.push(fakeUserSurvey());
    }

    return result;
}
