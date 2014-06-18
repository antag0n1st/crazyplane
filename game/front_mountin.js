//(function(window,undefined){
    
    function FrontMountin(){
        this.initialize();
    }    
    
    FrontMountin.prototype = new Drawable();
    FrontMountin.prototype.drawable_initialize = FrontMountin.prototype.initialize;    
    FrontMountin.prototype.initialize = function(){        
        this.drawable_initialize();
        
        this.set_size(Config.screen_width, Config.screen_height);
        
        this.sprites = [];
        
        this.fm1 = new Sprite('bg1');
        this.fm1.set_position(0,120);
        this.fm2 = new Sprite('bg2');
        this.fm2.set_position(800,120);
        
        this.add_child(this.fm1);
        this.add_child(this.fm2);
        
        this.sprites.push(this.fm1);
        this.sprites.push(this.fm2);
        
    };
    
    FrontMountin.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    FrontMountin.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    FrontMountin.prototype.draw = function(context){
        
            for(var i=0;i<this.sprites.length;i++){
                
                var sprite = this.sprites[i];
                
                if(sprite.bounds.pos.x < -800){
                    
                  var p =  sprite.get_position();
                  
                  sprite.set_position(p.x+1600,p.y);
                    
                }
                
            }
            
            
        
    };
    
    FrontMountin.prototype.clear = function(context){
        
    };
    
 //   window.FrontMountin = FrontMountin;
    
//}(window));