import React, { useRef, useState } from "react";
import FileInput from "../components/FileInput";
import processBIP from "./processor";
import { UserBIPResult } from "./processor/types";

const BIPPage = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [results, setResults] = useState<Record<string, UserBIPResult[]>>();
    const [selected, setSelected] = useState<{
        username: string;
        results: UserBIPResult[];
    }>();

    const onInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target?.result?.toString();

            if (!text) {
                console.error("Cannot read text");
                return;
            }

            const results = processBIP(text.split("\n"));
            setResults(results);
        };

        reader.readAsText(file);
    };
    return (
        <React.Fragment>
            <FileInput
                label="ONLY CSV FROM GOOGLE FORMS EXPORT"
                accept=".csv"
                onInput={onInput}
            />

            <section className="flex flex-col gap-2 ">
                {results &&
                    Object.keys(results).map((user) => (
                        <div
                            key={user}
                            className="bg-gray-100 p-4 cursor-pointer flex justify-between items-center"
                        >
                            <h3 className="font-semibold text-xl">{user}</h3>
                            <div
                                className="btn btn-neutral"
                                onClick={() => {
                                    setSelected({
                                        username: user,
                                        results: results[user],
                                    });
                                    modalRef.current?.showModal();
                                }}
                            >
                                More
                            </div>
                        </div>
                    ))}
            </section>

            {selected && (
                <dialog id="random_id" ref={modalRef} className="modal">
                    <div className="modal-box max-w-[40rem]">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            {selected.username}
                        </h3>
                        <div className="py-4">
                            {selected.results.map((result) => (
                                <div
                                    key={result.category}
                                    className="grid grid-cols-2 gap-x-4 items-center py-2"
                                >
                                    <h3>
                                        {result.category} - {result.score}
                                    </h3>
                                    <progress
                                        className="progress w-56"
                                        value={result.score}
                                        max="10"
                                    ></progress>
                                </div>
                            ))}
                        </div>
                    </div>
                </dialog>
            )}
        </React.Fragment>
    );
};

export default BIPPage;
