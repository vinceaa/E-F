<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Share extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function add() {
        $share_type = $this -> input -> post('share_type');
        $userId = $this -> input -> post('userId');
        $title = $this -> input -> post('title');
        $content = $this -> input -> post('content');

        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> new_share($share_type, $userId, $title, $content);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }


    public function update() {
        $userId = $this -> input -> post('userId');
        $title = $this -> input -> post('title');
        $content = $this -> input -> post('content');
        $share_id = $this -> input -> post('share_id');

        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        // echo "check_user:$userId, $token";
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> update_share($userId, $title, $content, $share_id);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function delete() {
        $userId = $this -> input -> post('userId');
        $share_id = $this -> input -> post('share_id');
        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        // echo "check_user:$userId, $token";
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> delete_share($share_id);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }



    public function add_cover() {
        $share_type = $this -> input -> post('share_type');
        $userId = $this -> input -> post('userId');
        $token = $this -> input -> post('token');
        $cover = $this -> input -> post('cover');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> update_share_cover($cover, $share_type, $userId);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function update_cover() {
        $share_type = $this -> input -> post('share_type');
        $userId = $this -> input -> post('userId');
        $share_id = $this -> input -> post('share_id');
        $token = $this -> input -> post('token');
        $cover = $this -> input -> post('cover');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> update_cover($share_id, $cover, $share_type, $userId);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }



    public function update_cover_table() {
        $share_type = $this -> input -> post('share_type');
        $userId = $this -> input -> post('userId');
        $share_id = $this -> input -> post('share_id');
        $token = $this -> input -> post('token');
        $title = $this -> input -> post('title');
        $content = $this -> input -> post('content');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $query = $this -> Share_model -> update_share_cover_table($share_id, $title, $content, $share_type, $userId);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }





    public function all() {
        $share_type = $this -> input -> get('share_type');
        $this -> load -> model('Share_model');
        $finda = $this -> Share_model -> get_all($share_type);
        echo json_encode($finda);

    }

    public function me() {
        $share_type = $this -> input -> get('share_type');
        $user_id = $this -> input -> get('userId');
        $this -> load -> model('Share_model');
        if ($share_type == 's') {
            $finda = $this -> Share_model -> get_me_r($user_id, $share_type);
            echo json_encode($finda);
        }
        if ($share_type == 't') {
            $finda = $this -> Share_model -> get_me($user_id, $share_type);
            echo json_encode($finda);
        }

    }

    public function detail() {
        $share_id = $this -> input -> get('share_id');
        $this -> load -> model('Share_model');
        $detail = $this -> Share_model -> get_detail($share_id);
        $reply_num = $this -> Share_model -> get_reply_num($share_id);
        $thumb_num = $this -> Share_model -> get_thumb_num($share_id);
        $args['share'] = $detail;
        $args['reply_num'] = $reply_num;
        $args['thumb_num'] = $thumb_num;
        echo json_encode($args);

    }

    public function search() {
        $share_type = $this -> input -> get('share_type');
        $title = $this -> input -> get('content');
        $this -> load -> model('Share_model');
        $finda = $this -> Share_model -> search($share_type, $title);
        echo json_encode($finda);
    }

    public function save_slide_home() {
        $home_pic = $this -> input -> post('home_pic');
        $slide_type = $this -> input -> post('slide_type');

        $this -> load -> model('Share_model');
        $query = $this -> Share_model -> save_home($slide_type, $home_pic);
        return $query;
    }

    public function save_slide_comu() {
        $home_pic = $this -> input -> post('comu_pic');
        $slide_type = $this -> input -> post('slide_type');
        $this -> load -> model('Share_model');
        $query = $this -> Share_model -> save_comu($home_pic, $slide_type);
    }



    public function get_slide_home() {
        $slide_type = $this -> input -> get('slide_type');
        $this -> load -> model('Share_model');
        $finda = $this -> Share_model -> get_home($slide_type);
        echo json_encode($finda);
    }

    public function get_slide_comu() {
        $slide_type = $this -> input -> get('slide_type');
        $this -> load -> model('Share_model');
        $finda = $this -> Share_model -> get_comu($slide_type);
        echo json_encode($finda);
    }








}
?>
