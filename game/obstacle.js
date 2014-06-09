//(function(window,undefined){
    
    function Obstacle(){
        this.initialize();
    }    
    
    Obstacle.prototype = new Sprite();
    Obstacle.prototype.sprite_initialize = Obstacle.prototype.initialize;    
    Obstacle.prototype.initialize = function(){      
        
        this.sprite_initialize('ninja_star');
        this.set_anchor(0.5,0.5);
        
        this.min_scale = 0.7;
        this.max_scale = 1;
        
        this.rotate = new TweenRotate(this,1,null,500);
        this.rotate.run();
        
    };
    
    Obstacle.prototype.pulsate = function() {
        
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
    
    Obstacle.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Obstacle.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Obstacle.prototype.draw = function(context){
        Sprite.prototype.draw.call(this,context);
    };
    
    Obstacle.prototype.clear = function(context){
        
    };
    
//    window.Obstacle = Obstacle;
    
//}(window));