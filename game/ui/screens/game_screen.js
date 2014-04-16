(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();  
        
        this.front_layer = new FrontLayer();
        this.back_mountin = new BackMountin();
        this.front_mountin = new FrontMountin;
        this.sky = new Sky();
        
        this.front_layer.z_index = 8;
        this.front_mountin.z_index = 5;
        this.back_mountin.z_index = 4;
        this.sky.z_index = 3;
        
        this.add_child(this.front_layer);
        this.add_child(this.front_mountin);
        this.add_child(this.back_mountin);
        this.add_child(this.sky);
        
        
                
        this.plane = new Plane();
        this.plane.set_position(300,240);
        this.plane.play('fly');
        
        this.up_key = false;
        this.down_key = false;
        
        this.front_layer.add_child(this.plane);
        
        var that = this;
        
        this.kibo = new Kibo();
        
        this.kibo.down('left', function() {
            that.up_key = true;          
        }).down('right', function() {
            that.down_key = true;
        });
        
        
        this.kibo.up('left', function() {
            that.up_key = false;          
        }).up('right', function() {
            that.down_key = false;
        });
        
    };   

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    GameScreen.prototype.update = function() {
        
        var p = this.back_mountin.get_position();
        
        var speed = 100/1000;
        
        var py = -this.plane.velocity.y*0.2;
        
        p.sub(new Vector(speed*Ticker.step, 0));
        this.back_mountin.set_position(p.x, p.y + py);
        
        p.scale(1.5);
        
        this.front_mountin.set_position(p.x, p.y);
        
        

        if(this.up_key){
            this.plane.steer_up();
        }
        
        if(this.down_key){
            this.plane.steer_down();
        }
        
        var y = Math.sin(Math.degrees_to_radians(this.plane.angle));
        this.plane.velocity.setY(y*3);
        
        var p = this.plane.get_position();
        p.add(this.plane.velocity);
        this.plane.set_position(p.x,p.y);
        
        this.plane.smoke();
        

    };

    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
        game.input.add(this.plane);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    window.GameScreen = GameScreen;

}(window));