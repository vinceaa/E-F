<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Note extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function save() {

        $note_type = $this -> input -> post('note_type');
        $userId = $this -> input -> post('userId');
        $title = $this -> input -> post('title');
        $content = $this -> input -> post('content');
        $token = $this -> input -> post('token');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $query = $this -> Note_model -> new_note($note_type, $userId, $content, $title);
            echo $query;
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function all() {
        $note_type = $this -> input -> get('note_type');
        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $finda = $this -> Note_model -> get_all($note_type, $userId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }


    public function detail() {
        $note_type = $this -> input -> get('note_type');
        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');
        $noteId = $this -> input -> get('noteId');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $finda = $this -> Note_model -> get_detail($note_type, $userId, $noteId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function update() {
        $note_type = $this -> input -> get('note_type');
        $userId = $this -> input -> get('userId');
        $note_id = $this -> input -> get('note_id');
        $token = $this -> input -> get('token');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $query = $this -> Note_model -> update_type($note_type, $userId, $note_id);
            $finda = $this -> Note_model -> get_all($note_type, $userId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function delete() {
        $note_type = $this -> input -> get('note_type');
        $userId = $this -> input -> get('userId');
        $note_id = $this -> input -> get('note_id');
        $token = $this -> input -> get('token');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $query = $this -> Note_model -> delete($note_type, $userId, $note_id);
            $finda = $this -> Note_model -> get_all($note_type, $userId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }

    public function num() {
        $userId = $this -> input -> get('userId');
        $token = $this -> input -> get('token');

        $this -> load -> model('Share_model');
        $result = $this -> Share_model -> check_user($userId, $token);
        if ($result) {
            // echo "是本人";
            $this -> load -> model('Note_model');
            $finda = $this -> Note_model -> get_num($userId);
            echo json_encode($finda);
        } else {
            // echo "不是本人";
            echo 0;
        }
    }









}
?>
