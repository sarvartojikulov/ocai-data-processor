import { SURVEY } from "./constants";
import { OcaiUserAnswers } from "./ocai.types";

export default function validate(data : OcaiUserAnswers[]) {
    let isValid = true;
    for (let i = 0; i < data.length; i++) {
        const user_answers = data[i];

        if (user_answers.length !== SURVEY.SURVEY_SECTIONS_AMOUNT) {
            console.log("Error Validation 1");
            isValid = false;
            break;
        }

        for (const row of user_answers) {
            if (row.length !== SURVEY.SURVEY_SECTION_QUESTIONS_AMOUNT) {
                console.log("Error Validation 2");
                isValid = false;
                break;
            }

            let rowSum = 0;
            row.forEach((num) => (rowSum += num));

            if (rowSum !== 100) {
                console.log("Error Validation 3");
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}