//(function(window,undefined){
    
    function Bm1(){
        this.initialize();
    }    
    
    Bm1.prototype = new Sprite();
    Bm1.prototype.sprite_initialize = Bm1.prototype.initialize;    
    Bm1.prototype.initialize = function(){        
        this.sprite_initialize('bm1'); // your image name
        
    };
    
    Bm1.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Bm1.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Bm1.prototype.on_draw = function(context){
        
    };
    
    
//    window.Bm1 = Bm1;
//    
//}(window));