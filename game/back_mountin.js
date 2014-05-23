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
        
        var bm1 = new Bm1();
        bm1.set_position(0,100);
        
        var bm2 = new Bm2();
        bm2.set_position(800,100);
        
        this.add_child(bm1);
        this.add_child(bm2);
        
        this.sprites.push(bm1);
        this.sprites.push(bm2);
        
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