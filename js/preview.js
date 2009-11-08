$(document).ready(function () {
  $("#rounded").click(function(){
    $("#groupon_widget").toggleClass("rounded_on");
    $("#groupon_box").toggleClass("rounded_on");
  })
})


function preview(elem, hex) {
  switch (elem){
  case "link_color": update_link_color(hex);
  break;
  case "text_color": update_text_color(hex);
  break;
  case "header_footer_color": update_widget_background(hex);
  break;
  case "title_color": update_title(hex);
  break;
  case "main_bg_color": update_main_bg(hex);
  break;
  case "get_it_color": update_get_it_button(hex);
  break;
  case "price_tag_color": update_price_tag(hex);
  break;
  }
}

function update_link_color(hex){
  $(".groupon_widget_text_link").css("color", "#"+hex);
}

function update_text_color(hex){
  $(".groupon_widget_text").css("color", "#"+hex);
}

function update_widget_background(hex){
  $("#groupon_widget").css("background-color", "#"+hex);
}

function update_title(hex){
  $("#groupon_widget h1").css("color", "#"+hex);
}

function update_main_bg(hex){
  $("#groupon_box").css("background-color", "#"+hex);
  $("#groupon_widget #footer a").css("background-color", "#"+hex);
  tri_bord = get_triangle_border_color();
  $("#triangle").css("border-color", "#"+hex+"#67D6F2"+"#"+hex+"#"+hex);
}

function update_get_it_button(hex){
  $("#groupon_widget #get_it").css("background-color", "#"+hex);
}

function update_price_tag(hex){
  $("#price_tag").css("background-color", "#"+hex);
  $("#triangle").css("border-color", "#FFFFFF"+"#"+hex+"#FFFFFF #FFFFFF");
}

function get_triangle_border_color(){
  
}

function update_rounded(){
  
  $("#groupon_widget").toggleClass("rounded_on");
}