<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    class Mark extends CI_Controller{
        public function __construct() {
            parent::__construct();
        }

        public function demo() {
            // echo "<div>hahaha</div>";
            // echo "<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529219428427&di=8dfcf744ccd39b56e03dd19bb96def30&imgtype=0&src=http%3A%2F%2Ff2.topitme.com%2F2%2F6a%2Fbc%2F113109954583dbc6a2o.jpg'/>";
            // echo "![](http://ww1.sinaimg.cn/large/005Xtdi2jw1f9e6ii0bsgj30xc04gaau.jpg)]";
            // echo "##asd";
            echo "<image src='http://127.0.0.1/phptest/wxci/assets/uploads/e8a79b4dd7a5a42878d032c78ef1e244.jpg'></image>";
        }

        public function detail() {
            $share_id = $this -> input -> get('share_id');
            $this -> load -> model('Share_model');
            $detail = $this -> Share_model -> get_detail($share_id);
            $reply_num = $this -> Share_model -> get_reply_num($share_id);
            $thumb_num = $this -> Share_model -> get_thumb_num($share_id);
            $mark_content = $detail -> share_content;
            echo json_encode($mark_content);
        }





    }

 ?>
