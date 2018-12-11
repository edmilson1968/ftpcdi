const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/cdi/:data', (req, res) => {
    var Client = require('ftp');
    var fs = require('fs');
    //var moment = require('moment-timezone');
    var cdiArray = '';
    //console.log(req.params.data);
    //var data = moment().tz("America/Sao_Paulo").format('YYYYMMDD') + '.txt';
    //console.info('vai consultar a data ' + data);
    var c = new Client();
    c.on('ready', function () {
        //console.info('conectou!');
        c.get('/MediaCDI/' + req.params.data, function (err, stream) {
            if (err) {
                console.error(err);
                c.end();
                res.status(500).send();        
            } else {
                stream.once('close', function () { c.end(); });
                stream.on('data', (buffer) => {
                    cdiArray += buffer.toString();
                    //console.log('stream data ' + part);
                });
                stream.on('end', () => {
                    var cdiano = new Number(cdiArray) / 100; //ja da o valor em decimais
                    //console.log('final output ' + cdiano);
                    var cdidia = Math.pow((1 + cdiano.valueOf()/100), (1/252));
                    cdidia = myRound(cdidia, 8);
                    res.send({cdi: cdiano, cdidia: cdidia});
                });
            }
        });
    });
    
    c.on('error', function (err) {
        console.error(err);
        c.end();
        res.status(500).send()
    });
    // connect to localhost:21 as anonymous
    c.connect({ host: 'ftp.cetip.com.br' });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

function myRound (num, n) {
    var m = Math.pow(10, n) ;
    return Math.round(num * m ) / m;
}
