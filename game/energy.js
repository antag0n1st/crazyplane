(function(window, undefined) {

    function Energy() {
        this.initialize();
    }

    Energy.prototype = new Sprite();
    Energy.prototype.sprite_initialize = Energy.prototype.initialize;
    Energy.prototype.initialize = function() {
        this.sprite_initialize('apple'); // your image name

        this.images = ['apple', 'lemon', 'apple', 'cherry', 'banana'];
        this.z_index = -1;
        this.set_anchor(0.5, 0.5);

        this.min_scale = 0.9;
        this.max_scale = 1;


    };

    Energy.prototype.pulsate = function() {

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

    Energy.prototype.change_image = function() {
        this.image = ContentManager.images[this.images[ Math.random_int(0, this.images.length - 1) ]].image;
        this.set_size(this.image.width, this.image.height);
        this.set_anchor(0.5, 0.5);
    };

    Energy.prototype.on_added_to_parent = function(parent) {
        Drawable.prototype.on_added_to_parent.call(this, parent);

    };

    Energy.prototype.on_remove_from_parent = function(parent) {
        Drawable.prototype.on_remove_from_parent.call(this, parent);

    };

    Energy.prototype.on_draw = function(context) {

    };


    window.Energy = Energy;

}(window));