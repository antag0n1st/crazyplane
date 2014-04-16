//(function(window,undefined){
    
    function Sky(){
        this.initialize();
    }    
    
    Sky.prototype = new Drawable();
    Sky.prototype.drawable_initialize = Sky.prototype.initialize;    
    Sky.prototype.initialize = function(){        
        this.drawable_initialize();
        
        this.image = ContentManager.images.bg.image;
        
    };
    
    Sky.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Sky.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Sky.prototype.draw = function(context){
        context.drawImage(this.image, 0, 0);
    };
    
    Sky.prototype.clear = function(context){
        
    };
    
 //   window.Sky = Sky;
    
//}(window));