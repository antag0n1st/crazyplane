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
        this.ground = new Sprite("ground");
        this.ground.set_position(0,750);
        this.ground.z_index = 10;
        
        this.front_layer.z_index = 8;
        this.front_mountin.z_index = 5;
        this.back_mountin.z_index = 4;
        this.sky.z_index = 3;
        
        this.add_child(this.front_layer);
        this.add_child(this.front_mountin);
        this.add_child(this.back_mountin);
        this.add_child(this.sky);
        this.front_layer.add_child(this.ground);
                
        plane = this.plane = new Plane();
        this.plane.set_position(300,240);
        this.plane.velocity.setLength(100/1000);
       // log(this.plane.velocity);
        
        this.plane.play('fly');
        
        this.gravity = new Vector(0, 0.000015);
        
        this.up_key = false;
        this.down_key = false;
        this.space_key = false;
        
        this.front_layer.add_child(this.plane);
        
        var that = this;
        
        this.kibo = new Kibo();
        
        this.kibo.down('left', function() {
            that.up_key = true;          
        }).down('right', function() {
            that.down_key = true;
        }).down('space', function() {
            that.space_key = true;
        });
        
        
        this.kibo.up('left', function() {
            that.up_key = false;          
        }).up('right', function() {
            that.down_key = false;
        }).down('space', function() {
            that.space_key = false;
        });
        
        
        
    };   

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    GameScreen.prototype.update = function() { 

        if(this.up_key){
            this.plane.steer_up();
        }
        
        if(this.down_key){
            this.plane.steer_down();
        }
        
        this.plane.velocity.setAngle(Math.degrees_to_radians(this.plane.angle));
        
        
        var v = this.gravity.clone().scale(Ticker.step);
        this.plane.velocity.add(v);
        
        this.plane.rotate_to( Math.radians_to_degrees(this.plane.velocity.getAngle()));
        
        var p = this.plane.get_position();
        p.add(this.plane.velocity.clone().scale(Ticker.step));
        this.plane.set_position(p.x,p.y);
        
        this.plane.smoke();
        
        this.track(this.plane);
        
    };
    
    GameScreen.prototype.track = function(object) {

        var target_pos = object.bounds.pos;
        var pos = this.front_layer.get_position();
        var center_camera = {x: Config.screen_width / 2, y: Config.screen_height / 2};


        var angle = Math.get_angle(center_camera, target_pos);
        var distance = Math.get_distance(center_camera, target_pos);

        //   if(distance > 200){
        var v = new Vector();
        v.setLength(distance);
        v.setAngle(Math.degrees_to_radians(angle));
        pos.sub(v);
        
        
        
//        pos.x = pos.x > 0 ? 0 : pos.x;
//        pos.x = pos.x < -1375 ? -1375 : pos.x;
//        
        pos.y = pos.y < -300 ? -300 : pos.y;

        this.front_layer.set_position(pos.x, pos.y);
        
        var far_k = 0.2;
        var near_k = 0.4;
        
        this.back_mountin.set_position(pos.x*far_k, pos.y*far_k);
        
        this.front_mountin.set_position(pos.x*near_k, pos.y*near_k);
        



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