//(function(window,undefined){

function Plane() {
    this.initialize();
}

Plane.prototype = new Animation();
Plane.prototype.animation_initialize = Plane.prototype.initialize;
Plane.prototype.initialize = function() {

    var sprite_sheet = new SpriteSheet([{
            image: ContentManager.images.paperplane,
            frames: {x: 5, y: 6},
            animations: {
                fly: {start: 0, end: 23, loop: true, duration: 2400},
                fly_down: {start: 0, end: 3, loop: false, duration: 400},
                fly_up: {start: 4, end: 7, loop: false, duration: 400}
            }
            , reg: {x: 0.6, y: 0.5, width: 0.8, height: 0.5}
        },
    {
            image: ContentManager.images.rocket_animated,
            frames: {x: 1, y: 2},
            animations: {
                rocket: {start: 0, end: 1, loop: true, duration: 100}
            }
            , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
        }]);

    this.animation_initialize(sprite_sheet);

this.emiter_point = new Vector(-115, 0);
    this.emitter = new Emitter(this.position, null, Smoke, 15 / 1000);

    this.velocity = new Vector();

    this.rotation = 1 / 1000;


 this.plane_bounds = new Polygon(new Vector(), [
        new Vector(-54, 14),
        new Vector(54, -6),
        new Vector(-54, -8)
    ]);


    this.bounds = this.plane_bounds;

};

Plane.prototype.get_rocket_bounds = function(){
    var rocket_bounds = new Polygon(new Vector(), [
        new Vector(0, 0),
        new Vector(29, -4),
        new Vector(46, 4),
        new Vector(86, 3),
        new Vector(126, 18),
        new Vector(92, 36),
        new Vector(47, 38),
        new Vector(34, 45),
        new Vector(4, 44)
    ]);
    rocket_bounds.translate(-62, -22);
    return rocket_bounds;
};

Plane.prototype.on_mouse_up = function(event) {
    // log("plane");
};

Plane.prototype.steer_up = function(dt) {
    this.velocity.rotate(-dt * this.rotation);
};

Plane.prototype.steer_down = function(dt) {
    this.velocity.rotate(dt * this.rotation);
};

Plane.prototype.on_added_to_parent = function(parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);
    this.emitter.layer = parent;

};

Plane.prototype.on_remove_from_parent = function(parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);

};


Plane.prototype.clear = function(context) {

};

Plane.prototype.update = function(dt) {
    Animation.prototype.update.call(this, dt);
    this.emitter.emission_point = this.get_position().add(this.emiter_point);
};

//    window.Plane = Plane;
//    
//}(window));