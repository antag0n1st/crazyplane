//(function(window,undefined){

function RocketPlane() {
    this.initialize();
}

RocketPlane.prototype = new Animation();
RocketPlane.prototype.animation_initialize = RocketPlane.prototype.initialize;
RocketPlane.prototype.initialize = function() {

    var sprite_sheet = new SpriteSheet([{
            image: ContentManager.images.rocket_animated,
            frames: {x: 1, y: 2},
            animations: {
                fly: {start: 0, end: 1, loop: true, duration: 100}
            }
            , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
        }]);

    this.animation_initialize(sprite_sheet);


    this.emiter_point = new Vector(-115, 0);
    this.emitter = new Emitter(this.position, null, Smoke, 15 / 1000);
    this.emitter.run();

    this.velocity = new Vector();

};

RocketPlane.prototype.on_added_to_parent = function(parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);
    this.emitter.layer = parent;

};

RocketPlane.prototype.on_remove_from_parent = function(parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);

};

RocketPlane.prototype.update = function(dt) {
    Animation.prototype.update.call(this, dt);

    this.emitter.emission_point = this.get_position().add(this.emiter_point);
};

RocketPlane.prototype.clear = function(context) {

};

RocketPlane.prototype.steer_up = function(dt) {
    this.velocity.rotate(-dt * this.rotation);
};

RocketPlane.prototype.steer_down = function(dt) {
    this.velocity.rotate(dt * this.rotation);
};

//    window.RocketPlane = RocketPlane;

//}(window));