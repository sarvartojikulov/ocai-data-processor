import { FC } from "react";

type OcaiTableProps = {
    ist: number[];
    soll: number[];
};

const OcaiTable: FC<OcaiTableProps> = ({ ist, soll }) => {
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
                        <th>IST-Zustan</th>
                        {ist.map((item, idx) => (
                            <td key={idx}>{item.toFixed(2)}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>SOLL-Zustan</th>
                        {soll.map((item, idx) => (
                            <td key={idx}>{item.toFixed(2)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OcaiTable;
