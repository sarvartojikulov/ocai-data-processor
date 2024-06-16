import process_data from "../processor/index.js";
import test_data from "../../input/test.json" assert { type: "json" };

console.log("> Process with test data");

const survey_data = test_data.map((item) => item.teilnehmer_antworten);
const result = process_data(survey_data);

const should_be = [
    26, 26.833333333333332, 25.333333333333332, 21.833333333333332,
];

should_be.forEach((item, idx) => {
    if (item !== result[idx]) {
        console.error("Not Equal values");
        console.log("Result: ", result);
        console.log("Expected: ", should_be);
        process.exit(1);
    }
});

console.log("> Test passed");
