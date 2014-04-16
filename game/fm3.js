//(function(window,undefined){
    
    function Fm3(){
        this.initialize();
    }    
    
    Fm3.prototype = new Sprite();
    Fm3.prototype.sprite_initialize = Fm3.prototype.initialize;    
    Fm3.prototype.initialize = function(){        
        this.sprite_initialize('fm3'); // your image name
        
    };
    
    Fm3.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Fm3.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Fm3.prototype.on_draw = function(context){
        
    };
    
    
//    window.Fm3 = Fm3;
//    
//}(window));