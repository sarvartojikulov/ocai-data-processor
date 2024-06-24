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
import ApplicantTable from "./ApplicantTable";
import OcaiChart from "./OcaiChart";

const OcaiPage = () => {
  const [ocaiResults, setOcaiResults] = useState<{
    ist: number[];
    soll: number[];
  } | null>(null);

  const [applicantResults, setApplicantResults] = useState<{
    wunsch: number[];
  } | null>(null);

  const [currentOcaiResults, setCurrentOcaiResults] = useState<number[] | null>(
    null
  );

  const [istScore, setIstScore] = useState<number | null>(null);
  const [sollScore, setSollScore] = useState<number | null>(null);

  const handleOcaiInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    const data = await parseJsonFile<{ responses: Record<string, string>[] }>(
      file
    );
    const ist = parse(FILTER_KEYS.IST, data.responses);
    const soll = parse(FILTER_KEYS.SOLL, data.responses);

    if (!validate(ist) || !validate(soll)) {
      return;
    }

    const ist_result = process_data(ist);
    const soll_result = process_data(soll);

    setOcaiResults({ ist: ist_result, soll: soll_result });
  };

  const handleApplicantInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    const data = await parseJsonFile<{ responses: Record<string, string>[] }>(
      file
    );
    const wunsch = parse(FILTER_KEYS_APPLICANT.WUNSCH, data.responses);
    const wunsch_result = process_data_applicant(wunsch);

    setApplicantResults({ wunsch: wunsch_result });
  };

  const calculateApplicantAndIst = () => {
    if (!applicantResults || !ocaiResults) {
      console.error("Daten sind nicht vollständig.");
      return;
    }
    const diff = ocaiResults.ist.map((istValue, index) =>
      Math.abs(istValue - applicantResults.wunsch[index])
    );
    const sumDiff = diff.reduce((acc, value) => acc + value, 0);
    const finalScore = 100 - sumDiff;
    const roundedFinalScore = parseFloat(finalScore.toFixed(2));
  
    setIstScore(roundedFinalScore);
    setCurrentOcaiResults(ocaiResults.ist);
  };
  

  const calculateApplicantAndSoll = () => {
    if (!applicantResults || !ocaiResults) {
      console.error("Daten sind nicht vollständig.");
      return;
    }
    const diff = ocaiResults.soll.map((sollValue, index) =>
      Math.abs(sollValue - applicantResults.wunsch[index])
    );
    const sumDiff = diff.reduce((acc, value) => acc + value, 0);
    const finalScore = 100 - sumDiff;
  
    const roundedFinalScore = parseFloat(finalScore.toFixed(2));
  
    setSollScore(roundedFinalScore);
    setCurrentOcaiResults(ocaiResults.soll);
  };

  return (
    <>
      <FileInput onInput={handleOcaiInput} />
      {ocaiResults && ocaiResults.ist && ocaiResults.soll && (
        <div className="max-w-5xl mx-auto">
          <OcaiTable ist={ocaiResults.ist} soll={ocaiResults.soll} />
        </div>
      )}

      <FileInputApplicant onInput={handleApplicantInput} />
      {applicantResults && applicantResults.wunsch && (
        <div className="max-w-5xl mx-auto">
          <ApplicantTable wunsch={applicantResults.wunsch} />

          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={calculateApplicantAndIst}
          >
            Berechne Bewerber - IST-Zustand Score
          </button>
          {istScore !== null && (
            <p className="text-lg font-bold">
              Der Bewerber passt nach dem IST Score zu{" "}
              <span className="text-xl font-extrabold">{istScore} %</span>
            </p>
          )}
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={calculateApplicantAndSoll}
          >
            Berechne Bewerber - SOLL-Zustand Score
          </button>
          {sollScore !== null && (
            <p className="text-lg font-bold">
              Der Bewerber passt nach dem SOLL Score zu{" "}
              <span className="text-xl font-extrabold">{sollScore} %</span>
            </p>
          )}
          <OcaiChart
            applicantResults={applicantResults.wunsch}
            ocaiResults={currentOcaiResults}
          />
        </div>
      )}
    </>
  );
};
export default OcaiPage;
