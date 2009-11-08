$(function() {
  var defaultTheme ={
    header: {
    color: "ffffff"
    },
    shell: {
        background: "7fb93c",
        color: "000000"
    },
    rounded: "on",
    deal: {
      background: "ffffff",
      link_color: "0981b3"
    },
    buttons: {
      get_it_btn: {
        background: "7fb93c"
      },
      price_tag_btn: {
        background: "67d6f2" 
      }
    }
  }
  
  function mapToDefault(prop){
    switch(prop){
      case "theme[rounded]" :
        return defaultTheme["rounded"];
        break;
      case "theme[link_color]" :
        return defaultTheme["deal"]["link_color"];
        break;
      case "theme[color]" :
        return defaultTheme["shell"]["color"];
        break;
      case "theme[shell_background]" :
        return defaultTheme["shell"]["background"];
        break
      case "theme[deal_title]" :
        return defaultTheme["header"]["color"];
        break;
      case "theme[deal_background]":
        return defaultTheme["deal"]["background"];
        break;
      case "theme[get_it_btn_background]" :
        return defaultTheme["buttons"]["get_it_btn"]["background"];
        break;
      case "theme[price_tag_btn_background]" :
        return defaultTheme["buttons"]["price_tag_btn"]["background"];
        break;
    }
  }
  
  function writeThemeParams(obj){
    var theme = {};
    
    for(var prop in obj){
      if(obj[prop] != mapToDefault(prop)){
        console.log("prop is: " + prop  + " value is: " + obj[prop]);
        console.log(obj[prop]);
        switch(prop){
          case "theme[rounded]" :
             theme["rounded"] = obj[prop];
            break;
          case "theme[link_color]" :
            theme.deal = {};
             theme["deal"]["link_color"] = obj[prop];
            break;
          case "theme[color]" :
            theme.shell = {};
             theme["shell"]["color"] = obj[prop];
            break;
          case "theme[shell_background]" :
            theme.shell = {};
             theme["shell"]["background"] = obj[prop];
            break
          case "theme[deal_title]" :
            theme.header = {};
             theme["header"]["color"] = obj[prop];
            break;
          case "theme[deal_background]":
            theme.deal = {};
             theme["deal"]["background"] = obj[prop];
            break;
          case "theme[get_it_btn_background]" :
            theme.buttons = {};
            theme.get_it_btn = {};
             theme["buttons"]["get_it_btn"]["background"] = obj[prop];
            break;
          case "theme[price_tag_btn_background]" :
            theme.buttons = {};
            theme.price_tag_btn = {};
             theme["buttons"]["price_tag_btn"]["background"] = obj[prop];
            break;
        }
      }
    }
    for (var prop in theme){
      if(theme[prop] == "" || theme[prop] == {})
        delete theme[prop];
      console.log(theme[prop]);
    }
    return theme
  }
  
  $("#widget_builder_form").submit(function(e){
    console.log(e);
    e.preventDefault();
    console.log(writeThemeParams($(e.target).serializeObject()));
  })
  
})

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};