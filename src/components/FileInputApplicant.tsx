import { ChangeEventHandler, FC } from "react";

type FileInputApplicantProps = {
  onInput: ChangeEventHandler<HTMLInputElement>;
}

const FileInputApplicant: FC<FileInputApplicantProps> = ({onInput}) => {
    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor="applicant-dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload applicant data</span>
                        or drag and drop
                    </p>
                    <p className="text-xs text-red-500">
                        ACCEPTING APPLICANT JSON DATA ONLY
                    </p>
                </div>
                <input
                    accept="application/JSON"
                    id="applicant-dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={onInput}
                />
            </label>
        </div>
    );
};

export default FileInputApplicant;