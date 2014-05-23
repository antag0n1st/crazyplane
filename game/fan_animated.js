//(function(window,undefined){
    
    function FanAnimated(){
        this.initialize();
    }    
    
    FanAnimated.prototype = new Animation();
    FanAnimated.prototype.animation_initialize = FanAnimated.prototype.initialize;    
    FanAnimated.prototype.initialize = function(){        
        
        var sprite_sheet = new SpriteSheet([{
                image: ContentManager.images.fan,
                frames: {x: 2, y: 1},
                animations: {
                    blow: {start: 0, end: 1, loop: true, duration: 60}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            }]);

        this.animation_initialize(sprite_sheet);
        
        
    };
    
    FanAnimated.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    FanAnimated.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    
    
    FanAnimated.prototype.clear = function(context){
        
    };
    
//    window.FanAnimated = FanAnimated;
    
//}(window));