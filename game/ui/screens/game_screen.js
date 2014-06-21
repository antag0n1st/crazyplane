//(function(window, undefined) {

function GameScreen() {
    this.initialize();
}

GameScreen.prototype = new Screen();
GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

GameScreen.prototype.initialize = function() {
    this.screen_initialize();

    var tutorial = new Tutorial();
    tutorial.z_index = 100;
    this.add_child(tutorial);

    this.front_layer = new FrontLayer();

    this.back_mountin = new BackMountin();
    this.front_mountin = new FrontMountin();

    this.sky = new Sprite("bg");

    this.front_layer.z_index = 8;
    this.front_mountin.z_index = 5;
    this.back_mountin.z_index = 4;
    this.sky.z_index = 3;

    this.add_child(this.front_layer);
    this.add_child(this.front_mountin);
    this.add_child(this.back_mountin);
    this.add_child(this.sky);

    this.plane = new Plane();

    this.plane.set_position(390, 550);
    this.plane.velocity.setLength(0.4);//(0.4);
    this.plane.velocity.rotate(Math.degrees_to_radians(-20));
    this.plane.play('fly');
    this.plane.z_index = 3;
    this.front_layer.add_child(this.plane);

    this.fan = new FanAnimated();
    this.fan.play("blow");
    this.fan.bounds = new Polygon(new Vector(), [
        new Vector(-15, -44),
        //new Vector(-20, -80),
        new Vector(10, -200),
        new Vector(180, -120),
        new Vector(50, 40)
    ]);

    this.fan.set_position(1400, 715);
    this.fan.z_index = 2;
    this.front_layer.add_child(this.fan);

    this.bonuses = [];
    this.max_bonuses_length = 10;
    for (var i = 0; i < this.max_bonuses_length; i++)
    {
        var b = new Orb();
        b.set_position(this.plane.position.x + Math.random_int(600, 3600), Math.random_int(20, 690));
        this.front_layer.add_child(b);
        this.bonuses.push(b);
    }

    this.plane_parts = [];
    this.max_plane_parts_length = 50;

    this.fuel_point = new Fuel();
    this.fuel_point.set_position(Math.random_int(6000, 8000), Math.random_int(50, 700));
    this.front_layer.add_child(this.fuel_point);
    this.fuel_multi = 0.1;

    this.magnet_point = new Magnet();
    this.magnet_point.set_position(Math.random_int(5000, 7000), Math.random_int(50, 700));
    this.front_layer.add_child(this.magnet_point);
    this.magnet_multi = 0.1;
    this.magnet_start = -1;
    this.magnet_duration = 3000; //in px
    this.magnet_plane = new Circle(new Vector(), 300);

    this.rocket_point = new Rocket();
    this.rocket_point.set_position(Math.random_int(4000, 6000), Math.random_int(50, 700));//(1000, 380);
    this.front_layer.add_child(this.rocket_point);
    this.rocket_multi = 0.1;
    this.rocket_start = -1;
    this.rocket_duration = 3000; //in px
    this.old_velocity = this.plane.velocity.len();
    this.velocity_updated = false;

    this.obstacle_point = new Obstacle();
    this.obstacle_point.set_position(Math.random_int(3000, 5000), Math.random_int(100, 700));
    this.front_layer.add_child(this.obstacle_point);
    this.obstacle_collision = false;
    this.show_game_over_alert = false;


    this.gravity = new Vector(0, 0.000015);
    this.aditional_gravity = new Vector(0, 0.000115);//for backward flying

    this.min_velocity = 0.2;//current min velocity of plane

    this.meter_pixel_ratio = 5 / 800;//m/px
    this.pixel_meter_ratio = 800 / 5;//px/m

    this.fall_down = false;

    this.up_key = false;
    this.down_key = false;
    this.space_key = false;

    this.response = new SAT.Response();


    this.hud = new Hud();
    this.hud.z_index = 101;
    this.hud.set_position(0, 0);

    this.add_child(this.hud);

    this.over_alert = new GameOverAlert(1);
    //this.over_alert.set_position(Config.screen_width / 2 - this.over_alert.width / 2, Config.screen_height / 2 - this.over_alert.height / 2);
    this.over_alert.callback = GameScreen.prototype.on_restart_game.bind(this);

    var that = this;

    this.kibo = new Kibo();

    this.kibo.down('left', function() {
        that.up_key = true;
    }).down('up', function() {
        that.up_key = true;
    }).down('right', function() {
        that.down_key = true;
    }).down('down', function() {
        that.down_key = true;
    }).down('space', function() {
        that.space_key = true;
    });


    this.kibo.up('left', function() {
        that.up_key = false;
    }).up('up', function() {
        that.up_key = false;
    }).up('right', function() {
        that.down_key = false;
    }).up('down', function() {
        that.down_key = false;
    }).down('space', function() {
        that.space_key = false;
    });

};



