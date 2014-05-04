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

        this.plane.set_position(390, 550);
        this.plane.velocity.setLength(0.4);
        this.plane.velocity.rotate(Math.degrees_to_radians(-20));
        this.plane.play('fly');
        this.front_layer.add_child(this.plane);

        this.fan = new Fan();
        this.fan.set_position(1400, 690);
        this.front_layer.add_child(this.fan);

        this.bonuses = [];
        this.max_bonuses_length = 10;
        for (var i = 0; i < this.max_bonuses_length; i++)
        {
            var b = new Orb();
            b.set_position(this.plane.position.x + Math.random_int(600, 2800), Math.random_int(0, 690));
            this.front_layer.add_child(b);
            this.bonuses.push(b);
        }

        this.energy_point = new Energy();
        this.energy_point.set_position(2000, Math.random_int(50, 700));
        this.front_layer.add_child(this.energy_point);

        this.magnet_count = 0;
        this.magnet_point = new Magnet();
        this.magnet_point.set_position(2000, Math.random_int(50, 700));
        this.front_layer.add_child(this.magnet_point);
        this.magnet_start = -1;
        this.magnet_plane = new Circle(new Vector(), 300);

        this.rocket_count = 0;
        this.rocket_point = new Rocket();
        this.rocket_point.set_position(2000, Math.random_int(50, 700));
        this.front_layer.add_child(this.rocket_point);

        this.gravity = new Vector(0, 0.000015);
        this.min_velocity = 0.2;

        this.coins = 0;
        this.next_pow_coins = 5;


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
        this.hud.level_points = this.plane.velocity.x + " " + this.plane.velocity.y + "coins: " + this.coins + " angle:" + this.plane.angle;

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
        //hud
        this.hud.level_points = Math.round_decimal(this.plane.velocity.x, 2) + " " + Math.round_decimal(this.plane.velocity.y, 2) + " " + Math.round_decimal(this.plane.velocity.len(), 2) + " coins: " + this.coins + " angle:" + Math.round_decimal(this.plane.velocity.y, 2) + " " + Math.round_decimal(this.plane.angle, 1);

        //movement
        if (this.up_key) {// && this.hud.level > 0) {
            this.plane.steer_up();
            this.hud.level--;
        } else if (this.down_key) {
            this.plane.steer_down();
        }

        //magnet mode
        //in magnet mode?
        if (this.magnet_start > 0)
        {
            //magnet mode ends
            if (this.magnet_start + 1000 <= this.plane.position.x)
            {
                this.magnet_start = -1;
            }
            else
            {
                this.magnet_plane.pos = new Vector(this.plane.position.x, this.plane.position.y);
                //this.plane.bounds = this.magnet_plane;
            }
        }

        //gravity
        var v = this.gravity.clone().scale(Ticker.step);
        this.plane.velocity.add(v);
        if (this.plane.velocity.len() > 0.05)
        {
            this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
        }

        //deceleration
        if (this.plane.velocity.len() > this.min_velocity)
        {
            this.plane.velocity.scale(0.9975);
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

   
            if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground1.bounds, response))
            {
                this.handle_plane_to_ground_collision(response);
            }
            response.clear();
            
            if ( SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground2.bounds, response))
            {
                this.handle_plane_to_ground_collision(response);
            }
            response.clear();
     
        
        



        //plane fan collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.fan.bounds, response))
        {
            var new_angle = this.plane.angle - 1;
            this.plane.velocity.setAngle(Math.degrees_to_radians(new_angle));
            this.plane.velocity.scale(1.02);

            this.add_acc += 1.02;
        }
        response.clear();

        //plane bonuses collision
        for (var i = 0; i < this.bonuses.length;i++)
        {
            var bonus = this.bonuses[i];
            if (SAT.testPolygonPolygon(this.plane.bounds, bonus.bounds, response))
            {
                bonus.set_position(this.plane.position.x + Math.random_int(600, 1800), Math.random_int(0, 690));
                this.coins++;

                if (this.coins >= this.next_pow_coins)
                {
                    this.next_pow_coins += this.next_pow_coins * 0.2;
                    this.plane.velocity.scale(1.1);
                    this.min_velocity *= 1.1;

                    this.coins = 0;
                }
            }
            response.clear();
        }

        //plane energy collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.energy_point.bounds, response))
        {
            var pos_x = 2 * this.energy_point.position.x + this.energy_point.position.x * 0.1;

            this.energy_point.set_position(pos_x, Math.random_int(10, 700));

            this.hud.level += 500;

            if (this.hud.level >= 1000)
            {
                this.hud.level = 1000;
            }
        }
        response.clear();

        //plane magnet collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.magnet_point.bounds, response))
        {
            var pos_x = 2 * this.magnet_point.position.x + this.magnet_point.position.x * 0.1;

            this.magnet_point.set_position(pos_x, Math.random_int(10, 700));

            //magnet mode
            this.magnet_count++;
            if (this.magnet_count > 0)
            {
                this.magnet_count = 0;
                this.magnet_start = this.plane.position.x;
            }
        }
        response.clear();

        //plane rocket collision
        if (SAT.testPolygonPolygon(this.plane.bounds, this.rocket_point.bounds, response))
        {
            var pos_x = 2 * this.rocket_point.position.x + this.rocket_point.position.x * 0.1;

            this.rocket_point.set_position(pos_x, Math.random_int(10, 700));

            //rocket mode
            this.rocket_count++;
        }
        response.clear();


        //magnet plane mode
        if (this.magnet_start > 0)
        {
            for (var i = 0; i< this.bonuses.length; i++)
            {
                var bonus = this.bonuses[i];
                var v = new V(bonus.bounds.pos.x, bonus.bounds.pos.y);
               
                if (SAT.pointInCircle(v, this.magnet_plane))
                {
                    log(this.coins + 1 + " " + bonus.position.x);
                    bonus.set_position(this.plane.position.x + Math.random_int(600, 1800), Math.random_int(0, 690));
                    this.coins++;

                    if (this.coins >= this.next_pow_coins)
                    {
                        this.next_pow_coins += this.next_pow_coins * 0.2;
                        this.plane.velocity.scale(1.1);
                        this.min_velocity *= 1.1;

                        this.coins = 0;
                    }
                }
                response.clear();
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

        var v = new Vector();
        v.setLength(distance);
        v.setAngle(Math.degrees_to_radians(angle));
        pos.sub(v);

        pos.x -= 200;
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
            if (b.position.x + 350 < this.plane.position.x)
            {
                var y;
                //plane is near to floor
                if (this.plane.position.y < 300)
                    y = Math.random_int(0, 600);
                //plane is high generate bonus near to plane
                else
                    y = this.plane.position.y + Math.random_int(-300, 300);

                b.set_position(this.plane.position.x + Math.random_int(800, 1800), y);
            }
        }

        //fan desappear when screen pass it and its relocated
        if (this.fan.position.x + 350 < this.plane.position.x)
        {
            this.fan.set_position(this.plane.position.x + Math.random_int(4500, 5500), this.fan.position.y);
        }

        //energy desappear when screen pass it and its relocated
        if (this.energy_point.position.x + 350 < this.plane.position.x)
        {
            var pos_x = 2 * this.energy_point.position.x + this.energy_point.position.x * 0.1;
            this.energy_point.set_position(pos_x, Math.random_int(10, 700));
        }

        //magnet desappear when screen pass it and its relocated
        if (this.magnet_point.position.x + 350 < this.plane.position.x)
        {
            var pos_x = 2 * this.magnet_point.position.x + this.magnet_point.position.x * 0.1;
            this.magnet_point.set_position(pos_x, Math.random_int(10, 700));
        }

        //rocket desappear when screen pass it and its relocated
        if (this.rocket_point.position.x + 350 < this.plane.position.x)
        {
            var pos_x = 2 * this.rocket_point.position.x + this.rocket_point.position.x * 0.1;
            this.rocket_point.set_position(pos_x, Math.random_int(10, 700));
        }
    };

    GameScreen.prototype.handle_plane_to_ground_collision = function(response){
        
        
                this.plane.velocity.scale(0.98);

                if (this.plane.velocity.len() < 0.05)
                    this.plane.velocity.setLength(0);


                if (this.plane.angle >= 10 && this.plane.angle < 90)
                {
                    var a = 0;
                    if (this.plane.angle >= 11)
                        a = this.plane.angle - 1;
                    else
                        a = 10;

                    this.plane.velocity.setAngle(Math.degrees_to_radians(a));
                }

                if (this.plane.angle < 10 && this.plane.angle >= 0)
                    this.plane.velocity.setAngle(Math.degrees_to_radians(10));


                if (this.plane.angle > 90 && this.plane.angle < 179)
                {
                    var a = 0;
                    if (this.plane.angle <= 178)
                        a = this.plane.angle + 1;
                    else
                        a = 179;

                    this.plane.velocity.setAngle(Math.degrees_to_radians(a));
                }

                if (this.plane.angle < 180 && this.plane.angle >= 170)
                    this.plane.velocity.setAngle(179);

                response.a.pos.sub(response.overlapV);

                this.plane.set_position(this.plane.position.x - response.overlapV.x, this.plane.position.y - response.overlapV.y);
            
        
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