export function smooth() {
    // body...
}

export function bend(ctx, text, r) {
    ctx.save();
    if (r === -370) {
        ctx.font = "10px adad";
        ctx.rotate(-0.015 * text.length / 2 - 0.02)
    }else{
        ctx.rotate(-0.04 * text.length / 2 - 0.02)

    }

    for (var i = 0; i < text.length; i++) {
        ctx.rotate(r === -400 ? 0.04 : 0.018)
        ctx.fillText(text[i], 0, r)
    }

    ctx.restore()
}

function fitTextToArc(circle, a0, a1, text, charHeight, font, flip) {
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.font = font;
    ctx.textBaseline = "middle";

    if (flip) {
        var t = '';
        for (var j = 0; j < text.length; j++) {
            t += text[text.length - j - 1]
        }
        text = t;
    }

    var a = a0 + Math.PI / 2 + (a1 - a0) / (2 * text.length);
    for (var i = 0; i < text.length; i++) {
        var charWidth = ctx.measureText(text[i]).width;
        var x = -charWidth / 2;
        var y = -circle.r;

        if (flip) {
            ctx.translate(x, y);
            ctx.fillRect(-100, -5, 200, 5);
            ctx.rotate(Math.PI);
            ctx.translate(-x, -y);
        }

        ctx.translate(circle.x, circle.y);
        ctx.rotate(a);

        ctx.fillText(text[i], x, y);

        //draw boundaries
        ctx.strokeStyle = "rgba(255,255,0,1)";
        ctx.lineWidth = 2;

        ctx.beginPath();
        //ctx.save();
        ctx.moveTo(x, y - charHeight / 2); //left
        ctx.lineTo(x, y + charHeight / 2); //left
        ctx.moveTo(x + charWidth / 2, y - charHeight / 2); //center
        ctx.lineTo(x + charWidth / 2, y + charHeight / 2); //center
        ctx.moveTo(x + charWidth, y - charHeight / 2); //right
        ctx.lineTo(x + charWidth, y + charHeight / 2); //right
        ctx.moveTo(x, y - charHeight / 2); //top
        ctx.lineTo(x + charWidth, y - charHeight / 2); //top
        ctx.moveTo(x, y); //middle
        ctx.lineTo(x + charWidth, y); //middle
        ctx.moveTo(x, y + charHeight / 2); //bottom
        ctx.lineTo(x + charWidth, y + charHeight / 2); //bottom

        ctx.closePath();
        ctx.stroke();

        if (flip) {
            ctx.rotate(-Math.PI);
        }
        ctx.rotate(-a);
        ctx.translate(-circle.x, -circle.y);

        //ctx.restore();
        a += (a1 - a0) / text.length;
    }

}
