//(function(window,undefined){
    
    function Fm2(){
        this.initialize();
    }    
    
    Fm2.prototype = new Sprite();
    Fm2.prototype.sprite_initialize = Fm2.prototype.initialize;    
    Fm2.prototype.initialize = function(){        
        this.sprite_initialize('fm2'); // your image name
        
    };
    
    Fm2.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Fm2.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Fm2.prototype.on_draw = function(context){
        
    };
    
    
//    window.Fm2 = Fm2;
//    
//}(window));