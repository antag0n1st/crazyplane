//(function(window,undefined){
    
    function FrontLayer(){
        this.initialize();
        
        this.sprites = [];
        
        
        this.fg1 = new Sprite('fg1');
        this.fg1.set_position(0,320);
        this.fg1.z_index = -10;
        this.fg2 = new Sprite('fg2');
        this.fg2.set_position(800,320);
        this.fg2.z_index = -10;
        this.fg3 = new Sprite('fg1');
        this.fg3.set_position(1600,320);
        this.fg3.z_index = -10;
        this.fg4 = new Sprite('fg2');
        this.fg4.set_position(2400,320);
        this.fg4.z_index = -10;
                
        this.ground1 = new Sprite("ground");
        this.ground1.set_position(0,750);
        
        this.ground2 = new Sprite("ground");
        this.ground2.set_position(800,750);
        
        this.ground3 = new Sprite("ground");
        this.ground3.set_position(1600,750);
        
        this.ground4 = new Sprite("ground");
        this.ground4.set_position(2400,750);
                
        this.add_child(this.ground1);
        this.add_child(this.ground2);
        this.add_child(this.ground3);
        this.add_child(this.ground4);
        this.add_child(this.fg1);
        this.add_child(this.fg2);
        this.add_child(this.fg3);
        this.add_child(this.fg4);
        
        this.sprites.push(this.ground1);
        this.sprites.push(this.ground2);
        this.sprites.push(this.ground3);
        this.sprites.push(this.ground4);
        this.sprites.push(this.fg1);
        this.sprites.push(this.fg2);
        this.sprites.push(this.fg3);
        this.sprites.push(this.fg4);
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
                
                if(sprite.bounds.pos.x < -1600){
                    
                  var p =  sprite.get_position();
                  
                  sprite.set_position(p.x+3200,p.y);
                    
                }
                
            }
    };
    
    FrontLayer.prototype.clear = function(context){
        
    };
    
 //   window.FrontLayer = FrontLayer;
    
//}(window));