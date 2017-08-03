var i = 0;
var res = 0;
var context = null;
var total_width = 800;
var total_height = 34;
var initial_x = 20;
var initial_y = 500;
var radius = total_height / 2;
window.onload = function () {
    var elem = document.getElementById('canvas');
    if (!elem || !elem.getContext) {
        return;
    }

    context = elem.getContext('2d');
    if (!context) {
        return;
    }


    // Blue gradient for progress bar
    var progress_lingrad = context.createLinearGradient(0, initial_y + total_height, 0, 0);
    progress_lingrad.addColorStop(0, '#f00');
    progress_lingrad.addColorStop(0.4, '#ADD9FF');
    progress_lingrad.addColorStop(1, '#9ED1FF');
    context.fillStyle = progress_lingrad;

    //draw();
    res = setInterval(draw, 30);
}

function draw() {
    i += 1;
    progressBarRect(context, initial_x, initial_y, i, total_height, radius, total_width);
    if (i >= total_width) {
        clearInterval(res);
    }
}


function progressBarRect(ctx, x, y, width, height, radius, max) {
    var offset = 0;
    ctx.beginPath();
    if (width < radius) {
        offset = radius - Math.sqrt(Math.pow(radius, 2) - Math.pow((radius - width), 2));
        ctx.moveTo(x + width, y + offset);
        ctx.lineTo(x + width, y + height - offset);
        ctx.arc(x + radius, y + radius, radius, Math.PI - Math.acos((radius - width) / radius), Math.PI + Math.acos((radius - width) / radius), false);
    }
    else if (width + radius > max) {
        offset = radius - Math.sqrt(Math.pow(radius, 2) - Math.pow((radius - (max - width)), 2));
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width, y);
        ctx.arc(x + max - radius, y + radius, radius, -Math.PI / 2, -Math.acos((radius - (max - width)) / radius), false);
        ctx.lineTo(x + width, y + height - offset);
        ctx.arc(x + max - radius, y + radius, radius, Math.acos((radius - (max - width)) / radius), Math.PI / 2, false);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x + radius, y + radius, radius, Math.PI / 2, 3 * Math.PI / 2, false);
    }
    else {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x + radius, y + radius, radius, Math.PI / 2, 3 * Math.PI / 2, false);
    }
    ctx.closePath();
    ctx.fill();

    // draw progress bar right border shadow
    if (width < max - 1) {
        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowBlur = 1;
        ctx.shadowColor = '#666';
        if (width + radius > max)
            offset = offset + 1;
        ctx.fillRect(x + width, y + offset, 1, total_height - offset * 2);
        ctx.restore();
    }
}

        
       