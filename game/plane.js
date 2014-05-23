//(function(window,undefined){
    
    function Plane(){
        this.initialize();
    }    
    
    Plane.prototype = new Animation();
    Plane.prototype.animation_initialize = Plane.prototype.initialize;    
    Plane.prototype.initialize = function(){        
        
        var sprite_sheet = new SpriteSheet([{
                image: ContentManager.images.paperplane,
                frames: {x: 5, y: 6},
                animations: {
                    fly: {start: 0, end: 23, loop: true, duration: 2400},
                    fly_down: {start: 0, end: 3, loop: false, duration: 400},
                    fly_up: {start: 4, end: 7, loop: false, duration: 400}
                }
                , reg: {x: 0.6, y: 0.5, width: 0.8, height: 0.5}
            }]);

        this.animation_initialize(sprite_sheet);
        
        
        this.velocity = new Vector();
        
        this.rotation = 1/1000;
        
        
        this.smoke_frequency = 20/1000; // per second
        this.smoke_count = 0;
        this.smoke_time = 0;
        
        
        
    };
    
    Plane.prototype.on_mouse_up = function(event){
       // log("plane");
    };
    
    Plane.prototype.steer_up = function(dt){
        this.velocity.rotate(-dt*this.rotation);
    };
    
    Plane.prototype.steer_down = function(dt){
        this.velocity.rotate(dt*this.rotation);
    };
    
    Plane.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Plane.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Plane.prototype.draw = function(context){
        Animation.prototype.draw.call(this,context);
        
        
        
//        if(Config.debug){
//            var pos = this.bounds.pos;
//            var anchor = Vector.addition(pos,this.emiter_point);
//            context.fillStyle="yellow";
//            context.beginPath();
//            context.arc(anchor.x,anchor.y,2,0,2*Math.PI);
//            context.fill();
//            context.closePath();
//            context.fillStyle="black";
//
//            this.debug_bounds(context);
//        }
        
        
    };
    
//    Plane.prototype.rotate_to = function(angle){
//        
//        var a = angle - this.angle;        
//        Drawable.prototype.rotate_to.call(this,angle);
//        this.emiter_point.rotate(Math.degrees_to_radians(a));
//    };
    
    Plane.prototype.clear = function(context){
        
    };
    
    Plane.prototype.update = function(dt){
        Animation.prototype.update.call(this,dt);
        
    };
    
//    window.Plane = Plane;
//    
//}(window));