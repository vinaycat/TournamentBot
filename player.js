const players = require('./players.json');
const fs = require("fs");

function generalBoolean(boolean) {
    if (boolean) {
        return "Success";
    } else {
        return "Fail";
    }
}
class Player {
    constructor(){}
    addPlayer(Name, Team) {
        let boolean = false;
        let isNameThere = false;
        players.forEach(val => {
            if (val.name === Name) {
                isNameThere = true;
            }
        })
        if (!isNameThere) {
            players.push({name: Name, team: Team});
            fs.writeFile("./players.json", JSON.stringify(players, null, 2), (err) => {
                if (err) console.log(err);
            });
            boolean = true;
        }

        return generalBoolean(boolean)
    }
    removePlayer(Name){
        let boolean = false;
        let indexOfTeam = 0;
        let isNameThere = true;
        players.forEach(function (val, i) {
            if (val.name === Name) {
                indexOfTeam = i;
                isNameThere = false;
            }
        })
        if (!isNameThere) {
            players.splice(indexOfTeam, 1);
            fs.writeFile("./players.json", JSON.stringify(players, null, 2), (err) => {
                if (err) console.log(err);
            });
            boolean = true;
        }
        return generalBoolean(boolean)
    }
    setName(Name, newName) {
        let boolean = false;

        players.forEach(element => {
            if (element.name.toLowerCase() === Name.toLowerCase()) {
                element.name = newName;
                fs.writeFileSync("./players.json", JSON.stringify(players, null, 2), (err) => {
                    if (err) console.log(err);
                });
                boolean = true;
            }
        });
        return generalBoolean(boolean)
    }
    setTeamName(Name, teamName) {
        let boolean = false;

        players.forEach(element => {
            if (element.name.toLowerCase() === Name.toLowerCase()) {
                element.teamname = teamName;
                fs.writeFileSync("./players.json", JSON.stringify(players, null, 2), (err) => {
                    if (err) console.log(err);
                });
                boolean = true;
            }
        });
        return generalBoolean(boolean)
    }
    returnListOfPlayers() {
        let listOfNames = [];
        players.forEach(function (val, i) {
            listOfNames[i] = val.name;
        })
        return listOfNames;
    }
}
module.exports = {
    Player: Player
}