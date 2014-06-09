//(function(window,undefined){
    
    function Plane_part(){
        this.initialize();
    }    
    
    Plane_part.prototype = new Sprite();
    Plane_part.prototype.sprite_initialize = Plane_part.prototype.initialize;    
    Plane_part.prototype.initialize = function(){      
        
        this.sprite_initialize('plane_part');
        this.set_anchor(0.5,0.5);
        
        this.min_scale = 0.9;
        this.max_scale = 1;
        
        this.rotate = new TweenRotate(this,1,null,1000);
        this.rotate.run();
        
        this.pulsate();
    };
    
    Plane_part.prototype.pulsate = function() {
        
        if (this.scale_x === this.min_scale) {
            var tween = new TweenScale(this, this.max_scale, new Bezier(1, 1, 1, 1), 500, function() {
                this.object.pulsate();
            });
        } else {
            var tween = new TweenScale(this, this.min_scale, new Bezier(1, 1, 1, 1), 500, function() {
                this.object.pulsate();
            });
        }

        tween.run();

    };
    
    Plane_part.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Plane_part.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Plane_part.prototype.draw = function(context){
        Sprite.prototype.draw.call(this,context);
    };
    
    Plane_part.prototype.clear = function(context){
        
    };
    
//    window.Plane_part = Plane_part;
    
//}(window));