var Game = {

  run: function(options){
    Game.loadImages(options.images, function(images){
      // hinh anh se dc load va game se san sang
      options.ready(images);
      Game.setKeyListener(options.keys);

      var canvas = options.canvas;
      var update = options.update;
      var render = options.render;
      var step = options.step;
      var stats = options.stats;
      var now = null;
      var last = Util.timestamp();
      var dt = 0;
      var gdt = 0;

      function frame(){
        now = Util.timestamp();
        // su dung requestAnimationFrame cho phep xu ly do tre lon gay ra do
        // hien tuong ngu dong tren background hoac do cac tab chay an ko nhin thay
        dt = Math.min(1, (now - last)/1000);
        gdt = gdt + dt;
        while (gdt > step){
          gdt = gdt - step;
          update(step);
        }
        render();
        stats.update();
        last = now;
        requestAnimationFrame(frame, canvas);
      }
      // bat dau khoi chay
      frame();
      Game.playMusic();
    });
  },

  // ham load image va goi den tat ca image khi da dc load thanh cong
  loadImages: function(names, callback){
    var result = [];
    var count = names.length;

    //khi load toan bo anh xong thi goi callBack
    var onLoad = function(){
      if (--count == 0){
        callback(result);
      }
    };
    for (var n = 0; n < names.length; n++){
      var name = names[n];
      result[n] = document.createElement('img');
      Dom.on(result[n], 'load', onLoad);
      result[n].src = "images/" + name + ".png";
    }
  },

  //ham nhan su kien nhan hay tha phim
  setKeyListener: function(keys){

    var onkey = function(keyCode, mode){
      var k;
      for (var n = 0; n < keys.length ; n++){
        k = keys[n];
        k.mode = k.mode || 'up';
        if ((k.key == keyCode) || (k.keys && (k.key.indexOf(keyCode) > 0))){
          if (k.mode == mode){
            k.action.call();
          }
        }
      }
    }
    Dom.on(document, 'keydown', function(ev){
      onkey(ev.keyCode, 'down');
    });
    Dom.on(document, 'keyup', function(ev){
      onkey(ev.keyCode, 'up');
    });
  },

  // xay dung bo dem cua FPS cung voi hop tin nhan good/bad/ok
  stats: function(parentId, id){

    var result = new Stats();
    result.domElement.id = id || 'stats';
    Dom.get(parentId).appenChild(result.domElement);

    var msg = document.createElement('div');
    msg.style.cssText = "border: 2px solid gray; padding: 5px; margin-top: 5px; text-align: left; font-size: 1.15em; text-algin: right;";
    msg.innerHTML = "You canvas iperformance is ";
    Dom.get(parentId).appenChild(msg);

    var value = document.createElement('span');
    value.innerHTML = "...";
    msg.appenChild(value);

    // thay doi mau tuy thuoc vao fps
    setInterval(function(){
      var fps = result.current();
      var ok = (fps > 50) ? 'good'  : (fps < 30) ? 'bad' : 'ok';
      var color = (fps > 50) ? 'green' : (fps < 30) ? 'red' : 'gray';
      value.innerHTML = ok;
      value.style.color = color;
      msg.style.borderColor = color;
    }, 5000);
    return result;
  },

  // ham bat nhac
  playMusic: function(){

    var music = Dom.get('music');
    music.loop = true;
    music.volume = 0.05;
    music.muted = (Dom.storage.muted === "true");
    music.play();
    Dom.toggleClassName('mute', 'on', music.muted);
    Dom.on('mute', 'click', function(){
      Dom.storage.muted = music.muted = !music.muted;
      Dom.toggleClassName('mute', 'on', music.muted);
    });
  }
}
