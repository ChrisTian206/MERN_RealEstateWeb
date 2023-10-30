import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/nav/SideBar"
import { useState } from "react"

export default function CreateAd() {
    const [sell, setSell] = useState(false);
    const [rent, setRent] = useState(false);

    const navigate = useNavigate();

    const handleSell = () => {
        setRent(false);
        setSell(true);
    }

    const handleRent = () => {
        setSell(false);
        setRent(true);
    }
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5"> Create Ad </h1>
            <SideBar />
            <div className="d-flex justify-content-center align-items-center vh-100"
                style={{ marginTop: '-8%' }}>
                <div className="col-lg-6">
                    <button onClick={handleSell} className="btn btn-light btn-lg col-12 p-5">Sell</button>
                    {sell && <div>
                        <button
                            className="btn btn-light btn-lg col-6 p-5"
                            style={{ border: "1px solid gray" }}
                            onClick={() => navigate('/ad/create/sell/House')}
                        >House</button>
                        <button
                            className="btn btn-light btn-lg col-6 p-5"
                            style={{ border: "1px solid gray" }}
                            onClick={() => navigate('/ad/create/sell/Land')}
                        >Land</button>
                    </div>}
                </div>

                <div className="col-lg-6">
                    <button onClick={handleRent} className="btn btn-light btn-lg col-12 p-5">Rent</button>
                    {rent && <div>
                        <button className="btn btn-light btn-lg p-5 col-6"
                            style={{ border: "1px solid gray" }}
                            onClick={() => navigate('/ad/create/rent/House')}
                        >House</button>
                        <button className="btn btn-light btn-lg p-5 col-6"
                            style={{ border: "1px solid gray" }}
                            onClick={() => navigate('/ad/create/rent/Land')}
                        >Land</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}