GameScreen.prototype.update = function(dt) {

    //movement

    //backward flying
    if (this.plane.angle < -90 || this.plane.angle > 90)
    {
        if (this.down_key) {
            this.plane.steer_down(dt);
            this.hud.decrease_fuel(dt);
        }
    }
    //foreward flying
    else {
        if (this.up_key && this.hud.fuel > 0) {
            this.plane.steer_up(dt);
            this.hud.decrease_fuel(dt);

        } else if (this.down_key) {
            this.plane.steer_down(dt);
        }
    }

    //hud update
    this.hud.meters = Math.round_decimal(this.plane.position.x * this.meter_pixel_ratio, 1);
    if (this.plane.velocity.len() > 0)
        this.hud.speed = Math.round_decimal(this.plane.velocity.len() * this.pixel_meter_ratio / 20, 1);
    else
        this.hud.speed = 0;

    //magnet mode
    //in magnet mode?
    if (this.magnet_start > 0)
    {
        //magnet mode ends
        if (this.magnet_start + this.magnet_duration <= this.plane.position.x)
        {
            this.magnet_start = -1;
            this.hud.magnet_progress = 0;
        }
        else
        {
            this.magnet_plane.pos = this.plane.bounds.pos;
            //magnet progrees in range [0, 1]
            this.hud.magnet_progress = (this.magnet_start + this.magnet_duration - this.plane.position.x) / this.magnet_duration;
        }
    }



    //rocket mode
    //in rocket mode?
    if (this.rocket_start > 0)
    {
        //var velocoty_updated;
        //rocket mode ends
        if (this.rocket_start + this.rocket_duration <= this.plane.position.x)
        {
            this.rocket_start = -1;
            this.hud.rocket_progress = 0;
            ContentManager.sounds.rocket.stop();
            this.plane.play('fly');
            this.plane.emitter.stop();
            this.plane.bounds = this.plane.plane_bounds;
            this.plane.bounds.rotate( this.plane.velocity.getAngle());
            if (this.velocity_updated)
            {
                this.plane.velocity.setLength(this.old_velocity);
                this.velocity_updated = false;
            }
        }
        else
        {
            if (!this.velocity_updated)
            {
                this.old_velocity = this.plane.velocity.len();
                this.plane.velocity.setLength(this.old_velocity * 5);
                this.plane.velocity.setAngle(0);
                this.velocity_updated = true;
            }
            this.hud.rocket_progress = (this.rocket_start + this.rocket_duration - this.plane.position.x) / this.rocket_duration;
        }
    }





    //gravity
    var v = this.gravity.clone().scale(dt);

    //move plane
    this.plane.velocity.add(v);

    //to show 0 in hud
    if (this.obstacle_collision)
        this.hud.speed = 0;

    if (this.plane.velocity.len() > 0.05)
    {
        this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
    }

    //backward flying
    if (this.plane.angle < -90 || this.plane.angle > 90)
    {
        this.plane.steer_up(dt * 2);
    }

    //deceleration
    if (this.plane.velocity.len() > this.min_velocity)
    {
        this.plane.velocity.scale(0.9975);
    }



    //fly
    var p = this.plane.get_position();
    p.add(this.plane.velocity.clone().scale(dt));
    this.plane.set_position(p.x, p.y);

    //don't go under ground
    if (p.y > 800)
        this.plane.set_position(p.x, 750);

    //this.plane.smoke();


    this.track(this.plane);


    //collisin part


    //plane - floor


    if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground1.bounds, this.response))
    {
        this.handle_plane_to_ground_collision(this.response);
    }
    this.response.clear();

    if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground2.bounds, this.response))
    {
        this.handle_plane_to_ground_collision(this.response);
    }
    this.response.clear();

    if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground3.bounds, this.response))
    {
        this.handle_plane_to_ground_collision(this.response);
    }
    this.response.clear();

    if (SAT.testPolygonPolygon(this.plane.bounds, this.front_layer.ground4.bounds, this.response))
    {
        this.handle_plane_to_ground_collision(this.response);
    }
    this.response.clear();


    //plane fan collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.fan.bounds, this.response))
    {
        var new_angle = this.plane.angle - 1.1;
        this.plane.velocity.setAngle(Math.degrees_to_radians(new_angle));
        this.plane.velocity.scale(1.025);

        this.add_acc += 1.025;
    }
    this.response.clear();

    //plane bonuses collision
    for (var i = 0; i < this.bonuses.length; i++)
    {
        var bonus = this.bonuses[i];
        if (SAT.testPolygonPolygon(this.plane.bounds, bonus.bounds, this.response))
        {
            bonus.set_position(this.plane.position.x + Math.random_int(600, 1800), Math.random_int(0, 690));
            this.hud.speed_progress++;
            ContentManager.sounds.collect.volume(0.2).play();

            //next speed is reached
            if (this.hud.speed_progress >= this.hud.next_speed)
            {
                this.hud.next_speed += this.hud.next_speed * 0.2;//increase for 20% next speed
                this.plane.velocity.scale(1.1);
                this.min_velocity *= 1.1;

                this.hud.speed_progress = 0;
            }
        }
        this.response.clear();
    }

    //plane fuel collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.fuel_point.bounds, this.response))
    {
        var pos_x = 2 * this.fuel_point.position.x + this.fuel_point.position.x * 0.1;

        this.fuel_point.set_position(pos_x, Math.random_int(10, 700));

        //increse energy
        this.hud.increase_fuel();

    }
    this.response.clear();

    //plane magnet collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.magnet_point.bounds, this.response))
    {
        var pos_x = 2 * this.magnet_point.position.x + this.magnet_point.position.x * 0.1;

        this.magnet_point.set_position(pos_x, Math.random_int(10, 700));

        //magnet mode
        this.hud.magnet_progress = 1;
        this.magnet_start = this.plane.position.x;
    }
    this.response.clear();

    //plane rocket collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.rocket_point.bounds, this.response))
    {
        var pos_x = 2 * this.rocket_point.position.x + this.rocket_point.position.x * 0.1;

        this.rocket_point.set_position(pos_x, Math.random_int(10, 700));

        if (this.rocket_start < 0) {
            ContentManager.sounds.rocket.loop(true).volume(0.4).play();
            this.plane.play('rocket');
            this.plane.emitter.run();
            
            var angle = this.plane.angle;
            
            this.plane.rotate_to(0);
            this.plane.bounds = this.plane.get_rocket_bounds();         
            this.plane.rotate_to(angle);    
        }
        //rocket mode
        this.hud.rocket_progress = 1;
        this.rocket_start = this.plane.position.x;

        var hero_tween = new TweenShake(this, 2, null, null, 2000);
        hero_tween.run();

    }

    //plane obstacle collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.obstacle_point.bounds, this.response))
    {
        if (this.response.overlapV.len() > 30 && !this.obstacle_collision)
        {
            this.is_game_over = true;

            this.hud.speed = 0;
            this.plane.remove_from_parent();
            this.plane.velocity = new Vector(0);

            this.obstacle_collision = true;
            ContentManager.sounds.crash.volume(1).play();
            ContentManager.sounds.rocket.stop();

            //create plane parts
            for (var i = 0; i < this.max_plane_parts_length; i++)
            {
                var b = new Plane_part();
                b.set_position(this.obstacle_point.position.x, this.obstacle_point.position.y);
                b.velocity = new Vector();
                b.velocity.setLength(Math.random_float(1, 8));
                b.velocity.rotate(Math.degrees_to_radians(Math.random_int(0, 360)));
                this.front_layer.add_child(b);
                this.plane_parts.push(b);
            }

            this.magnet_start = -1;
            this.hud.magnet_progress = 0;
            this.rocket_start = -1;
            this.hud.rocket_progress = 0;
        }
    }

    this.response.clear();


    //plane explosion
    if (this.obstacle_collision)
    {
        var v = new Vector();
        v.setLength(0.1);
        v.rotate(3.14 / 2);
        for (var i = 0; i < this.max_plane_parts_length; i++)
        {
            var b = this.plane_parts[i];
            b.velocity.add(v);
            b.set_position(b.position.x + b.velocity.x, b.position.y + b.velocity.y);
        }
    }


