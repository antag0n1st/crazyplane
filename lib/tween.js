//(function(window,undefined){
    
    function Tween(from,to,bezier,duration,callback){
        this.initialize(from,to,bezier,duration,callback);
    }    
    //Tween.prototype = new ParentClassName();
    //Tween.prototype.parent_initialize = Tween.prototype.initialize;    
    Tween.prototype.initialize = function(object,to,bezier,duration,callback){        
    
        this.object = object;
        this.to = to;
        this.bezier = bezier;
        this.duration = duration;  
        this.callback = callback || function(){};
        
        this.start_position = object.get_position();
        
        this.distance_x = to.x - object.position.x;
        this.distance_y = to.y - object.position.y;
        
   
        this.time_passed = 0;
    };
    
    Tween.prototype.run = function(){
        Actions.add(this);
    };
    
    Tween.prototype.stop = function(){
        Actions.remove(this);
    };
    
    Tween.prototype.step = function(dt){
        
        this.time_passed += dt;
        
        var s = this.time_passed / this.duration;
        
        s = (s >= 1) ? 1.0 : s;
        
        var bstep = this.bezier.get(s);
        
        this.object.set_position(this.start_position.x+this.distance_x*bstep,this.start_position.y+this.distance_y*bstep);
                
        if(s===1){
            this.callback();
            Actions.remove(this);
        }
        
    };
    
//    window.Tween = Tween;
//    
//}(window));