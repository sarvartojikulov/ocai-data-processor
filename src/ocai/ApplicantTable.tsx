import { FC } from "react";

type ApplicantTableProps = {
    wunsch: number[];
};

const ApplicantTable: FC<ApplicantTableProps> = ({ wunsch }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table border border-indigo-200 rounded-lg">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Clan-Kultur</th>
                        <th>Adhocracy-Kultur</th>
                        <th>Markt-Kultur</th>
                        <th>Hierarchie-Kultur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Wunschk-Kultur</th>
                        {wunsch.map((item, idx) => (
                            <td key={idx}>{item.toFixed(2)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantTable;
