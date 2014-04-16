//(function(window,undefined){
    
    function FrontLayer(){
        this.initialize();
    }    
    
    FrontLayer.prototype = new Drawable();
    FrontLayer.prototype.drawable_initialize = FrontLayer.prototype.initialize;    
    FrontLayer.prototype.initialize = function(){        
        this.drawable_initialize();
        
    };
    
    FrontLayer.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    FrontLayer.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    FrontLayer.prototype.draw = function(context){
        
    };
    
    FrontLayer.prototype.clear = function(context){
        
    };
    
 //   window.FrontLayer = FrontLayer;
    
//}(window));