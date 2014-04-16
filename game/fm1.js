//(function(window,undefined){
    
    function Fm1(){
        this.initialize();
    }    
    
    Fm1.prototype = new Sprite();
    Fm1.prototype.sprite_initialize = Fm1.prototype.initialize;    
    Fm1.prototype.initialize = function(){        
        this.sprite_initialize('fm1'); // your image name
        
    };
    
    Fm1.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Fm1.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Fm1.prototype.on_draw = function(context){
        
    };
    
    
//    window.Fm1 = Fm1;
//    
//}(window));