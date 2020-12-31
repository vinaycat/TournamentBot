module.exports = {
    name: 'playersList',
    description: 'Displays list of players',
    execute(message, args, listOfPlayers) {
        let arrayOfPlayers = [];
        let newList = "";
        for (let index = 0; index < listOfPlayers.length; index++) {
            newList += `${index+1}. ${listOfPlayers[index]} \n`;
            if (index % 10 == 0 && index != 0) {
                arrayOfPlayers[(index - 10) / 10] = newList;
                newList = "";
            }
        }
        arrayOfPlayers[arrayOfPlayers.length] = newList;
        return arrayOfPlayers;
    }
}