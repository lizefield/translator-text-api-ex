'use strict';

let https = require ('https');

class Translator {
  constructor() {
    this.subscriptionKey = '__YOUR_KEY__';
    this.host = 'api.microsofttranslator.com';
    this.path = '/V2/Http.svc/Translate';
  }

  translate(word, lang='ja') {
    return new Promise((resolve, reject) => {
      const query = '?to=' + lang + '&text=' + encodeURI(word);
      const params = {
        method : 'GET',
        hostname : this.host,
        path : this.path + query,
        headers : {
            'Ocp-Apim-Subscription-Key' : this.subscriptionKey
        }
      };
  
      let request = https.request(params, (response) => {
        let body = '';
        response.on ('data', (d) => { body += d; });
        response.on ('end', () => { resolve(this.xmlToString(body)); });
        response.on ('error', (e) => { reject(e.message); });
      });
      request.end();
    })
  }

  xmlToString(xml) {
    const start = xml.indexOf('>');
    const end = xml.lastIndexOf('<');
    return xml.substring(start+1, end);
  }
}

module.exports = new Translator();