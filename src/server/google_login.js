var request = require('request');

module.exports = GoogleAPI;

function GoogleAPI()
{
    if (!(this instanceof GoogleAPI)) {
        return new GoogleAPI();
    }
    const self = this;

    this.login = function(code)
    {
        return new Promise((resolve, reject) => {
            request.post(
                'https://accounts.google.com/o/oauth2/token',
                { form: {
                    'client_id': '848232511240-73ri3t7plvk96pj4f85uj8otdat2alem.apps.googleusercontent.com',
                    'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob',
                    'client_secret': 'NCjF1TLi2CcY6t5mt0ZveuL7',
                    'grant_type': 'authorization_code',
                    'code': code,
                } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolve(JSON.parse(body).id_token);
                    } else {
                        reject(Error("Cannot authorize. reason:" + body))
                    }
                }
            );
        });
    }
}
//getGoogleToken(code , function(error , auth){
//    console.log(auth);
//    exchangeToken(auth.access_token , function(err , exchangedAuth){
//        console.log(err);
//        console.log(exchangedAuth)
//    });
//});


