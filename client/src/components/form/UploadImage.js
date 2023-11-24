import resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar } from 'antd';

export default function UploadImage({ ad, setAd }) {

    const handleUploadImages = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if (files?.length) {
                setAd({ ...ad, uploading: true })

                files.map(img => {
                    new Promise(() => {
                        resizer.imageFileResizer(
                            img,   //file
                            1080, //width
                            720, //height
                            'JPEG', //format
                            100, //quality
                            0, //rotation
                            async (uri) => { //callback
                                try {
                                    let { data } = await axios.post(`/upload-images`, { image: uri });
                                    //image is sent to the back-end in base 64 format.
                                    setAd({ ...ad, photos: [...ad.photos, data], uploading: false })
                                } catch (err) {
                                    console.log(err);
                                    setAd({ ...ad, uploading: false })
                                }
                            },
                            'base64' //outputType, other options are 'blob', 'file', 'uri', 'base64'
                        );
                    }
                    )
                })
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
                {ad.uploading ? 'Uploading...' : 'Upload Images'}
                <input type="file"
                    accept="image/*"
                    onChange={handleUploadImages}
                    multiple
                    hidden />
            </label>

            {ad?.photos?.map((photo) => (
                <Avatar key={photo.key}
                    src={photo.Location}
                    size={75}
                    shape="square"
                    className="ml-3 mb-3"
                />
            )
            )}
        </>
    )
}