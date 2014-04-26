function Sprite(url, pos, size, speed, frames, dir, once)
{
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
}

Sprite.prototype.update = function(delta)
{
    this._index += this.speed*delta;
}

Sprite.prototype.render = function(context, objX, objY)
{
    var frame;
    
    if (this.speed > 0)
    {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];
        
        if(this.once && idx >= max)
        {
            this.done = true;
            return;
        }
    }
    else 
    {
        frame = 0;
    }
    
    var x = this.pos[0];
    var y = this.pos[1];
    
    if(this.dir == 'vertical')
    {
        y += frame * this.size[1];
    }
    else
    {
        x += frame * this.size[0];
    }
    
    context.drawImage(Resources.get(this.url),
                        x, y,
                        this.size[0], this.size[1],
                        (objX - (.5 * this.size[0])), (objY - (.5 * this.size[1])),
                        this.size[0], this.size[1]);
}