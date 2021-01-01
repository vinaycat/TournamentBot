
const Canvas = require('canvas');
const Discord = require('discord.js');
function recursiveYValueBlock(offset, height, boxDimension, blockImage, ctx, x, multiplier, seperationGap){
    console.log(`offset+boxDimension: ${offset+boxDimension} height : ${height} multiplier : ${multiplier}`)
    if(offset+boxDimension > height){
        return ;
    }
    ctx.drawImage(blockImage, x, offset, boxDimension, boxDimension);
    recursiveYValueBlock(offset+=(seperationGap*multiplier),height, boxDimension, blockImage, ctx, x, multiplier, seperationGap)
}
function recursiveXValueBlock(offset, height, boxDimension, blockImage, ctx, xOffset, multiplier, seperationGap){
    console.log("offset*multiplier*2 " + (offset*multiplier*2))
    if(offset*multiplier*2 > height){
        return ;
    }
    recursiveYValueBlock(offset*multiplier, height, boxDimension, blockImage, ctx, xOffset, multiplier, seperationGap)
    recursiveXValueBlock(offset, height, boxDimension, blockImage, ctx, xOffset+ 10 + boxDimension, multiplier*2, seperationGap)
}

module.exports = {
    name: 'canvas',
    description: 'Displays test Canvas',
    async execute(message, args, image,x,y, block) {
        //Load Canvas
        const canvas = Canvas.createCanvas(x, y);
        const ctx = canvas.getContext('2d');
        //Load Image
        const background = await Canvas.loadImage(image);
        //Putting it on canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        //Loading Block
        let blockImage = await Canvas.loadImage(block)
        //For loop to add boxes
        // for (let offset = 10; offset < canvas.height-boxDimension; offset+= 60) {
        //     ctx.drawImage(blockImage, 10, offset, boxDimension, boxDimension)
        // }
        // for (let offset = 36*5/3; offset < canvas.height-boxDimension; offset+= 60*5/3) {
        //     ctx.drawImage(blockImage, 20+boxDimension, offset, boxDimension, boxDimension)
        // }
        // for (let offset = 36*10/3; offset < canvas.height-boxDimension; offset+= 60*10/3) {
        //     ctx.drawImage(blockImage, 30+boxDimension*2, offset, boxDimension, boxDimension)
        // }
        // for (let offset = 36*20/3; offset < canvas.height-boxDimension; offset+= 60*20/3) {
        //     ctx.drawImage(blockImage, 50+boxDimension*3, offset, boxDimension, boxDimension)
        // }
        let offset = 36
        let boxDimension = 50
        let xOffset = 10
        let multiplier = 3/2
        let seperationGap = xOffset + boxDimension
        recursiveXValueBlock(offset, canvas.height, boxDimension, blockImage, ctx, xOffset, multiplier, seperationGap);
        
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './test.png');
        return ['attachment://test.png', attachment];
    }
}