import config from '../config/config';

class PaymentApiClass {
  constructor(http) {
    this.http = http;
  }

  verify(token) {
    const http = this.http;

    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify({
        token,
      });

      const options = {
        hostname: config.paymentApiHost,
        port: config.paymentApiPort,
        path: '/api/verifyPayment',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': jsonData.length,
        },
      };

      function parseJson(res, data) {
        let dataJson;

        try {
          dataJson = JSON.parse(data);
        } catch (e) {
          if (data.indexOf(':-nan') !== -1) {
            parseJson(res, data.replace(/:-nan,/g, ':0'));
            return;
          }
          console.log(
            `${'Could not parse response data from api server  ' +
              '\nRequest Data: '}${jsonData}\nReponse Data: ${data}`
          );
        }
        if (dataJson) resolve(dataJson);
      }

      const req = http.request(options, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          parseJson(res, data);
        });
      });

      req.on('error', (e) => {
        reject(e.message);
      });

      req.end(jsonData);
    });
  }
}

export default PaymentApiClass;
