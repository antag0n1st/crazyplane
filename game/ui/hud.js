(function(window, undefined) {

    function Hud() {
        this.initialize();
    }

    Hud.prototype = new Drawable();
    Hud.prototype.drawable_initialize = Hud.prototype.initialize;
    Hud.prototype.initialize = function() {
        this.drawable_initialize();

        this.set_size(Config.screen_width, 50);

        this.speed;
        this.speed_points;
        this.points;

        this.speed_label = new Label();
        this.speed_label.set({
            text: "Energy: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.speed_label.set_position(20, 30);

        this.speed_points_label = new Label();
        this.speed_points_label.set({
            text: "Info: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.speed_points_label.set_position(170, 30);
//        
//        this.points_label = new Label();
//        this.points_label.set({
//            text: "Points: ",
//            text_align: "left",
//            text_valign: 'middle',
//            text_color: "#c4d742",
//            text_font_name: 'Special Elite',
//            text_size: 28
//        });
//        this.points_label.set_position(600, 30);

        //this.add_child(this.speed_label);
        //this.add_child(this.speed_points_label);
        //        this.add_child(this.points_label);


        //fuel part
        this.fuel_bg = new Sprite("fuel_bg");
        this.fuel_bg.set_position(10, 10);
        this.fuel_bar = new Sprite("fuel_bar");
        this.fuel_bar.set_position(70, 16);
        this.max_width = this.fuel_bar.width;

        this.max_fuel = 500; //maximum fuel
        this.fuel = this.max_fuel; //current fuel

        this.add_child(this.fuel_bg);
        this.add_child(this.fuel_bar);



        //speed part
        this.speed_bg = new Sprite("speed_bg");
        this.speed_bg.set_position(260, 14);
        this.speed_bar = new Sprite("speed_bar");
        this.speed_bar.set_position(327, 14);
        //this.speed_bar.width = 0;

        this.speed_progress = 0;
        this.next_speed = 10;

        this.add_child(this.speed_bg);
        this.add_child(this.speed_bar);

        //magnet part
        this.magnet_bg = new Sprite("magnet_bg");
        this.magnet_bg.set_position(12, 60);
        this.magnet_bar = new Sprite("magnet_bar");
        this.magnet_bar.set_position(70, 70);
        this.magnet_bg.is_visible = false;
        this.magnet_bar.is_visible = false;
        this.magnet_progress = 0;

        this.add_child(this.magnet_bg);
        this.add_child(this.magnet_bar);

        //magnet part
        this.rocket_bg = new Sprite("rocket_bg");
        this.rocket_bg.set_position(265, 60);
        this.rocket_bar = new Sprite("rocket_bar");
        this.rocket_bar.set_position(329, 70);
        this.rocket_bg.is_visible = false;
        this.rocket_bar.is_visible = false;
        this.rocket_progress = 0;

        this.add_child(this.rocket_bg);
        this.add_child(this.rocket_bar);

    };

    Hud.prototype.update = function() {
//        this.points_label.set({
//            text: "Points: " + this.points
//        });
        this.speed_points_label.set({
            text: "Info: " + this.speed_points
        });
        this.speed_label.set({
            text: "Fuel: " + this.fuel
        });

        //console.log(this.magnet_progress);
        var fb = this.max_width * this.fuel / this.max_fuel;

        if (fb > 0)
        {
            this.fuel_bar.width = fb;
            this.fuel_bar.is_visible = true;
        }
        else
        {
            this.fuel_bar.visible = true;
        }

        var sb = this.max_width * this.speed_progress / this.next_speed;

        if (sb > 0)
        {
            this.speed_bar.width = sb;
            this.speed_bar.visible = false;
        }
        else
        {
            this.speed_bar.visible = true;
        }

        var mb = this.max_width * this.magnet_progress;

        if (mb > 0)
        {
            console.log(mb);
            this.magnet_bar.width = mb;
            this.magnet_bar.is_visible = true;
            this.magnet_bg.is_visible = true;
        }
        else
        {
            this.magnet_bar.is_visible = false;
            this.magnet_bg.is_visible = false;
        }

        var rb = this.max_width * this.rocket_progress;

        if (rb > 0)
        {
            this.rocket_bar.width = rb;
            this.rocket_bar.is_visible = true;
            this.rocket_bg.is_visible = true;
        }
        else
        {
            this.rocket_bar.is_visible = false;
            this.rocket_bg.is_visible = false;
        }

    };

    Hud.prototype.on_added_to_parent = function(parent) {
        Drawable.prototype.on_added_to_parent.call(this, parent);

    };

    Hud.prototype.on_remove_from_parent = function(parent) {
        Drawable.prototype.on_remove_from_parent.call(this, parent);

    };

    Hud.prototype.draw = function(context) {

    };

    Hud.prototype.clear = function(context) {

    };

    Hud.prototype.increase_fuel = function()
    {
        this.fuel += 100;
        if (this.fuel > 1000)
            this.fuel = 1000;
    };

    Hud.prototype.decrease_fuel = function(dt)
    {
        this.fuel -= (dt / 20);
    };

    Hud.prototype.decrease_magnet = function(dt)
    {
        var mb = this.max_width * this.max_magnet / this.magnet_progress;

        if (mb > 0)
        {
            this.magnet_bar.width = mb;
            this.magnet_bar.is_visible = true;
        }
        else
        {
            this.magnet.is_visible = false;
        }
    };

    window.Hud = Hud;

}(window));