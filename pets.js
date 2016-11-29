'use strict ';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];
switch (cmd)
{
    case 'read':
        fs.readFile(petsPath, 'utf8', function(err, data)
        {
            if (err)
            {
                throw err;
            }
            let index = process.argv[3];
            let pets = JSON.parse(data);
            // console.log(index);
            if (index)
            {
                pets = pets[index];
                if (!pets)
                {
                    console.error(`Usage: ${node} ${file} read INDEX`);
                    process.exit(1);
                }
            }
            console.log(pets);
        });
        break;
    case 'create':
        fs.readFile(petsPath, 'utf8', function(readErr, data)
        {
            if (readErr)
            {
                throw readErr;
            }

            let pets = JSON.parse(data);
            let age = +process.argv[3];
            let kind = process.argv[4];
            let name = process.argv[5];
            let petObj = {
                "age": age,
                "kind": kind,
                "name": name
            }

            if (isNaN(age) || !name || !kind)
            {
                console.error(
                    `Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
                process.exit(1);
            }
            pets.push(petObj);
            let petsJSON = JSON.stringify(pets);

            fs.writeFile(petsPath, petsJSON, function(writeErr)
            {
                if (writeErr)
                {
                    throw writeErr;
                }
                console.log(petObj);
            });
        });
        break;
    case 'destroy':
        let index = process.argv[3];
        if (!index || isNaN(index))
        {
            console.error(`Usage: ${node} ${file} destroy INDEX`);
            process.exit(1);
        }
        break;
    case 'update':
        break;
    default:
        console.error(
            `Usage: ${node} ${file} [read | create | update | destroy]`
        );
        process.exit(1);
}
