//(function(window,undefined){
    
    function Bm2(){
        this.initialize();
    }    
    
    Bm2.prototype = new Sprite();
    Bm2.prototype.sprite_initialize = Bm2.prototype.initialize;    
    Bm2.prototype.initialize = function(){        
        this.sprite_initialize('bm2'); // your image name
        
    };
    
    Bm2.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Bm2.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Bm2.prototype.on_draw = function(context){
        
    };
    
    
//    window.Bm2 = Bm2;
//    
//}(window));