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
        
        var fm1 = new Fm1();
        fm1.set_position(0,120);
        var fm2 = new Fm2();
        fm2.set_position(800,120);
        var fm3 = new Fm3();
        fm3.set_position(1600,120);
        
        this.add_child(fm1);
        this.add_child(fm2);
        this.add_child(fm3);
        
        this.sprites.push(fm1);
        this.sprites.push(fm2);
        this.sprites.push(fm3);
        
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
                
                if(sprite.bounds.pos.x < -1600){
                    
                  var p =  sprite.get_position();
                  p.add(new Vector(2400,0));
                  sprite.set_position(p.x,p.y);
                    
                }
                
            }
            
            
        
    };
    
    FrontMountin.prototype.clear = function(context){
        
    };
    
 //   window.FrontMountin = FrontMountin;
    
//}(window));