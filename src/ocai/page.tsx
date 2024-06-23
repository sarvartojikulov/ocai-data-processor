import React, { useState } from "react";
import FileInput from "../components/FileInput";
import FileInputApplicant from "../components/FileInputApplicant";
import { parseJsonFile } from "../utils";
import process_data from "./processor";
import process_data_applicant from "./processor";
import validate from "./processor/validation";
import { FILTER_KEYS, FILTER_KEYS_APPLICANT } from "./processor/constants";
import { parse } from "./processor/parser";
import OcaiTable from "./OcaiTable";
//import OcaiChart from "./OcaiChart";
import ApplicantTable from "./ApplicantTable";

const OcaiPage = () => {
  const [ocaiResults, setOcaiResults] = useState<{
    ist: number[];
    soll: number[];
  } | null>(null);

  const [applicantResults, setApplicantResults] = useState<{
    wunsch: number[];
  } | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleOcaiInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const data = await parseJsonFile<{
      responses: Record<string, string>[];
    }>(file);

    const ist = parse(FILTER_KEYS.IST, data.responses);
    const soll = parse(FILTER_KEYS.SOLL, data.responses);

    if (!validate(ist) || !validate(soll)) {
      return;
    }

    const ist_result = process_data(ist);
    const soll_result = process_data(soll);

    setOcaiResults({ ist: ist_result, soll: soll_result });
  };

  const handleApplicantInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const data = await parseJsonFile<{
      responses: Record<string, string>[];
    }>(file);

    const wunsch = parse(FILTER_KEYS_APPLICANT.WUNSCH, data.responses);
    const wunsch_result = process_data_applicant(wunsch);

    setApplicantResults({ wunsch: wunsch_result });
  };


  const calculateApplicantAndIst = () => {
    if (!applicantResults || !ocaiResults) {
      console.error("Daten sind nicht vollständig.");
      return;
    }

    const diff = ocaiResults.ist.map((istValue, index) => {
        const difference = istValue - applicantResults.wunsch[index];
        console.log(`Differenz für Index ${index}:`, difference);
        return difference;
      });
      const sumDiff = diff.reduce((acc, value) => acc + value, 0);
      console.log("Summe der Differenzen:", sumDiff);
    
      const finalScore = 100 - sumDiff;
      console.log("Finaler Score:", finalScore);
    
      setScore(finalScore);
  };


function calculateApplicantAndSoll(): void {
  if (!applicantResults || !ocaiResults) {
    console.error("Daten sind nicht vollständig.");
    return;
  }

  // Beispiel einer anderen Berechnung
  const sumSoll = ocaiResults.soll.reduce((acc, cur) => acc + cur, 0);
  const sumWunsch = applicantResults.wunsch.reduce((acc, cur) => acc + cur, 0);

  const result = sumSoll - sumWunsch; // oder eine andere Berechnung

  console.log("sol lErgebnis der Berechnung (SOLL - WUNSCH):", result, applicantResults, ocaiResults);
}

       //   <OcaiChart ist={ocaiResults.ist} soll={ocaiResults.soll} />
  return (
    <>
      <FileInput onInput={handleOcaiInput} />
      {ocaiResults?.ist && ocaiResults.soll && (
        <div className="max-w-5xl mx-auto">
          <OcaiTable ist={ocaiResults.ist} soll={ocaiResults.soll} />
        </div>
      )}

      <FileInputApplicant onInput={handleApplicantInput} />
      {applicantResults?.wunsch && (
        <div className="max-w-5xl mx-auto">
         <ApplicantTable wunsch={applicantResults.wunsch} />
          <button onClick={calculateApplicantAndIst}>Berechne Bewerber - IST-Zustand Score</button>
          {score !== null && (
            <p className="text-lg font-bold">Score: <span className="text-xl font-extrabold">{score}</span></p>
          )}
        </div>
      )}
    </>
  );
};

export default OcaiPage;
