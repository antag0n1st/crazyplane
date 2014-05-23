(function(window, undefined) {

    function Hud() {
        this.initialize();
    }

    Hud.prototype = new Drawable();
    Hud.prototype.drawable_initialize = Hud.prototype.initialize;
    Hud.prototype.initialize = function() {
        this.drawable_initialize();

        this.set_size(Config.screen_width, 50);

        this.level;
        this.level_points;
        this.points;

        this.level_label = new Label();
        this.level_label.set({
            text: "Energy: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.level_label.set_position(20, 30);

        this.level_points_label = new Label();
        this.level_points_label.set({
            text: "Info: ",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#c4d742",
            text_font_name: 'Special Elite',
            text_size: 28
        });
        this.level_points_label.set_position(170, 30);
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

        this.add_child(this.level_label);
        this.add_child(this.level_points_label);
        //        this.add_child(this.points_label);
        
        
        //energy part
        this.energy_bar = new Sprite("energy_bar");
        this.energy_bar.set_position(10, 10);
        this.energy_bar.set_scale(0.5);
        this.max_width=this.energy_bar.width;
        
        this.max_energy = 1000; //maximum energy
        this.energy = this.max_energy; //current energy
        
        this.add_child(this.energy_bar);
        
        
        //level part
        this.level_bar = new Sprite("level_bar");
        this.level_bar.set_position(310, 10);
        this.level_bar.set_scale(0.5);
        this.level_bar.width=0;
        
        this.level_progress = 0;
        this.next_level=10;
        
        this.add_child(this.level_bar);
        
        //magnet part
        this.magnet_bar = new Sprite("magnet_bar");
        this.magnet_bar.set_position(10, 60);
        this.magnet_bar.set_scale(0.5);
        this.magnet_bar.width=0;
        
        this.magnet_progress = 0;
        this.next_magnet=3;
        
        this.add_child(this.magnet_bar);
        
        //magnet part
        this.rocket_bar = new Sprite("rocket_bar");
        this.rocket_bar.set_position(310, 60);
        this.rocket_bar.set_scale(0.5);
        this.rocket_bar.width=0;
        
        this.rocket_progress = 0;
        this.next_rocket=3;
        
        this.add_child(this.rocket_bar);
        
    };

    Hud.prototype.update = function() {
//        this.points_label.set({
//            text: "Points: " + this.points
//        });
        this.level_points_label.set({
            text: "Info: " + this.level_points
        });
        this.level_label.set({
            text: "Energy: " + this.energy
        });
        
        //console.log(this.magnet_progress);
        this.energy_bar.width=(this.max_width*this.energy/this.max_energy);
        this.level_bar.width=(this.max_width*this.level_progress/this.next_level);
        this.magnet_bar.width=(this.max_width*this.magnet_progress/this.next_magnet);
        this.rocket_bar.width=(this.max_width*this.rocket_progress/this.next_rocket);
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
    
    Hud.prototype.increase_energy = function()
    {
        this.energy+=100;
        if(this.energy>1000)
            this.energy=1000;
    };
    
    Hud.prototype.decrease_energy = function()
    {
        this.energy--;
    };

    window.Hud = Hud;

}(window));