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
        this.plane.bounds = new Polygon(new Vector(), [
            new Vector(-54, 14),
            new Vector(54, -6),
            new Vector(-54, -8)
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

        this.bonuses = [];
        this.max_bonuses_length = 10;
        for (i = 0; i < this.max_bonuses_length; i++)
        {
            var b = new Bonus();
            b.set_position(this.plane.position.x + Math.random_int(600, 2800), Math.random_int(0, 690));
            this.front_layer.add_child(b);
            this.bonuses.push(b);
        }

        this.gravity = new Vector(0, 0.000015);
        this.add_vector = new Vector();
        this.remove_vector = new Vector();

        this.coins = 0;

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
        this.hud.level_points = this.plane.velocity.x + " " + this.plane.velocity.y + "coins: " + this.coins+" angle:"+this.plane.angle;

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
        this.hud.level_points = Math.round_decimal(this.plane.velocity.x, 2) + " " + Math.round_decimal(this.plane.velocity.y, 2) + " " + Math.round_decimal(this.plane.velocity.len(), 2) + " coins: " + this.coins+" angle:"+Math.round_decimal(this.plane.velocity.y, 2) + " " + Math.round_decimal(this.plane.angle,1);




        if (this.add_vector.len() > 0)
        {
//            var v = new Vector(0.01, -0.01);
//            this.add_vector.add(-v);
//            this.remove_vector.add(v);

            //this.plane.velocity.add(v.clone().scale(Ticker.step));
        }

        if (this.remove_vector.len() > 0)
        {
//            var v = new Vector(0.005, 0.005);
//            this.remove_vector.add(-v);

            //this.plane.velocity.add(-v.clone().scale(Ticker.step));
        }

        if (this.up_key && this.hud.level > 0) {
            this.plane.steer_up();
            this.hud.level--;
        } else if (this.down_key) {
            this.plane.steer_down();
        }

        var v = this.gravity.clone().scale(Ticker.step);
        this.plane.velocity.add(v);
        if (this.plane.velocity.len() > 0.05)
        {
            this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
        }

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
            this.plane.velocity.scale(0.98);
            
            if(this.plane.velocity.len()<0.05)
                this.plane.velocity.setLength(0);
            
            
            if(this.plane.angle >= 10 && this.plane.angle<90)
            {
                var a=0;
                if(this.plane.angle>=11)
                    a=this.plane.angle-1;
                else
                    a=10;
                
                this.plane.velocity.setAngle(Math.degrees_to_radians(a));
            }
            
            if(this.plane.angle <10 && this.plane.angle>=0)
                this.plane.velocity.setAngle(Math.degrees_to_radians(10));


            if(this.plane.angle > 90 && this.plane.angle<179)
            {
                var a=0;
                if(this.plane.angle<=178)
                    a=this.plane.angle+1;
                else
                    a=179;
                
                this.plane.velocity.setAngle(Math.degrees_to_radians(a));
            }
            
            if(this.plane.angle <180 && this.plane.angle>=170)
                this.plane.velocity.setAngle(179);

            response.a.pos.sub(response.overlapV);

            this.plane.set_position(this.plane.position.x - response.overlapV.x, this.plane.position.y - response.overlapV.y);
        }
        response.clear();

        //plane fans collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.fans[0].bounds, response))
        {
            this.plane.velocity.add(new Vector(0.009, -0.009));
            this.add_vector.add(new Vector(0.009, -0.009));
            log(this.add_vector);

            //move fan
            this.fans[1].set_position(this.fans[1].position.x + Math.random_int(1500, 3000), this.fans[1].position.y);
        }

        if (SAT.testPolygonPolygon(this.plane.bounds, this.fans[1].bounds, response))
        {
            this.plane.velocity.add(new Vector(0.009, -0.009));

            //move fan
            this.fans[0].set_position(this.fans[0].position.x + Math.random_int(1500, 3000), this.fans[0].position.y);
        }

        //plane bonuses collision
        for (var i in this.bonuses)
        {
            var bonus = this.bonuses[i];
            if (SAT.testPolygonPolygon(this.plane.bounds, bonus.bounds, response))
            {
                log("in");
                bonus.set_position(this.plane.position.x + Math.random_int(600, 1800), Math.random_int(0, 690));
                this.coins++;

                if (this.coins >= 5)
                {
                    var pow = new PowerUp();
                    pow.set_position(this.plane.position.x + 200, this.plane.position.y);
                    this.front_layer.add_child(pow);
                }
            }
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


        //bonuses disapers when are far away from plane
        for (var i in this.bonuses)
        {
            var b = this.bonuses[i];
            if (b.position.x + 1000 < this.plane.position.x)
            {
                b.set_position(this.plane.position.x + Math.random_int(600, 1800), Math.random_int(0, 690));
            }
        }
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