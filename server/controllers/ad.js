module.exports.uploadImage = async (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        console.log(err)
        res.json({ error: err.message })
    }
}