//magnet plane mode
    if (this.magnet_start > 0)
    {
        for (var i = 0; i < this.bonuses.length; i++)
        {
            var bonus = this.bonuses[i];
            var v = bonus.bounds.pos.clone();

            if (SAT.pointInCircle(v, this.magnet_plane))
            {

                var x_dif = this.plane.position.x - bonus.position.x;
                var y_dif = this.plane.position.y - bonus.position.y;


                var factor = 10 / (Math.get_distance(bonus.position, this.plane.position)) * (this.plane.velocity.len() + 1);

                x_dif *= factor;
                y_dif *= factor;

                bonus.set_position(bonus.position.x + x_dif, bonus.position.y + y_dif);

            }
            this.response.clear();
        }
    }

//game over
    if (this.plane.velocity.len() === 0 && this.plane.position.y > 645 && !this.obstacle_collision && !this.show_game_over_alert)
    {
        this.is_game_over = true;
        this.show_game_over_alert = true;
        this.game_over();
    }

    if (this.obstacle_collision && this.is_game_over && !this.show_game_over_alert)
    {
        var that = this;
        this.show_game_over_alert = true;
        setTimeout(function() {
            that.game_over();
        }, 1500);
    }

//  this.hud.update();
};

GameScreen.prototype.track = function(object) {

    var target_pos = object.bounds.pos;
    var pos = this.front_layer.get_position();
    var center_camera = {x: Config.screen_width / 2 - 200, y: Config.screen_height / 2};


    var angle = Math.get_angle(center_camera, target_pos);
    var distance = Math.get_distance(center_camera, target_pos);

    var v = SAT.pool.get();
    v.setLength(distance);
    v.setAngle(Math.degrees_to_radians(angle));
    pos.sub(v);

    pos.y = pos.y < -300 ? -300 : pos.y;

    this.front_layer.set_position(pos.x, pos.y);

    var far_k = 0.05;
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

            b.set_position(this.plane.position.x + Math.random_int(800, 2800), y);
        }
    }

    //fan desappear when screen pass it and its relocated
    if (this.fan.position.x + 350 < this.plane.position.x)
    {
        this.fan.set_position(this.plane.position.x + Math.random_int(800, 10000), this.fan.position.y);
    }

    //fuel desappear when screen pass it and its relocated
    if (this.fuel_point.position.x + 350 < this.plane.position.x)
    {
        var pos_x = 2 * this.fuel_point.position.x + this.fuel_point.position.x * this.fuel_multi;
        this.fuel_multi += 0.1;
        this.fuel_point.set_position(Math.random_int(pos_x, pos_x + 700), Math.random_int(10, 700));
    }

    //magnet desappear when screen pass it and its relocated
    if (this.magnet_point.position.x + 350 < this.plane.position.x)
    {
        var pos_x = 2 * this.magnet_point.position.x + this.magnet_point.position.x * this.magnet_multi;
        this.magnet_multi += 0.1;
        this.magnet_point.set_position(Math.random_int(pos_x, pos_x + 700), Math.random_int(10, 700));
    }

    //rocket desappear when screen pass it and its relocated
    if (this.rocket_point.position.x + 350 < this.plane.position.x)
    {
        var pos_x = 2 * this.rocket_point.position.x + this.rocket_point.position.x * this.rocket_multi;
        this.rocket_multi += 0.1;
        this.rocket_point.set_position(Math.random_int(pos_x, pos_x + 700), Math.random_int(10, 700));
    }

    //obstacle desappear when screen pass it and its relocated
    if (this.obstacle_point.position.x + 350 < this.plane.position.x)
    {
        var pos_x = 2 * this.obstacle_point.position.x + this.obstacle_point.position.x;
        this.obstacle_point.set_position(Math.random_int(pos_x, pos_x + 700), Math.random_int(10, 700));
    }
};

