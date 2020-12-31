
const Canvas = require('canvas');

module.exports = {
    name: 'canvas',
    description: 'Displays test Canvas',
    async execute(message, args) {
    let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
       // const collector = new Discord.MessageCollector(message.channel, m => m.content.includes('.'), {
    //     time: 10000
    // });
    // collector.on('collect', async message1 => {
    const canvas = Canvas.createCanvas(500, 1000);
    const ctx = canvas.getContext('2d');
    //console.log('in avatar');

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(image);
    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Draw a rectangle with the dimensions of the entire canvas
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    //ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.arc(310, 310, 95, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();

    // Use helpful Attachment class structure to process the file for you
    //ctx.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer());
    // let embed = new Discord.MessageEmbed()
    //     //.attachFiles(attachment)
    //     .setImage('attachment://hangmanImage.png');
    //     message.channel.send({ embed, files: [attachment] })
    // console.log(attachment)
    return attachment;
    // });
    }
}