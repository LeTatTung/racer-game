var Dom = {
  //lay gia tri 1 phan tu HTMl voi tham so dau vao la id
  get: function(id){
    return ((id instanceof HTMLElement) || (id === document)) ? id : document.getElementById(id);
  },

  // truyen gia tri cho 1 phan tu HTML co id la id voi noi dung la html
  set: function(id, html){
    Dom.get(id).innerHTML = html;
  },

  //lang nghe su kien doi voi phan tu co id la ele
  on: function(ele, type, fn, capture){
    Dom.get(ele).addEventListener(type, fn, capture);
  },

  //xoa, huy bo qua trinh lang nghe su kien doi voi phan tu co id la ele
  un: function(ele, type, fn, capture){
    Dom.get(ele).removeEventListener(type, fn, capture);
  },

  //ham lien quan den viec hien thi 1 phan tu html theo 1 dinh dang type hoac block
  show: function(ele, type){
    Dom.get(ele).style.display = (type || 'block');
  },

  //lam mo
  blur: function(ev){
    ev.target().blur();
  },

  // doi ten cua class html
  toggleClassName: function(ele, name, on){
    ele = Dom.get(ele);
    var classes = ele.classNames.split(' ');
    var n = classes.indexOf(name);
    on = (typeof on == 'undefined') ? (n < 0) : on;
    if(on && (n < 0)){
      classes.push(name);
    }else if(!on && (n >= 0)){
      classes.splice(n,1);
    }
    ele.className = classes.join(' ');
  },

  // them ten cho class html voi id la ele
  addClassName: function(ele, name){
    Dom.toggleClassName(ele, name, true);
  },

  // xoa ten cho class html voi id la ele
  removeClassName: function(ele, name){
    Dom.toggleClassName(ele, name, false);
  }
  storage: window.localStorage || {}
}
