//(function(window,undefined){
    
    function FrontLayer(){
        this.initialize();
        
        this.sprites = [];
        
        
        var fg1 = new Sprite('fg1');
        fg1.set_position(0,320);
        fg1.z_index = -10;
        var fg2 = new Sprite('fg2');
        fg2.set_position(800,320);
        fg2.z_index = -10;
                
        this.ground1 = new Sprite("ground");
        this.ground1.set_position(0,750);
        
        this.ground2 = new Sprite("ground");
        this.ground2.set_position(800,750);
                
        this.add_child(this.ground1);
        this.add_child(this.ground2);
        this.add_child(fg1);
        this.add_child(fg2);
        
        this.sprites.push(this.ground1);
        this.sprites.push(this.ground2);
        this.sprites.push(fg1);
        this.sprites.push(fg2);
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
        for(var i=0;i<this.sprites.length;i++){
                
                var sprite = this.sprites[i];
                
                if(sprite.bounds.pos.x < -800){
                    
                  var p =  sprite.get_position();
                  p.add(new Vector(1600,0));
                  sprite.set_position(p.x,p.y);
                    
                }
                
            }
    };
    
    FrontLayer.prototype.clear = function(context){
        
    };
    
 //   window.FrontLayer = FrontLayer;
    
//}(window));