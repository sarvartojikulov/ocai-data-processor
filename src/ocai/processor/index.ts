import { SURVEY } from "./constants";
import { OcaiUserAnswers } from "./ocai.types";

export default function process_data(survey_data: OcaiUserAnswers[]) {
    const averages = [];

    for (let i = 0; i < SURVEY.SURVEY_SECTIONS_AMOUNT; i++) {
        const sectionSums: number[] = [];
        log("----");
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
            log(section);
        }

        const average = sectionSums.map((item) => item / survey_data.length);

        log("sum", sectionSums);
        log("average", average);
        log("----");
        averages.push(average);
    }

    log(averages);

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

    log("LAST AVERAGE: ");
    log(lastAverage);
    return lastAverage;
}

function log(...text: any) {
    if (import.meta.env.DEV) {
        return;
    }
    console.log(text);
}
