<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Share_model extends CI_Model{



        public function check_user($userId, $token) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('user', $data);
            $finda = $query -> row();
            $saved_token = $finda -> token;
            $result = $saved_token == $token;
            return $result;
        }

        public function new_share($share_type, $userId, $title, $content) {
            $data = array(
                'user_id' => $userId,
                'share_title' => $title,
                'share_content' => $content,
                'share_type' => $share_type,
            );
            $query = $this -> db -> insert('share', $data);
            return $query;
        }

        public function update_share($userId, $title, $content, $share_id) {
            $data = array(
                'share_title' => $title,
                'share_content' => $content,
            );
            echo "update_share content: $content";

            $query = $this -> db -> where('share_id', $share_id);
            $query = $this -> db -> update('share', $data);
            return $query;
        }

        public function delete_share($share_id) {
            $data = array(
                'share_id' => $share_id,
            );
            // echo "update_share content: $content";

            $query = $this -> db -> delete('share', $data);
            return $query;
        }




        public function get_all($share_type) {
            $this->db->order_by('share_id', 'DESC');
            $data = array(
                'share_type' => $share_type,
            );
            // $query = $this -> db -> get_where('share', $data);

            $this -> db -> select('*');
            $this -> db -> from('share');
            $this -> db -> join('user', 'share.user_id = user.user_id');
            // $this -> db -> where('share_type', $share_type);
            $this -> db -> where($data);
            $this -> db -> where('share_title is not null');
            $this -> db -> where('share_content is not null');
            $query = $this -> db -> get();
            $finda = $query -> result();
            $lista = Array();
            foreach ($finda as $key => $value) {
                $ceil = Array();
                $ceil['share'] = $value;
                $share_id = $value -> share_id;
                $ceil['reply_num'] = $this -> get_reply_num($share_id);
                $ceil['thumb_num'] = $this -> get_thumb_num($share_id);
                $lista[$key] = $ceil;
            }
            return $lista;
        }

        public function get_me_create($user_id, $share_type) {
            $this->db->order_by('share_id', 'DESC');
            $data = array(
                'share_type' => $share_type,
                'user_id' => $user_id,
            );
            $query = $this -> db -> get_where('share', $data);
            $finda = $query -> result();
            return $finda;
        }



        public function get_me_reply($user_id, $share_type) {
            $this -> db -> select('*');
            $this -> db -> from('reply');
            // 不用用户也 ok
            // $this -> db -> join('user', 'user.user_id = reply.user_id');
            $this -> db -> join('share', 'share.share_id = reply.share_id');
            $this -> db -> order_by('reply_id', 'DESC');

            $this -> db -> where('reply.user_id', $user_id);
            $this -> db -> where('share.share_type', $share_type);

            $query = $this -> db -> get();

            $finda = $query -> result();


            return $finda;
        }

        public function get_me_r($user_id, $share_type) {

            // echo "share_type：$share_type";
            // 我评论过的，但不是我发布的
            $arr = Array();
            $me_reply = $this -> get_me_reply($user_id, $share_type);
            foreach ($me_reply as $reply) {
                array_push($arr, $reply);
            }


            $lista = Array();
            $seta = Array();
            // 数组去重
            foreach ($arr as $share) {
                $share_id = $share -> share_id;
                if (!in_array($share_id, $lista)) {
                    array_push($lista, $share -> share_id);
                    array_push($seta, $share);

                }
            }
            return $seta;
        }




        public function get_me($user_id, $share_type) {
            $arr = Array();







            $me_reply = $this -> get_me_reply($user_id, $share_type);
            foreach ($me_reply as $reply) {
                array_push($arr, $reply);
            }

            // var_dump($me_reply);
            // die();

            $me_creat = $this -> get_me_create($user_id, $share_type);

            foreach ($me_creat as $creat) {
                array_push($arr, $creat);
            }

            $lista = Array();
            $seta = Array();
            foreach ($arr as $share) {
                $share_id = $share -> share_id;
                if (!in_array($share_id, $lista)) {
                    array_push($lista, $share -> share_id);
                    array_push($seta, $share);

                }
            }



            return $seta;
        }




        public function get_detail($share_id) {
            $this -> db -> select('*');
            $this -> db -> from('share');
            $this -> db -> join('user', 'share.user_id = user.user_id');
            $this -> db -> where('share.share_id', $share_id);
            $query = $this -> db -> get();
            $finda = $query -> row();
            return $finda;
        }

        public function get_reply_num($share_id) {
            $data = array(
                'share_id' => $share_id,
            );
            $query = $this -> db -> get_where('reply', $data);
            $finda = $query -> result();
            return count($finda);
        }

        public function get_thumb_num($share_id) {
            $data = array(
                'share_id' => $share_id,
            );
            $query = $this -> db -> get_where('thumb', $data);
            $finda = $query -> result();
            return count($finda);
        }

        public function search($share_type, $title) {
            $this->db->order_by('share_id', 'DESC');
            $data = array(
                'share_type' => $share_type,
            );

            $this -> db -> select('*');
            $this -> db -> from('share');
            $this -> db -> join('user', 'share.user_id = user.user_id');
            $this -> db -> like('share_title', $title);
            $this -> db -> where($data);
            $query = $this -> db -> get();


            $finda = $query -> result();

            $lista = Array();
            foreach ($finda as $key => $value) {
                $ceil = Array();
                $ceil['share'] = $value;
                $share_id = $value -> share_id;
                $ceil['reply_num'] = $this -> get_reply_num($share_id);
                $ceil['thumb_num'] = $this -> get_thumb_num($share_id);
                $lista[$key] = $ceil;
            }
            return $lista;

        }



        public function get_home($slide_type) {
            $this->db->order_by('slide_id', 'DESC');
            $data = array(
                'slide_type' => $slide_type,
            );
            $query = $this -> db -> get_where('slide', $data);
            $finda = $query -> result();
            return $finda['0'];
        }

        public function get_comu($slide_type) {
            $this->db->order_by('slide_id', 'DESC');
            $data = array(
                'slide_type' => $slide_type,
            );
            $query = $this -> db -> get_where('slide', $data);
            $finda = $query -> result();
            return $finda['0'];
        }

        public function save_home($slide_type, $home_pic) {
            $data = array(
                'home_pic' => $home_pic,
                'slide_type' => $slide_type,
            );
            $query = $this -> db -> insert('slide', $data);
            return $query;
        }

        public function save_comu($home_pic, $slide_type) {
            $data = array(
                'home_pic' => $home_pic,
                'slide_type' => $slide_type,
            );
            $query = $this -> db -> insert('slide', $data);
            return $query;
        }



        public function update_share_cover($cover, $share_type, $userId) {
            $data = array(
                'share_cover' => $cover,
                'share_type' => $share_type,
                'user_id' => $userId,
            );
            $query = $this -> db -> insert('share', $data);


            $data = array(
                'share_type' => $share_type,
            );
            $this->db->order_by('share_id', 'DESC');
            $query = $this -> db -> get_where('share', $data);
            $finda = $query -> result();
            return $finda['0'] -> share_id;
        }

        public function update_cover($share_id, $cover, $share_type, $userId) {
            $data = array(
                'share_cover' => $cover,
                'share_id' => $share_id,
            );
            $query = $this -> db -> where('share_id', $share_id);
            $query = $this -> db -> update('share', $data);
            return $query;
        }


        public function update_share_cover_table($share_id, $title, $content, $share_type, $userId) {
            $data = array(
                'share_title' => $title,
                'share_content' => $content,
            );


            $query = $this -> db -> where('share_id', $share_id);
            $query = $this -> db -> update('share', $data);
            return $query;
        }





















    }
 ?>
