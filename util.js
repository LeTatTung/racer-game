var Util = {

  //ham lay thoi gian hien tai
  timestamp: function(){
    return new Date.getTime();
  },

  // ham chuyen doi obj ve so nguyen he co so 10
  // parseInt(a, b): a la string can chuyen doi
  // b la he co so
  // tra ve la so dc chuyen doi, neu ko tra ve NaN
  toInt: function(obj, def){
    if (obj !== null){
      var x = parseInt(obj, 10);
      if (!isNaN(x))
        return x;
    }
    return Util.toInt(def, 0);
  },

  toFloat: function(obj, def){
    if(obj !== null){
      var x = parseFloat(obj);
      if (!isNaN(x))
        return x;
    }
    return Util.toFloat(def, 0.0);
  },

  // tra ve thang lon nhat trong 3 tham so dau vao
  limit: function(value, min, max){
    return Math.max(min, Math.min(value, max));
  },

  // tra ve 1 so nguyen nam trong khoang (min, max)
  // Math.round la ham lam tron so
  randomInt: function(min, max){
    return Math.round(Util.interpolate(min, max, Math.random()));
  },

  // tra ve 1 so ngau nhien trong 1 mang options
  randomchoice: function(options){
    return options[Util.randomInt(0, options.length -1)];
  },

  // tinh % cua so du
  percentRemaining: function(n, total){
    return (n % total)/total;
  },

  //ham dieu chinh toc do tuy thuoc vao toc do an phim
  // khi tang toc thi accel se la duong, nguoc lai la am
  accelerate : function(v, accel, dt){
    return v + (accel + dt);
  },

  // tra ve 1 so giua a va b tuy thuoc vao percent
  interpolate: function(a, b, percent){
    return a + (b-a)*percent;
  },

  // ti trong suong mu theo cap so mu
  // Math.pow -> ham tinh theo cap so mu
  // vi du Math.pow(4, 3) = 64
  // density: ti trong
  exponentialFog: function(distance, density){
    return 1 / (Math.pow(Math.E, (distance * distance * density)));
  },

  // cap nhat vi tri ke tu start
  // max thuong se la chieu dai toan bo tuyen duong
  // thuong se co 1 vong lap goi increase
  increase: function(start, increment, max){
    var result = start + increment;
    while(result >= max){
      result -= max;
    }
    while(result < 0){
      result += max;
    }
    return result;
  },

  project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth){
    p.camera.x = (p.world.x || 0) - cameraX;
    p.camera.y = (p.world.y || 0) - cameraY;
    p.camera.z = (p.world.z || 0) - cameraZ;
    p.screen.scale = cameraDepth/p.camera.z;
    p.screen.x = Math.round((width/2) + (p.screen.scale * p.camera.x * width/2));
    p.screen.y = Math.round((height/2) - (p.screen.scale * p.camera.y * height/2));
    p.screen.z = Math.round(p.screen.scale * roadWidth * width/2);
  },

  // noi chong duong di len nhau
  overlap: function(x1, w1, x2, w2, percent){
    var half = (percent || 1)/2;
    var min1 = x1 - (w1*half);
    var max1 = x1 + (w1*half);
    var min2 = x2 - (w2*half);
    var max2 = x2 + (w2*half);
    return !((max1 < min2) || (min1 > max2));
  }
}
