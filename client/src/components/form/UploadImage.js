export default function UploadImage({ ad, setAd }) {

    const handleUploadImages = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if (files?.length) {
                console.log(files);
                setAd({ ...ad, uploading: true })
            }
        } catch (err) {
            console.log(err)
            setAd({ ...ad, uploading: false })
        }
    }

    const handleDeleteImage = async (e) => {
        e.preventDefault();
        try {
            setAd({ ...ad, uploading: true })
        } catch (err) {
            console.log(err)
            setAd({ ...ad, uploading: false })
        }
    }

    return (
        <>


            <label className="btn btn-secondary btn-lg">
                Upload Images
                <input type="file"
                    accept="image/*"
                    onChange={handleUploadImages}
                    multiple
                    hidden />
            </label>
        </>
    )
}