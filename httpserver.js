'use strict';
const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    petsPath = path.join(__dirname, 'pets.json'),
    port = process.env.PORT || 8000;

function requestHandler(req, res)
{
    switch (req.method) //GET, POST, etc.
    {
        case 'GET':
            switch (req.url)
            {
                case '/pets':
                    fs.readFile(petsPath, (err, data) =>
                    {
                        let petData = JSON.parse(data);
                        res.setHeader('Content-Type',
                            'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify(petData));
                    })
                    break;
                case '/pets/0':
                    fs.readFile(petsPath, (err, data) =>
                    {
                        let petData = JSON.parse(data);
                        res.setHeader('Content-Type',
                            'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify(petData[0]));
                    });
                    break;
                case '/pets/1':
                    fs.readFile(petsPath, (err, data) =>
                    {
                        let petData = JSON.parse(data);
                        res.setHeader('Content-Type',
                            'application/json');
                        res.statusCode = 200;
                        res.end(JSON.stringify(petData[1]));
                    });
                    break;

                default:
                    res.setHeader('Content-Type', 'text/plain');
                    res.statusCode =
                        404;
                    res.end('Not Found');
            }
            break;
        default:
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 400;
            res.end('Bad Request');
    }
}
const server = http.createServer(requestHandler);
server.listen(port, () =>
{
    console.log(`Listening on port: ${port}`);
});
module.exports = server;
