(function(window,undefined){
    
    function HomeScreen(){
        this.initialize();
    }    
    
    HomeScreen.prototype = new Screen();
    HomeScreen.prototype.screen_initialize = HomeScreen.prototype.initialize;    
    HomeScreen.prototype.initialize = function(){        
        this.screen_initialize();
        
        this.play_button = new Button({image:ContentManager.images.play_button});
        
        this.play_button.on_mouse_up = HomeScreen.prototype.on_play.bind(this);
        
        this.sound_button = new Button({image:ContentManager.images.sound_on});
        
        this.sound_button.on_mouse_up = HomeScreen.prototype.on_sound.bind(this);
        
        var background = new Sprite('bg');
        background.z_index = -2;
        
        var ground = new Sprite('ground');
        ground.set_position(0,440);
        
        var backgorund2 = new Sprite('fg2');
        backgorund2.set_position(0,30);
        backgorund2.alpha = 1;
        backgorund2.z_index = 0;
        
        var mountain = new Sprite('bm1');
        mountain.z_index = -1;
        mountain.set_position(0,100);
        
        var rocket = new RocketPlane();
        rocket.set_position(200,100);
        rocket.z_index = 10;
        rocket.play('fly');
        this.add_child(rocket);
        
        this.add_child(background);
        this.add_child(backgorund2);
        this.add_child(mountain);
        this.add_child(this.play_button);
        this.add_child(this.sound_button);
        this.add_child(ground);
        
        this.play_button.set_position( 330,180);
        this.sound_button.set_position( 720,30);
        
        this.stop_animations = false;
        
        
    };
    
    
    
    HomeScreen.prototype.on_play = function(){
        game.navigator.add(new GameScreen());
    };
    
    HomeScreen.prototype.on_sound = function(){
      
      Config.is_sound_on = !Config.is_sound_on;
      
      if(Config.is_sound_on){
          this.sound_button.image = ContentManager.images.sound_on;
          Howler.unmute();
          ContentManager.sounds.collect.play();
      }else{
          this.sound_button.image = ContentManager.images.sound_off;
          Howler.mute();
      }
      
    };
    
    HomeScreen.prototype.show = function(){
        Screen.prototype.show.call(this);
        game.input.add(this.play_button);
        game.input.add(this.sound_button);
        
    };
    
    HomeScreen.prototype.hide = function(){
        Screen.prototype.hide.call(this);
        game.input.remove(this.play_button);
        game.input.remove(this.sound_button);
        this.stop_animations = true;
        
    };
    
    HomeScreen.prototype.update = function(){
        Screen.prototype.update.call(this);
        
    };
    
    HomeScreen.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    HomeScreen.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    
    
    
    
    window.HomeScreen = HomeScreen;
    
}(window));