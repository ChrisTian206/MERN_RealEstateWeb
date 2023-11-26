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

    const handleDeleteImage = async (photo) => {
        const confirm = window.confirm('Are you sure you want to delete this image?')
        if (!confirm) return;

        try {
            //an example of photo object at the bottom

            //axios handles backend and AWS delete
            const { data } = await axios.post('/delete-images', photo);
            //if the delete is successful, the backend would return a ok: true
            if (data?.ok) {
                //This handles the front-end delete
                setAd((prev) => ({
                    ...prev,
                    photos: prev.photos.filter((p) => p.key !== photo.key),
                    uploading: false
                }))
            }
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
                    onClick={() => handleDeleteImage(photo)}
                />
            )
            )}
        </>
    )
}

// {
//     "photos": [
//         {
//             "ETag": "\"4abe44a873549cdd65b73f4decad4f35\"",
//             "ServerSideEncryption": "AES256",
//             "Location": "https://mern-tutorial.s3.amazonaws.com/55e3c776-5cc8-4c33-999f-0a750a670f2c.jpeg",
//             "key": "55e3c776-5cc8-4c33-999f-0a750a670f2c.jpeg",
//             "Key": "55e3c776-5cc8-4c33-999f-0a750a670f2c.jpeg",
//             "Bucket": "mern-tutorial"
//         }
//     ],
//     "uploading": false,
//     "price": "",
//     "address": "",
//     "bedrooms": "",
//     "bathrooms": "",
//     "parking": "",
//     "landsize": "",
//     "type": "",
//     "title": "",
//     "description": "",
//     "loading": false
// }