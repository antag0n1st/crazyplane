//(function(window,undefined){
    
    function Orb(){
        this.initialize();
    }    
    
    Orb.prototype = new Sprite();
    Orb.prototype.sprite_initialize = Orb.prototype.initialize;    
    Orb.prototype.initialize = function(){      
        
        this.sprite_initialize('orb');
        this.set_anchor(0.5,0.5);
        
        this.min_scale = 0.7;
        this.max_scale = 1;

        this.pulsate();
        
    };
    
    Orb.prototype.pulsate = function() {

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
    
    Orb.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Orb.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Orb.prototype.draw = function(context){
        Sprite.prototype.draw.call(this,context);
    };
    
    Orb.prototype.clear = function(context){
        
    };
    
//    window.Orb = Orb;
    
//}(window));