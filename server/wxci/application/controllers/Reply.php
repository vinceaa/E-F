<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Reply extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function add() {
        $reply_type = $this -> input -> post('reply_type');
        $userId = $this -> input -> post('userId');
        $shareId = $this -> input -> post('shareId');
        $content = $this -> input -> post('content');
        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Reply_model');
            $query = $this -> Reply_model -> new_reply($reply_type, $userId, $shareId, $content);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function all() {

        $reply_type = $this -> input -> get('reply_type');
        $shareId = $this -> input -> get('share_id');
        $this -> load -> model('Reply_model');
        $finda = $this -> Reply_model -> get_all($reply_type, $shareId);
        $args['replys'] = $finda;
        echo json_encode($args);
    }





}
?>
