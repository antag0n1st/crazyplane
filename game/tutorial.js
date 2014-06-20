//(function(window,undefined){
    
    function Tutorial(){
        this.initialize();
    }    
    
    Tutorial.prototype = new Sprite();
    Tutorial.prototype.sprite_initialize = Tutorial.prototype.initialize;    
    Tutorial.prototype.initialize = function(){        
        this.sprite_initialize('transparent_black'); // your image name
        
        this.keyboard = new Sprite('keyboard');
        this.keyboard.z_index = 0;
        this.keyboard.set_position((Config.screen_width - this.keyboard.width) / 2 , 150);
        
        this.left_keyboard = new Sprite('left_keyboard');
        this.left_keyboard.set_position(288,223);
        this.left_keyboard.is_visible = false;
        
        this.right_keyboard = new Sprite('right_keyboard');
        this.right_keyboard.set_position(441,223);
        this.right_keyboard.is_visible = false;
        
        this.arrow = new Sprite('arrow');
        this.arrow.is_visible = false;
        this.arrow.set_position(100,70);
        
        this.message = new Label();
        this.message.set({
            text: "Press arrow keys to fly",
            text_align: "left",
            text_valign: 'middle',
            text_color: "#ffffff",
            text_font_name: 'Special Elite',
            text_size: 35
        });
        this.message.set_position(240,350);
       
        
        this.add_child(this.keyboard);
        this.add_child(this.left_keyboard);
        this.add_child(this.right_keyboard);
        this.add_child(this.arrow);
        this.add_child(this.message);
        
        this.time = 0;
        
    };
    
    Tutorial.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Tutorial.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Tutorial.prototype.on_draw = function(context){
        
    };
    
    Tutorial.prototype.update = function(dt){
        this.time += dt;
        
        if(this.time < 1000){
            
        }else if(this.time < 1500){
            this.right_keyboard.is_visible = true;            
        }else if(this.time < 2000){
            this.right_keyboard.is_visible = false; 
            this.left_keyboard.is_visible = true; 
        }else if(this.time < 2500){
            this.right_keyboard.is_visible = true; 
            this.left_keyboard.is_visible = false; 
        }else if(this.time < 3000){
            this.right_keyboard.is_visible = false; 
            this.left_keyboard.is_visible = true; 
        }else if(this.time < 5000){
            this.is_visible = false;
            this.right_keyboard.remove_from_parent();
            this.left_keyboard.remove_from_parent();
            this.keyboard.remove_from_parent();
            this.message.is_visible = false;
        }else if(this.time < 7500){
            this.is_visible = true;
            this.arrow.is_visible = true;
            this.message.set_position(150,95);
            this.message.set({text:"Don't waste your fuel"});
            this.message.is_visible = true;
        }else{
            this.remove_from_parent();
        }
    };
    
    
//    window.Tutorial = Tutorial;
    
//}(window));