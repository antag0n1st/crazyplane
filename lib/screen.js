(function(window, undefined) {

    function Screen() {
        this.initialize();
    }
    
    Screen.prototype = new Drawable();
    Screen.prototype.drawable_initialize = Screen.prototype.initialize;

    Screen.prototype.initialize = function() {
        this.drawable_initialize();
        this.set_size(Config.screen_width,Config.screen_height );
    };


    Screen.prototype.show = function() {        
        game.stage.add(this);
    };

    Screen.prototype.hide = function() {
        this.remove_from_parent();
    };
    
    Screen.prototype.draw = function(context){};
    Screen.prototype.clear = function(context){};

    Screen.prototype.update = function(dt) {};    
    
    Screen.prototype.update_children = function(children) {

//        if (parent.is_children_sortable) {
//            this.sort_objects(children);
//        }

        var i = children.length;
        var step = Ticker.step*Config.slow_motion_factor;
        while (i--) {
            var child = children[i];
            child.update(step);
            this.update_children(child.get_children());
        }


    };

    window.Screen = Screen;

}(window));