const config = require('../config')
const { v4: uuid } = require('uuid')

module.exports.uploadImage = async (req, res) => {
    try {
        const { image } = req.body;

        //inside the replace is a regular expression, which is a pattern
        const base64Img = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        //The split method returns a array of strings.
        //the first split will split the image into two parts using ; as deliminator, 
        //the first part is the 'data:image/jpeg' part, the second part is the 'base64,/9j/....' part
        //To extract the image type, we need to access the first element of the array, which is the 'data:image/jpeg' part
        //The second split will split the 'data:image/jpeg' part into two parts using / as deliminator,
        //the first part is the 'data:image' part, the second part is the 'jpeg' part
        //To extract the image type, we need to access the second element of the array, which is the 'jpeg' part
        const type = image.split(';')[0].split('/')[1];

        //image params
        const params = {
            Bucket: 'mern-tutorial',
            Key: `${uuid()}.${type}`,
            Body: base64Img, //the image is in base64 format, so we need to convert it to buffer
            ACL: 'public-read', //bacause we want to display the image on the front-end
            ContentEncoding: 'base64',
            ContentType: `image/${type}`
        }

        config.AWS_S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: 'Upload to S3 failed' })
            }
            console.log(data);
            res.send(data)
        })
    } catch (err) {
        console.log(err)
        res.json({ error: err.message })
    }
}