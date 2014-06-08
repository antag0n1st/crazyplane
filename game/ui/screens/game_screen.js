//(function(window, undefined) {

function GameScreen() {
    this.initialize();
}

GameScreen.prototype = new Screen();
GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

GameScreen.prototype.initialize = function() {
    this.screen_initialize();

    this.front_layer = new FrontLayer();

    this.back_mountin = new BackMountin();
    this.front_mountin = new FrontMountin();

    this.sky = new Sprite("bg");
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



    this.plane.set_position(390, 550);
    this.plane.velocity.setLength(0.4);//(0.4);
    this.plane.velocity.rotate(Math.degrees_to_radians(-20));
    this.plane.play('fly');
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

    this.fan.set_position(1400, 690);
    this.front_layer.add_child(this.fan);

    this.bonuses = [];
    this.max_bonuses_length = 10;
    for (var i = 0; i < this.max_bonuses_length; i++)
    {
        var b = new Orb();
        b.set_position(this.plane.position.x + Math.random_int(600, 2800), Math.random_int(20, 690));
        this.front_layer.add_child(b);
        this.bonuses.push(b);
    }

    this.fuel_point = new Fuel();
    this.fuel_point.set_position(Math.random_int(4000, 8000), Math.random_int(50, 700));
    this.front_layer.add_child(this.fuel_point);

    this.magnet_point = new Magnet();
    this.magnet_point.set_position(2000, 300);// Math.random_int(50, 700));
    this.front_layer.add_child(this.magnet_point);
    this.magnet_start = -1;
    this.magnet_duration = 3000; //in px
    this.magnet_plane = new Circle(new Vector(), 300);

    this.rocket_point = new Rocket();
    this.rocket_point.set_position(2000, Math.random_int(50, 700));
    this.front_layer.add_child(this.rocket_point);
    this.rocket_start = -1;
    this.rocket_duration = 3000; //in px
    this.old_velocity = this.plane.velocity.len();
    this.velocity_updated = false;


    this.gravity = new Vector(0, 0.000015);
    this.aditional_gravity = new Vector(0, 0.000115);//for backward flying

    this.min_velocity = 0.2;//current min velocity of plane

    this.fall_down = false;

    this.up_key = false;
    this.down_key = false;
    this.space_key = false;

    this.response = new SAT.Response();


    this.hud = new Hud();
    this.hud.z_index = 25;
    this.hud.set_position(0, 0);



//        var tween = new Tween(this.hud, {x: -100, y: -100}, new Bezier(1, 1, 1, 1), 1000, function() {
//
//            var tween = new Tween(this.object, {x: 0, y: 0}, new Bezier(1, 1, 1, 1), 1000, function() {
//
//            });
//            tween.run();
//
//        });
//        tween.run();
    this.hud.speed = 1000;
    this.hud.speed_points = this.plane.velocity.x + " " + this.plane.velocity.y + "speed_point: " + this.speed_point + " angle:" + this.plane.angle;

    this.add_child(this.hud);

    this.over_alert = new GameOverAlert(1);
    //this.over_alert.set_position(Config.screen_width / 2 - this.over_alert.width / 2, Config.screen_height / 2 - this.over_alert.height / 2);
    //this.over_alert.callback = GameScreen.prototype.on_restart_game.bind(this);

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
            //console.log(this.plane.angle);
            this.plane.steer_up(dt);
            this.hud.decrease_fuel(dt);

        } else if (this.down_key) {
            this.plane.steer_down(dt);
        }
    }


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

    this.plane.velocity.add(v);


    if (this.plane.velocity.len() > 0.05)
    {
        this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
    }

    //backward flying
    if (this.plane.angle < -90 || this.plane.angle > 90)
    {
        //additional gravity
//        var v = this.aditional_gravity.clone().scale(Ticker.step);
//        this.plane.velocity.add(v);
//        if (this.plane.velocity.len() > 0.05)
//        {
//            this.plane.rotate_to(Math.radians_to_degrees(this.plane.velocity.getAngle()));
//        }
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


    //plane fan collision
    if (SAT.testPolygonPolygon(this.plane.bounds, this.fan.bounds, this.response))
    {
        var new_angle = this.plane.angle - 0.6;
        this.plane.velocity.setAngle(Math.degrees_to_radians(new_angle));
        this.plane.velocity.scale(1.015);

        this.add_acc += 1.015;
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

        var tween = new TweenTime(0.2, new Bezier(.07, .62, .49, .94), 1000, function() {

            var tween2 = new TweenTime(1, new Bezier(1, .27, .93, .75), 600);
            tween2.run();

        });
        tween.run();

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

        //rocket mode
        this.hud.rocket_progress = 1;
        this.rocket_start = this.plane.position.x;

        var hero_tween = new TweenShake(this, 2, null, null, 3000);
        hero_tween.run();
    }

    this.response.clear();


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

                //console.log(this.plane.velocity.len());

                bonus.set_position(bonus.position.x + x_dif, bonus.position.y + y_dif);

            }
            this.response.clear();
        }
    }

//game over
    if (this.plane.velocity.len() === 0 && this.plane.position.y > 745)
    {
        //this.plane.
        //console.log("game over");
        this.game_over();
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

    var far_k = 0.2;
    var near_k = 0.4;

    this.back_mountin.set_position(pos.x * far_k, pos.y * far_k);
    //console.log(this.back_mountin.bounds.pos);

    this.front_mountin.set_position(pos.x * near_k, pos.y * near_k);
    //console.log(this.front_mountin.bounds.pos);

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

    //fuel desappear when screen pass it and its relocated
    if (this.fuel_point.position.x + 350 < this.plane.position.x)
    {
        var pos_x = 2 * this.fuel_point.position.x + this.fuel_point.position.x * 0.1;
        this.fuel_point.set_position(pos_x, Math.random_int(10, 700));
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

    //console.log(this.magnet_plane.pos);
    // this.magnet_plane.pos;
    //console.log();
//    context.beginPath();
//    context.arc(this.magnet_plane.pos.x, this.magnet_plane.pos.y, this.magnet_plane.r, 0, 2 * Math.PI);
//    context.stroke();
//    context.closePath();

};

GameScreen.prototype.on_mouse_up = function(event) {
    console.log("Touch: UP");
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

    if (!this.is_game_over) {
        this.is_game_over = true;
        this.over_alert.set_position(10, 10);
        this.over_alert.z_index = 100;
        this.add_child(this.over_alert);
    }

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
