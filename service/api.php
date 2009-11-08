<?php
  error_reporting(E_ALL);
  ini_set("display_errors", 1);
  
  $api = new GrouponAPI();
  echo $api->do_call();
      
    class GrouponAPI {
      private $groupon_api_request_url;
      private $callback;
      private $division;
      
      function __construct() {
        $this->call = $_GET['call'];
        $this->callback = isset($_GET['callback']) ? $_GET['callback'] : "callback";
        $this->division = isset($_GET['city']) ? $_GET['city'] : "chicago";
      }
      
      function do_call() {
        switch ($this->call) {
          case "deals":
            return $this->get_deal();
            break;
        }   
      }
      
      function get_deal(){
        $url = "http://groupon.com/api/v1/" . $this->division . "/deals.json";
        return $this->do_request($url);
      }
      
      function do_request($url){
        $c = curl_init();
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_URL, $url);
        curl_setopt($c, CURLOPT_FOLLOWLOCATION, 1); 
        $contents = curl_exec($c);
        curl_close($c);
        if ($contents) return $this->callback . "(" . $contents . ")";
          else return FALSE;
      }
    }
?>