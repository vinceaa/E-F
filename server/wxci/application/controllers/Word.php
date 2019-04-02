<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Word extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function save() {

        $userId = $this -> input -> post('userId');
        $word_string = $this -> input -> post('word_string');
        $word = $this -> input -> post('word');
        $token = $this -> input -> post('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Word_model');
            $ifExist = $this -> Word_model -> if_exist($userId, $word);
            if ($ifExist) {
                echo 0;
            } else {
                $query = $this -> Word_model -> new_word($word_string, $userId, $word);
                echo $query;
            }
        } else {
            // echo "不是本人";
            echo 0;
        }
    }


    public function all() {
        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');
        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Word_model');
            $finda = $this -> Word_model -> get_all($userId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }

    }


    public function detail() {
        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');
        $wordId = $this -> input -> get('wordId');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Word_model');
            $finda = $this -> Word_model -> get_detail($userId, $wordId);
            echo json_encode($finda);

        } else {
            // echo "不是本人";
            echo 0;
        }
    }




}
?>
