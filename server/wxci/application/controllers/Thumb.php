<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Thumb extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function add() {
        $thumb_type = $this -> input -> post('thumb_type');
        $userId = $this -> input -> post('userId');
        $shareId = $this -> input -> post('shareId');
        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Thumb_model');
            $query = $this -> Thumb_model -> if_exist($thumb_type, $userId, $shareId);
            if ($query == NULL) {
                $query = $this -> Thumb_model -> new_thumb($thumb_type, $userId, $shareId);
            } else {
                $query = $this -> Thumb_model -> cancel_thumb($thumb_type, $userId, $shareId);
            }
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }







}
?>
