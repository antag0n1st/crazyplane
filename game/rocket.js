//(function(window, undefined) {

    function Rocket() {
        this.initialize();
    }

    Rocket.prototype = new Sprite();
    Rocket.prototype.sprite_initialize = Rocket.prototype.initialize;
    Rocket.prototype.initialize = function() {
        this.sprite_initialize('rocket_powerup'); // your image name

        this.z_index = -1;
        this.set_anchor(0.5, 0.5);

        this.min_scale = 0.9;
        this.max_scale = 1;


    };

    Rocket.prototype.pulsate = function() {

        var that = this;

        if (this.scale_x === this.min_scale) {
            var tween = new TweenScale(this, this.max_scale, new Bezier(1, 1, 1, 1), 500, function() {
                that.pulsate();
            });
        } else {
            var tween = new TweenScale(this, this.min_scale, new Bezier(1, 1, 1, 1), 500, function() {
                that.pulsate();
            });
        }


        tween.run();

    };

    Rocket.prototype.on_added_to_parent = function(parent) {
        Drawable.prototype.on_added_to_parent.call(this, parent);

    };

    Rocket.prototype.on_remove_from_parent = function(parent) {
        Drawable.prototype.on_remove_from_parent.call(this, parent);

    };

    Rocket.prototype.on_draw = function(context) {

    };


//    window.Rocket = Rocket;
//
//}(window));