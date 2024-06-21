import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex w-full">
                <div
                    onClick={() => {
                        navigate("/ocai");
                    }}
                    className="cursor-pointer grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
                >
                    OCAI
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div
                    onClick={() => {
                        navigate("/bip");
                    }}
                    className="cursor-pointer grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
                >
                    BIP
                </div>
            </div>
        </div>
    );
};

export default HomePage;
