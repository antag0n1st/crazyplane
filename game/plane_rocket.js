//(function(window,undefined){

function PlaneRocket() {
    this.initialize();
}

PlaneRocket.prototype = new Animation();
PlaneRocket.prototype.animation_initialize = PlaneRocket.prototype.initialize;
PlaneRocket.prototype.initialize = function() {

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

    this.rotation = 1 / 1000;


    this.smoke_frequency = 20 / 1000; // per second
    this.smoke_count = 0;
    this.smoke_time = 0;


    this.bounds = new Polygon(new Vector(), [
        new Vector(-54, 14),
        new Vector(54, -6),
        new Vector(-54, -8)
    ]);

};

PlaneRocket.prototype.on_mouse_up = function(event) {
    // log("plane");
};

PlaneRocket.prototype.steer_up = function(dt) {
    this.velocity.rotate(-dt * this.rotation);
};

PlaneRocket.prototype.steer_down = function(dt) {
    this.velocity.rotate(dt * this.rotation);
};

PlaneRocket.prototype.on_added_to_parent = function(parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);

};

PlaneRocket.prototype.on_remove_from_parent = function(parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);

};

PlaneRocket.prototype.draw = function(context) {
    Animation.prototype.draw.call(this, context);



//        if(Config.debug){
//            var pos = this.bounds.pos;
//            var anchor = Vector.addition(pos,this.emiter_point);
//            context.fillStyle="yellow";
//            context.beginPath();
//            context.arc(anchor.x,anchor.y,2,0,2*Math.PI);
//            context.fill();
//            context.closePath();
//            context.fillStyle="black";
//
//            this.debug_bounds(context);
//        }


};

//    PlaneRocket.prototype.rotate_to = function(angle){
//        
//        var a = angle - this.angle;        
//        Drawable.prototype.rotate_to.call(this,angle);
//        this.emiter_point.rotate(Math.degrees_to_radians(a));
//    };

PlaneRocket.prototype.clear = function(context) {

};

PlaneRocket.prototype.update = function(dt) {
    Animation.prototype.update.call(this, dt);

};

//    window.PlaneRocket = PlaneRocket;
//    
//}(window));