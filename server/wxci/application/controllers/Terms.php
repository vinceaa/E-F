<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Terms extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function add() {

        $userId = $this -> input -> post('userId');
        $token = $this -> input -> post('token');
        $word = $this -> input -> post('word');
        $content = $this -> input -> post('content');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Terms_model');
            $query = $this -> Terms_model -> new_terms($userId, $word, $content);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function all() {

        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');
        $word = $this -> input -> get('word');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Terms_model');
            $finda = $this -> Terms_model -> get_all($userId, $word);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }





}
?>
