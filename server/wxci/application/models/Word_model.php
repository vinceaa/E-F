<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Word_model extends CI_Model{



        public function if_exist($userId, $word) {
            $data = array(
                'user_id' => $userId,
                'word' => $word,
            );
            $query = $this -> db -> get_where('word', $data);
            $finda = $query -> row();
            return $finda;
        }

        public function new_word($word_string, $userId, $word) {
            $data = array(
                'user_id' => $userId,
                'word_string' => $word_string,
                'word' => $word,
            );
            $query = $this -> db -> insert('word', $data);
            return $query;
        }

        public function get_all($userId) {
            $this->db->order_by('word_id', 'DESC');
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('word', $data);
            $finda = $query -> result();
            return $finda;
        }

        public function get_detail($userId, $wordId) {
            $data = array(
                'user_id' => $userId,
                'word_id' => $wordId,
            );
            $query = $this -> db -> get_where('word', $data);
            $finda = $query -> row();
            return $finda;
        }





    }
 ?>
