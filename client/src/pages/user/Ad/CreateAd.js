import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/nav/SideBar"
import { useState } from "react"

export default function CreateAd() {
    const [sell, setSell] = useState(false);
    const [rent, setRent] = useState(false);

    const navigate = useNavigate();
    return (
        <div>
            <h1 className="display-1 bg-primary text-light p-5"> Create Ad </h1>
            <SideBar />
            <div className="d-flex justify-content-center align-items-center vh-100"
                style={{ marginTop: '-8%' }}>
                <div className="col-lg-6">
                    <button>Sell</button>
                </div>

                <div className="col-lg-6">
                    <button>Rent</button>
                </div>
            </div>
        </div>
    )
}