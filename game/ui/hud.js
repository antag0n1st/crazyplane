(function(window, undefined) {

    function Hud() {
        this.initialize();
    }

    Hud.prototype = new Drawable();
    Hud.prototype.drawable_initialize = Hud.prototype.initialize;
    Hud.prototype.initialize = function() {
        this.drawable_initialize();

        this.set_size(Config.screen_width, 50);

        this.speed = 0;
        this.meters = 0;

        this.speed_label = new Label();
        this.speed_label.set({
            text: "Speed: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.speed_label.set_position(600, 70);
        
        this.meters_label = new Label();
        this.meters_label.set({
            text: "Meters: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.meters_label.set_position(600, 30);

        this.add_child(this.meters_label);
        this.add_child(this.speed_label);
        //        this.add_child(this.points_label);


        //fuel part
        this.fuel_bg = new Sprite("fuel_bg");
        this.fuel_bg.set_position(10, 10);
        this.fuel_bar = new Sprite("fuel_bar");
        this.fuel_bar.set_position(70, 16);
        this.max_width = this.fuel_bar.width;

        this.max_fuel = 1000; //maximum fuel
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
        this.meters_label.set({
            text: "Meters: " + this.meters
        });
        this.speed_label.set({
            text: "Speed: " + this.speed +" m/s"
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
            this.speed_bar.is_visible = true;
        }
        else
        {
            this.speed_bar.is_visible = false;
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
        this.fuel += 300;
        if (this.fuel > this.max_fuel)
            this.fuel = this.max_fuel;
    };

    Hud.prototype.decrease_fuel = function(dt)
    {
        this.fuel -= (dt / 5);
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