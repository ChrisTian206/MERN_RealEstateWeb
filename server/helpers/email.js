const config = require("../config")
const style = `
    background:  #eee;
    padding: 20px;
    border-radius: 20px;
`

module.exports.emailTemp = (email, content, replyTo, subject) => {
    return {
        Source: config.EMAIL_FROM,
        //Destination: req.body.email;
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                            <html>
                                <div style="${style}">
                                <h1>Welcome to Chris MERN App body</h1>
                                ${content}
                                <p> &copy; ${new Date().getFullYear()} </p>
                                </div>
                            </html>
                        `,
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        }
    }
}