
const Canvas = require('canvas');

module.exports = {
    name: 'canvas',
    description: 'Displays test Canvas',
    async execute(message, args) {
        let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png";
        const canvas = Canvas.createCanvas(500, 1000);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'test-image.png');
        return attachment;
    }
}