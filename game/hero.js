(function(window,undefined){
    
    function Hero(){
        this.initialize();
    }    
    
    Hero.prototype = new Sprite();
    Hero.prototype.sprite_initialize = Hero.prototype.initialize;    
    Hero.prototype.initialize = function(){        
        this.sprite_initialize('hero'); // your image name
        
    };
    
    Hero.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Hero.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Hero.prototype.on_draw = function(context){
        
    };
    
    
    window.Hero = Hero;
    
}(window));