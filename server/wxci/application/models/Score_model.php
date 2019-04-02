<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Score_model extends CI_Model{



        public function check_time($userId, $score_type) {

            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('time', $data);
            $finda = $query -> row();
            return $finda;
        }


        public function get_type($score_type) {
            $types = array(
                'reply' => 'reply_limit',
                'thumb' => 'thumb_limit',
                'publish' => 'publish_limit',
                'login' => 'login_limit',
                'author' => 'author_limit',
                'terms' => 'terms_limit',
            );
            $geta = $types[$score_type];
            return $geta;
        }

        public function get_score($score_type) {
            $types = array(
                'reply' => 2,
                'thumb' => 2,
                'publish' => 5,
                'login' => 5,
                'author' => 30,
                'terms' => 10,
            );

            $geta = $types[$score_type];
            return $geta;
        }

        public function get_current_score($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row();
            $current_score = $finda -> score;
            return $current_score;
        }



        public function update_score($userId, $score_type) {
            $score = $this -> get_score($score_type);
            $current_scrore = $this -> get_current_score($userId);
            $new_score = $current_scrore + $score;
            $data = array(
                'score' => $new_score,
            );
            $query = $this -> db -> where('user_id', $userId);
            $query = $this -> db -> update('user', $data);
            return $query;
        }

        public function update_limit($userId, $score_type) {
            $update_type = $this -> get_type($score_type);
            $current_limit = $this -> get_current_limit($userId, $score_type);
            $new_limit = $current_limit + 1;
            $data = array(
                $update_type => $new_limit,
            );
            $query = $this -> db -> where('user_id', $userId);
            $query = $this -> db -> update('time', $data);
            return $query;
        }






        public function new_time($userId, $score_type) {
            date_default_timezone_set('PRC');
            $start_time = strtotime(date("Y-m-d"),time());
            $end_time = $start_time + 60 * 60 * 24;
            $update_type = $this -> get_type($score_type);
            $data = array(
                'user_id' => $userId,
                'start_time' => $start_time,
                $update_type => 1,
            );
            $query = $this -> db -> insert('time', $data);
            return $query;
        }

        public function if_update_time($userId, $score_type) {
            date_default_timezone_set('PRC');
            $start_time = strtotime(date("Y-m-d"),time());
            $data = array(
                'user_id' => $userId,
                'start_time' => $start_time,
            );
            $query = $this -> db -> get_where('time', $data);
            $finda = $query -> row();
            return $finda;
        }

        public function update_time($userId, $score_type) {
            date_default_timezone_set('PRC');
            $start_time = strtotime(date("Y-m-d"),time());
            $data = array(
                'start_time' => $start_time,
                'reply_limit' => 0,
                'thumb_limit' => 0,
                'publish_limit' => 0,
                'login_limit' => 0,
                'author_limit' => 0,
                'terms_limit' => 0,
            );
            $query = $this -> db -> where('user_id', $userId);
            $query = $this -> db -> update('time', $data);
            return $query;
        }




        public function get_current_limit($userId, $score_type) {
            $data = array(
                'user_id' => $userId,
            );
            $type = $this -> get_type($score_type);
            $query = $this -> db -> get_where('time', $data);
            $finda = $query -> row() -> $type;
            return $finda;
        }

        public function get_max_limit($score_type) {
            $types = array(
                'reply' => 5,
                'thumb' => 5,
                'publish' => 3,
                'login' => 1,
                'author' => 3,
                'terms' => 5,
            );

            $geta = $types[$score_type];
            return $geta;
        }



        public function if_over_limit($userId, $score_type) {
            $current_limit = $this -> get_current_limit($userId, $score_type);
            $check_limit = $this -> get_max_limit($score_type);
            return $check_limit == $current_limit;
        }

        public function get_current_views($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row() -> views;
            return $finda;
        }



        public function add_views($userId) {
            $current_views = $this -> get_current_views($userId);
            $new_views = $current_views + 1;
            $data = array(
                'views' => $new_views,
            );
            $query = $this -> db -> where('user_id', $userId);
            $query = $this -> db -> update('user', $data);
            return $query;
        }

















    }
 ?>
