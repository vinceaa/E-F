<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Reply_model extends CI_Model{



        public function new_reply($reply_type, $userId, $shareId, $content) {
            $data = array(
                'user_id' => $userId,
                'share_id' => $shareId,
                'reply_content' => $content,
                'reply_type' => $reply_type,

            );
            $query = $this -> db -> insert('reply', $data);
            return $query;

        }


        public function get_all($reply_type, $shareId) {
            $data = array(
                'reply_type' => $reply_type,
                'shareId' => $shareId, 

            );
            $this -> db -> select('*');
            $this -> db -> from('reply');
            $this -> db -> join('user', 'user.user_id = reply.user_id');
            $this -> db -> where('reply.share_id', $shareId);
            $query = $this -> db -> get();
            $finda = $query -> result();
            return $finda;
        }






    }
 ?>