GameScreen.prototype.handle_plane_to_ground_collision = function(response) {


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

GameScreen.prototype.on_mouse_down = function(event) {
    if (event.point.x < 400) {
        this.up_key = true;
        this.down_key = false;
    } else {
        this.down_key = true;
        this.up_key = false;
    }
}

GameScreen.prototype.on_draw_finished = function(context) {

    // this.magnet_plane.pos;
//    context.beginPath();
//    context.arc(this.magnet_plane.pos.x, this.magnet_plane.pos.y, this.magnet_plane.r, 0, 2 * Math.PI);
//    context.stroke();
//    context.closePath();

};

GameScreen.prototype.on_mouse_up = function(event) {
    this.up_key = false;
    this.down_key = false;

}

GameScreen.prototype.on_mouse_move = function(event) {

    if (event.point.x < 400) {
        this.up_key = true;
        this.down_key = false;
    } else {
        this.up_key = false;
        this.down_key = true;
    }

}

GameScreen.prototype.game_over = function() {

    this.plane.stop();
    ContentManager.sounds.rocket.stop();
    this.plane.emitter.stop();
    this.over_alert.set_position(0, 100);
    this.over_alert.z_index = 100;
    this.over_alert.meters = this.hud.meters;
    if (this.over_alert.meters > this.over_alert.best_meters)
        this.over_alert.best_meters = this.over_alert.meters;
    this.add_child(this.over_alert);

};

GameScreen.prototype.on_restart_game = function() {

    //restartiraj sfe
    this.show_game_over_alert = false;
    this.is_game_over = false;

    this.plane.set_position(390, 550);

    this.front_layer.fg1.set_position(0, 320);
    this.front_layer.fg2.set_position(800, 320);
    this.front_layer.fg3.set_position(1600, 320);
    this.front_layer.fg4.set_position(2400, 320);
    this.front_layer.ground1.set_position(0, 750);
    this.front_layer.ground2.set_position(800, 750);
    this.front_layer.ground3.set_position(1600, 750);
    this.front_layer.ground4.set_position(2400, 750);

    this.front_mountin.fm1.set_position(0, 120);
    this.front_mountin.fm2.set_position(800, 120);

    this.back_mountin.bm1.set_position(0, 100);
    this.back_mountin.bm2.set_position(800, 100);

    this.front_layer.set_position(0, 0);
    this.front_mountin.set_position(0, 0);
    this.back_mountin.set_position(0, 0);
    this.sky.set_position(0, 0);

    this.plane.velocity.setLength(0.4);
    this.plane.velocity.setAngle(Math.degrees_to_radians(-20));
    this.plane.play('fly');
    this.plane.remove_from_parent();
    this.front_layer.add_child(this.plane);
    this.min_velocity = 0.2;
    this.plane.bounds = this.plane.plane_bounds;
    this.plane.bounds.rotate( this.plane.velocity.getAngle());

    if (this.obstacle_collision)
    {
        for (var i = 0; i < this.max_plane_parts_length; i++)
        {
            this.plane_parts[i].remove_from_parent();
        }
    }

    this.plane_parts = [];

    this.obstacle_collision = false;
    this.show_game_over_alert = false;

    this.rocket_start = -1;
    this.magnet_start = -1;
    this.old_velocity = this.plane.velocity.len();
    this.velocity_updated = false;

    //hud restart
    this.hud.fuel = this.hud.max_fuel;
    this.hud.magnet_bg.is_visible = false;
    this.hud.magnet_bar.is_visible = false;
    this.hud.magnet_progress = 0;
    this.hud.rocket_bg.is_visible = false;
    this.hud.rocket_bar.is_visible = false;
    this.hud.rocket_progress = 0;
    this.hud.speed_progress = 0;
    this.hud.next_speed = 10;

    //particles restart
    for (var i in this.bonuses)
    {
        var b = this.bonuses[i];
        b.set_position(this.plane.position.x + Math.random_int(600, 3600), Math.random_int(20, 690));
    }
    this.fuel_point.set_position(Math.random_int(6000, 8000), Math.random_int(50, 700));
    this.magnet_point.set_position(Math.random_int(5000, 7000), Math.random_int(50, 700));
    this.rocket_point.set_position(Math.random_int(4000, 6000), Math.random_int(50, 700));
    this.obstacle_point.set_position(Math.random_int(3000, 5000), Math.random_int(100, 700));
    this.fan.set_position(1400, 715);
    this.max_bonuses_length = 10;


    this.over_alert.remove_from_parent();

};

GameScreen.prototype.show = function() {
    Screen.prototype.show.call(this);
    game.input.add(this);
};

GameScreen.prototype.hide = function() {
    Screen.prototype.hide.call(this);
    game.input.remove(this);
};

//    window.GameScreen = GameScreen;
//
//}(window));
