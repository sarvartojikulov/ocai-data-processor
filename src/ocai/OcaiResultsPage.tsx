import OcaiTable from './OcaiTable';
import ApplicantTable from './ApplicantTable';
import { useLocation } from 'react-router-dom';


const ResultsPage = () => {
  const location = useLocation();
  const { ocaiResults, applicantResults } = location.state || { ocaiResults: null, applicantResults: null };

  return (
    <div className="max-w-5xl mx-auto">
      {ocaiResults && (
        <>
          <OcaiTable ist={ocaiResults.ist} soll={ocaiResults.soll} />
          {/* <OcaiChart ist={ocaiResults.ist} soll={ocaiResults.soll} /> Wenn Sie es wieder einbeziehen wollen */}
        </>
      )}
      {applicantResults && (
        <ApplicantTable wunsch={applicantResults.wunsch} />
      )}
    </div>
  );
};

export default ResultsPage;
