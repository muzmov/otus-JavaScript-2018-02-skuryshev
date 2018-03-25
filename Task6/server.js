const express = require('express');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const parseString = require('xml2js').parseString;
const app = express();

const options = {
    host: 'www.sports.ru',
    path: '/rss/main.xml'
};

MongoClient.connect('mongodb://localhost:27017', function (err, db) {
    if (err) console.log(err);

    app.get('/item/:id', function (req, res) {
        db.collection('items').findOne({_id : parseInt(req.params.id)}, (err, item) => {
            if (err) res.send(err);
            else res.send(item);
        });
    });

    app.get('/parse', (req, res) => {
        const request = https.request(options, resp => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => parseString(data, saveToDb));
        });
        request.on('error', e => console.log(e.message));
        request.end();

        function saveToDb(err, parseResult) {
            let items = parseResult.rss.channel[0].item;
            db.collection('items').remove();
            items.forEach((item, i) => {
                item._id = i;
                delete item.enclosure;
                db.collection('items').insert(item, (err, result) => {
                    if (err) console.log(err);
                    else console.log(result.ops[0]);
                });
            });
            res.send(items);
        }
    });

    app.listen(3000);
});
