function preview(elem, hex) {
  switch (elem){
  case "link_color": update_link_color(hex);
  case "text_color": update_text_color(hex);
  // case "header_footer_color": update_widget_background(hex);
  // case "title_color": update_title(hex);
  // case "main_bg_color": update_main_bg(hex);
  // case "get_it_color": update_get_it_button(hex);
  // case "price_tag_color": update_price_tag(hex);
  //case "rounded-input": ;
  }
}

function update_link_color(hex){
  $(".groupon_widget_text_link").each(function(){
    console.log($(this));
  })
  $(".groupon_widget_text_link").css("color", "#"+hex);
}

function update_text_color(hex){
  $(".groupon_widget_text").css("color", "#"+hex);
  $(".groupon_widget_text").each(function(){
    console.log($(this));
  })
}

// function update_widget_background(hex){
//   $("#groupon_widget").css("background-color", "#"+hex);
// }
// 
// function update_title(hex){
//   $("#groupon_widget h1").css("color", "#"+hex);
// }
// 
// function update_main_bg(hex){
//   $("#groupon_box").css("background-color", "#"+hex);
//   $("#groupon_widget #footer a").css("background-color", "#"+hex);
// }
// 
// function update_get_it_button(hex){
//   $("#groupon_widget #get_it").css("background-color", "#"+hex);
// }
// 
// function update_price_tag(hex){
//   $("#price_tag").css("background-color", "#"+hex);
//   $("#triangle").css("border-color", "#FFFFFF"+"#"+hex+"#FFFFFF #FFFFFF");
// }
