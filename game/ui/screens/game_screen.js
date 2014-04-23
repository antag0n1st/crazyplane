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
        this.ground.set_position(0, 750);
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

        this.plane = new Plane();
        this.plane.bounds = new SAT.Polygon(new SAT.Vector(), [
            new SAT.Vector(-54, 14),
            new SAT.Vector(54, -6),
            new SAT.Vector(-54, -8)
//new SAT.Vector(-14, 14),
//            new SAT.Vector(94, -6),
//            new SAT.Vector(-14, -8)
        ]);

        this.plane.set_position(300, 240);
        this.plane.velocity.setLength(200 / 1000);
        this.plane.play('fly');
        this.front_layer.add_child(this.plane);

        this.fans = [];
        var fan = new Fan();
        fan.set_position(1400, 690);
        this.front_layer.add_child(fan);
        this.fans.push(fan);
        fan = new Fan();
        fan.set_position(2400, 690);
        this.front_layer.add_child(fan);
        this.fans.push(fan);

        this.gravity = new Vector(0, 0.000015);

        this.fall_down = false;

        this.up_key = false;
        this.down_key = false;
        this.space_key = false;




        this.hud = new Hud();
        this.hud.z_index = 25;
        this.hud.set_position(0, -100);

        var tween = new Tween(this.hud, {x: 0, y: -100}, new Bezier(1, 1, 1, 1), 1000, function() {

            var tween = new Tween(this.object, {x: 0, y: 0}, new Bezier(1, 1, 1, 1), 1000, function() {

            });
            tween.run();

        });
        tween.run();
        this.hud.level = 1000;
        this.hud.level_points = this.plane.velocity.x+" "+this.plane.velocity.y;

        this.add_child(this.hud);


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
        this.hud.level_points = Math.round_decimal(this.plane.velocity.x, 2)+" "+Math.round_decimal(this.plane.velocity.y, 2) +" "+ Math.round_decimal(this.plane.velocity.len(),2);

        if (this.up_key && this.hud.level > 0) {
            this.plane.steer_up();
            this.hud.level--;
        } else if (this.down_key) {
            this.plane.steer_down();
        }

        //this.plane.velocity.setAngle(Math.degrees_to_radians(this.plane.angle));


        var v = this.gravity.clone().scale(Ticker.step);
        this.plane.velocity.add(v);

//if(!this.fall_down)
        this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
//    else
//        if(this.plane.angle!=0)
//            this.plane.rotate_to(10);


        //fly
        var p = this.plane.get_position();
        p.add(this.plane.velocity.clone().scale(Ticker.step));
        this.plane.set_position(p.x, p.y);

        this.plane.smoke();

        this.track(this.plane);


        //collisin part
        var response = new SAT.Response();

        //plane - floor
        if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground1.bounds, response)
                || SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground2.bounds, response))
        {
//            this.gravity = new Vector(0, 0);
//            this.plane.velocity = new Vector(0, 0);

//this.fall_down=true;

//this.gravity = new Vector(0,0);


            var v = (new Vector(0, -0.001)).scale(Ticker.step);
            this.plane.velocity.add(v);


            var bounce = response.overlapN;

//            log(response.a.pos);
//            log(response.b.pos);
//            log(plane.position);
//            log(plane.bounds.pos); 

            response.a.pos.sub(response.overlapV);

            // log(response.overlapV);


            this.plane.set_position(this.plane.position.x - response.overlapV.x, this.plane.position.y - response.overlapV.y);
            //  log(response);
            //this.plane.velocity.setLength(10 / 1000);


            //this.plane.velocity.setLength(0);
            //this.plane.rotate_to(10);
        }
        response.clear();

        //plane fans collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.fans[0].bounds, response))
        {
            this.plane.velocity.add(new Vector(0, -0.2));

            //move fan
            this.fans[1].set_position(this.fans[1].position.x + Math.random_int(1500, 3000), this.fans[1].position.y);
        }
        
        if (SAT.testPolygonPolygon(this.plane.bounds, this.fans[1].bounds, response))
        {
            this.plane.velocity.add(new Vector(0, -0.2));

            //move fan
            this.fans[0].set_position(this.fans[0].position.x + Math.random_int(1500, 3000), this.fans[0].position.y);
        }

        this.hud.update();
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

        this.back_mountin.set_position(pos.x * far_k, pos.y * far_k);

        this.front_mountin.set_position(pos.x * near_k, pos.y * near_k);


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