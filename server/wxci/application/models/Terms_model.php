<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Terms_model extends CI_Model{

        public function new_terms($userId, $word, $content) {
            $data = array(
                'user_id' => $userId,
                'word' => $word,
                'terms_content' => $content,
            );
            $query = $this -> db -> insert('terms', $data);
            return $query;
        }

        public function get_all($userId, $word) {
            $data = array(
                'userId' => $userId,
                'word' => $word,

            );
            $this-> db->order_by('terms_id', 'DESC');
            $this -> db -> select('*');
            $this -> db -> from('terms');
            $this -> db -> join('user', 'user.user_id = terms.user_id');
            $this -> db -> where('terms.word', $word);
            $query = $this -> db -> get();
            $finda = $query -> result();
            return $finda;
        }









    }
 ?>
