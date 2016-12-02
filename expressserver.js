'use strict';
const fs = require('fs'),
    path = require('path'),
    port = 8000,
    express = require('express'),
    server = express(),
    petsPath = path.join(__dirname, 'pets.json');

server.get('/pets', (req, res) =>
{
    fs.readFile(petsPath, (err, data) =>
    {
        if (err) throw err;
        res.send(JSON.parse(data));
        res.statusCode = 200;
    })
});
server.get('/pets/:index', (req, res) =>
{
    let index = Number.parseInt(req.params.index);
    fs.readFile(petsPath, (err, data) =>
    {
        let petsJSON = JSON.parse(data)[index];
        if (err) throw err;
        if (!petsJSON)
        {
            return res.sendStatus(404);
        }
        res.send(petsJSON);
    })

})

server.listen(port, (err) =>
{
    if (err) throw err;
    console.log('Listen on port:', port);
});
module.exports = server
