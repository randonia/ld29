function Sprite(url, pos, size, speed, frames, dir, once)
{
    this.clipPos = pos;
    this.clipSize = size;
    this.framesPerSec = typeof speed === 'number' ? speed : 0;
    this.framesList = frames;
    this._index = 0;
    this.url = url;
    this.direction = dir || 'horizontal';
    this.once = once;
}

Sprite.prototype.update = function(delta)
{
    this._index += this.framesPerSec*delta;
}

Sprite.prototype.draw = function(context, renderPos, renderScale, renderOffset)
{
    var frame;
    
    if (this.framesPerSec > 0)
    {
        var max = this.framesList.length;
        var index = Math.floor(this._index);
        frame = this.framesList[index % max];
        
        if(this.once && index >= max)
        {
            this.done = true;
            return;
        }
    }
    else 
    {
        frame = 0;
    }
    
    var clipX = this.clipPos[0];
    var clipY = this.clipPos[1];
    
    if(this.dir == 'vertical')
    {
        clipY += frame * this.clipSize[1];
    }
    else
    {
        clipX += frame * this.clipSize[0];
    }
    
    context.drawImage(
                        Resources.get(this.url),
                        clipX, clipY,
                        this.clipSize[0], this.clipSize[1],
                        (renderPos[0] - renderOffset[0]), 
                        (renderPos[1] - renderOffset[1]), 
                        renderScale[0], renderScale[1]
                    );
}
                        /*(objX - (.5 * objWidth)), 
                        (objY - (.5 * objHeight)),
                        (objWidth), 
                        (objHeight)*/