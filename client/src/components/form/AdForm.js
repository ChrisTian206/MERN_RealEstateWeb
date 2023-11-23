import { useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_KEY } from "../../../config";

export default function AdForm({ action, type }) {

    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        parking: '',
        landSize: '',
        type: '',
        title: '',
        description: '',
        loading: false,
    });
    return (
        <>
            <div className="mb-3 form-control">
                <GooglePlacesAutocomplete
                    apiKey={GOOGLE_PLACES_KEY}
                    apiOptions='us'
                    selectProps={{
                        defaultInputValue: ad?.address,
                        placeholder: "Search for address...",
                        onChange: (address) => console.log(address)
                    }} />

                <button className="btn btn-primary btn-lg col-12 mt-3">Submit</button>
            </div>
        </>
    )
}