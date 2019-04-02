<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class User_model extends CI_Model{



        public function get_user($openid) {
            $data = array(
                'openId' => $openid,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row();
            return $finda;
        }

        public function if_exsit($openid) {
            $data = array(
                'openId' => $openid,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row();
            return $finda;
        }

        public function new_user($openid, $session_key) {
            $salt = 'vin2018';
            $encryption = sha1($salt.$session_key);
            $data = array(
                'openId' => $openid,
                'token' => $encryption,

            );
            $query = $this -> db -> insert('user', $data);
            return $query;
        }

        public function update_user($openid, $session_key) {

            $salt = 'vin2018';
            $encryption = sha1($salt.$session_key);
            $data = array(
                'token' => $encryption,
            );

            $this -> db -> where('openId', $openid);
            $query = $this -> db -> update('user', $data);
            return $query;
        }

        public function save_avatar($userId, $userInfo) {
            $data = array(
                'username' => $userInfo -> nickName,
                'avatar' => $userInfo -> avatarUrl,
            );
            $this -> db -> where('user_id', $userId);
            $query = $this -> db -> update('user', $data);
            return $query;
        }



        public function get_score_nums($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('user', $data);
            $score = $query -> row() -> score;
            $views = $query -> row() -> views;
            $finda['score'] = $score;
            $finda['views'] = $views;
            return $finda;
        }

        public function get_thumb_nums($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('thumb', $data);
            $finda = $query -> result();
            return count($finda);
        }



        public function get_nums($userId) {
            $score_num = $this -> get_score_nums($userId)['score'];
            $views_num = $this -> get_score_nums($userId)['views'];
            $thumb_num = $this -> get_thumb_nums($userId);
            $args['score_num'] = $score_num;
            $args['views_num'] = $views_num;
            $args['thumb_num'] = $thumb_num;
            return $args;
        }

        public function get_me_rank($userId) {
            $this->db->order_by('score', 'DESC');
            $query = $this -> db -> get('user');
            $finda = $query -> result();
            $rank_num = 0;
            foreach ($finda as $key => $value) {
                if ($value -> user_id == $userId) {
                    $rank_num = $key + 1;
                }

            }
            return $rank_num;
        }

        public function get_all_rank($userId) {
            $this->db->order_by('score', 'DESC');
            $query = $this -> db -> get('user');
            $finda = $query -> result();
            return $finda;
        }

        public function get_me_info($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row();
            return $finda;
        }





        public function get_rank($userId) {
            $me = $this -> get_me_info($userId);
            $me_rank = $this -> get_me_rank($userId);
            $all_rank = $this -> get_all_rank($userId);
            $args['me_rank'] = $me_rank;
            $args['all_rank'] = $all_rank;
            $args['me'] = $me;
            return $args;
        }












    }
 ?>
