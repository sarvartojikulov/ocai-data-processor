import { SURVEY } from "./constants.js";
import validate from "./validation.js";

// const survey_data = fakeUserSurveyForAmount(3);
// const survey_data = test_data.map(item => item.teilnehmer_antworten);

export default function process_data(survey_data) {
    if (!validate(survey_data)) {
        console.log("data is invalid");
        return;
    }
    const averages = [];

    for (let i = 0; i < SURVEY.SURVEY_SECTIONS_AMOUNT; i++) {
        const sectionSums = [];
        console.log("----");
        for (let j = 0; j < survey_data.length; j++) {
            const user_answers = survey_data[j];
            const section = user_answers[i];

            section.forEach((num, idx) => {
                if (sectionSums[idx] !== undefined) {
                    sectionSums[idx] += num;
                } else {
                    sectionSums[idx] = num;
                }
            });
            console.log(section);
        }

        const average = sectionSums.map((item) => item / survey_data.length);

        console.log("sum", sectionSums);
        console.log("average", average);
        console.log("----");
        averages.push(average);
    }

    console.log(averages);

    const lastAverage = [];
    for (let i = 0; i < SURVEY.SURVEY_SECTION_QUESTIONS_AMOUNT; i++) {
        let sectionSum = 0;
        for (let j = 0; j < averages.length; j++) {
            const row = averages[j];
            const item = row[i];
            sectionSum += item;
        }
        lastAverage.push(sectionSum / 6);
    }

    console.log("LAST AVERAGE: ")
    console.log(lastAverage);
    return lastAverage;
}