//(function(window,undefined){
    
    function BackMountin(){
        this.initialize();
    }    
    
    BackMountin.prototype = new Drawable();
    BackMountin.prototype.drawable_initialize = BackMountin.prototype.initialize;    
    BackMountin.prototype.initialize = function(){        
        this.drawable_initialize();
        
        this.set_size(Config.screen_width, Config.screen_height);
        
        this.sprites = [];
        
        this.bm1 = new Sprite('bm1');
        this.bm1.set_position(0,100);
        
        this.bm2 = new Sprite('bm2');
        this.bm2.set_position(800,100);
        
        this.add_child(this.bm1);
        this.add_child(this.bm2);
        
        this.sprites.push(this.bm1);
        this.sprites.push(this.bm2);
        
    };
    
    BackMountin.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    BackMountin.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    BackMountin.prototype.draw = function(context){
        
            for(var i=0;i<this.sprites.length;i++){
                
                var sprite = this.sprites[i];
                
                if(sprite.bounds.pos.x < -800){
                    
                  var p =  sprite.get_position();
                  
                  sprite.set_position(p.x+1600,p.y);
                    
                }
                
            }
            
            
        
    };
    
    BackMountin.prototype.clear = function(context){
        
    };
    
 //   window.BackMountin = BackMountin;
    
//}(window));