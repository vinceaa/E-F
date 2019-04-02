<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Thumb_model extends CI_Model{

        public function if_exist($thumb_type, $userId, $shareId) {
            $data = array(
                'user_id' => $userId,
                'share_id' => $shareId,
                'thumb_type' => $thumb_type,
            );
            $query = $this -> db -> get_where('thumb', $data);
            $finda = $query -> row();
            return $finda;
        }


        public function new_thumb($thumb_type, $userId, $shareId) {
            $data = array(
                'user_id' => $userId,
                'share_id' => $shareId,
                'thumb_type' => $thumb_type,
            );
            $query = $this -> db -> insert('thumb', $data);
            return $query;
        }

        public function cancel_thumb($thumb_type, $userId, $shareId) {
            $data = array(
                'user_id' => $userId,
                'share_id' => $shareId,
                'thumb_type' => $thumb_type,
            );
            $query = $this -> db -> delete('thumb', $data);
            return $query;
        }




    }
 ?>
