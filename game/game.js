//(function(window) {

function Game() {
    this.initialize();
}



Game.prototype.initialize = function() {

    this.stage = new Stage();

    this.input = new Input();

    this.input.add_listener('stage');

    this.paused = false;
    this.pause_callback = function() {
    };
    this.music = null;
    this.click = false;
    this.navigator = new Navigator();
    
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////  LOADING SCREEN ASSETS ////////////////////////////////
    
    ContentManager.add_image('lights1', 'assets/images/lights1.png');
    ContentManager.add_image('lights2', 'assets/images/lights2.png');
    ContentManager.add_image('logo', 'assets/images/logo.png');
    ContentManager.add_image('loading_fr', 'assets/images/loading_fr.png');
    ContentManager.add_image('loading_bg', 'assets/images/loading_bg.png');
                            
                            // DON'T ADD ASSETS HERE !!!
                            
    ////////////////////////////////////////////////////////////////////////////
    
    window.game = this;

    ContentManager.download_images(this.stage, function() {
        
        
        ////////////////////////////////////////////////////////////////////////
        //////////////////////   LOAD YOUR ASSETS HERE   ///////////////////////

        ContentManager.add_image('dot', 'assets/images/dot.png');
        ContentManager.add_image('anchor', 'assets/images/anchor.png');

        ContentManager.add_image('blank_black', 'assets/images/blank_black.png');
        ContentManager.add_image('blank_black_highlighted', 'assets/images/blank_black_highlighted.png');
        ContentManager.add_image('fan', 'assets/images/fan.png');
        ContentManager.add_image('bm1', 'assets/images/mountin_1.png');
        ContentManager.add_image('bm2', 'assets/images/mountin_2.png');
        ContentManager.add_image('bg', 'assets/images/background.png');
        ContentManager.add_image('ground', 'assets/images/ground.png');
        ContentManager.add_image('paperplane', 'assets/images/paperplane.png');
        ContentManager.add_image('rocket_animated', 'assets/images/rocket_animated.png');
        ContentManager.add_image('smoke', 'assets/images/smoke.png');
        
        ContentManager.add_image('speed_bar', 'assets/images/speed_bar.png');
        ContentManager.add_image('speed_bg', 'assets/images/speed_bg.png');
        ContentManager.add_image('fuel_bar', 'assets/images/fuel_bar.png');
        ContentManager.add_image('fuel_bg', 'assets/images/fuel_bg.png');
        ContentManager.add_image('fuel_powerup', 'assets/images/fuel_powerup.png');
        ContentManager.add_image('magnet_bar', 'assets/images/magnet_bar.png');
        ContentManager.add_image('magnet_bg', 'assets/images/magnet_bg.png');
        ContentManager.add_image('magnet_powerup', 'assets/images/magnet_powerup.png');
        ContentManager.add_image('rocket_bar', 'assets/images/rocket_bar.png');
        ContentManager.add_image('rocket_bg', 'assets/images/rocket_bg.png');
        ContentManager.add_image('rocket_powerup', 'assets/images/rocket_powerup.png');
        ContentManager.add_image('ninja_star', 'assets/images/ninja_star.png');
        ContentManager.add_image('plane_part', 'assets/images/plane_part.png');
        ContentManager.add_image('keyboard', 'assets/images/keyboard.png');
        ContentManager.add_image('left_keyboard', 'assets/images/left_keyboard.png');
        ContentManager.add_image('right_keyboard', 'assets/images/right_keyboard.png');
        ContentManager.add_image('transparent_black', 'assets/images/transparent_black.png');
        ContentManager.add_image('arrow', 'assets/images/arrow.png');
        ContentManager.add_image('alert', 'assets/images/alert.png');
        
        ContentManager.add_image('message_box', 'assets/images/message_box.png');
        ContentManager.add_image('button', 'assets/images/button.png');

        ContentManager.add_image('bg1', 'assets/images/bg1.png');
        ContentManager.add_image('bg2', 'assets/images/bg2.png');
        ContentManager.add_image('fg1', 'assets/images/fg1.png');
        ContentManager.add_image('fg2', 'assets/images/fg2.png');
        ContentManager.add_image('orb', 'assets/images/orb.png'); 
        
        ContentManager.add_image('play_button', 'assets/images/play_button.png');
        ContentManager.add_image('sound_off', 'assets/images/sound_off_button.png');
        ContentManager.add_image('sound_on', 'assets/images/sound_on_button.png');
        ContentManager.add_image('home_screen_background', 'assets/images/home_screen_background.png');
        
        ContentManager.add_sound('collect','assets/sounds/collect');
        ContentManager.add_sound('rocket','assets/sounds/rocket');
        ContentManager.add_sound('crash','assets/sounds/crash');
        
        ////////////////////////////////////////////////////////////////////////

        game.navigator.add(new LoadingScreen());
        Ticker.add_listener(game);
        // Targeting 30 FPS
        Ticker.set_fps(30);
        Ticker.start();
        
        ContentManager.download_resources(this.stage, function() {
           // window.setTimeout(function(){
                game.start();
           // },1500);
        });


    });



};




Game.prototype.start = function() {
    var screen = new HomeScreen();
    this.navigator.add(screen);
};


/**
 * It pauses the game , and call back should display other stage
 * @param {type} callback
 * @returns {undefined}
 */
Game.prototype.pause = function(callback) {

    this.paused = true;
    this.pause_callback = callback || function() {
    };

};


Game.prototype.tick = function() {

    this.stage.clear_canvas();

    

    this.navigator.update();

    Actions.run();

    // check if the game is paused
    if (this.paused) {
        Ticker.stop();
        this.paused = !this.paused;
        this.pause_callback();
    }


    if (Config.debug) {
        this.stage.debug_grid();
    }

    this.stage.draw();

    SAT.pool.reset();

};

//    window.Game = Game;
//
//}(window));
