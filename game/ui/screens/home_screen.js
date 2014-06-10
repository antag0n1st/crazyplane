(function(window,undefined){
    
    function HomeScreen(){
        this.initialize();
    }    
    
    HomeScreen.prototype = new Screen();
    HomeScreen.prototype.screen_initialize = HomeScreen.prototype.initialize;    
    HomeScreen.prototype.initialize = function(){        
        this.screen_initialize();
        
        this.play_button = new Button({image:ContentManager.images.button});
        this.play_button.text = "Play Game";
        this.play_button.font_family = 'Sofadi One';
        this.play_button.text_color = "#000000";
        this.play_button.font_size = 22;
        this.play_button.on_mouse_up = HomeScreen.prototype.on_play.bind(this);
        
        this.sound_button = new Button({image:ContentManager.images.button});
        this.sound_button.text = "Sound: ON";
        this.sound_button.font_family = 'Sofadi One';
        this.sound_button.text_color = "#000000";
        this.sound_button.font_size = 22;
        this.sound_button.on_mouse_up = HomeScreen.prototype.on_sound.bind(this);
        
        var background = new Sprite('bg');
        background.z_index = -1;
        
        var mountain = new Sprite('bm1');
        mountain.z_index = 0;
        mountain.set_position(0,100);
        
        var plane = new Plane();
        plane.play('fly');
        plane.set_position(380,240);
        
        this.add_child(background);
        this.add_child(mountain);
        this.add_child(this.play_button);
        this.add_child(this.sound_button);
        this.add_child(plane);
        
        this.play_button.set_position( 320,300);
        this.sound_button.set_position( 320,350);
        
        this.stop_animations = false;
        
        
    };
    
    
    
    HomeScreen.prototype.on_play = function(){
        game.navigator.add(new GameScreen());
    };
    
    HomeScreen.prototype.on_sound = function(){
      
      Config.is_sound_on = !Config.is_sound_on;
      
      if(Config.is_sound_on){
          this.sound_button.text = "Sound: ON";
          Howler.unmute();
      }else{
          this.sound_button.text = "Sound: OFF";
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