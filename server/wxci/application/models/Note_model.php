<?php

defined('BASEPATH') OR exit('No direct script access allowed');
    class Note_model extends CI_Model{

        public function new_note($note_type, $userId, $content, $title) {
            $data = array(
                'user_id' => $userId,
                'note_type' => $note_type,
                'note_content' => $content,
                'note_title' => $title,
            );
            $query = $this -> db -> insert('note', $data);
            return $query;
        }

        public function get_all($note_type, $userId) {
            $this->db->order_by('note_id', 'DESC');
            $data = array(
                'note_type' => $note_type,
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('note', $data);
            $finda = $query -> result();
            return $finda;
        }

        public function get_detail($note_type, $userId, $noteId) {
            $this->db->order_by('note_id', 'DESC');
            $data = array(
                'note_type' => $note_type,
                'user_id' => $userId,
                'note_id' => $noteId,
            );
            $query = $this -> db -> get_where('note', $data);
            $finda = $query -> row();
            return $finda;
        }

        public function delete($note_type, $userId, $note_id) {
            $data = array(
                'note_id' => $note_id,
            );
            $query = $this -> db -> delete('note', $data);
            return $query;
        }

        public function update_type($note_type, $userId, $note_id) {
            $data = array(
                'note_type' => 'D',
            );
            $query = $this -> db -> where('note_id', $note_id);
            $query = $this -> db -> update('note', $data);
            return $query;
        }

        public function get_num_note($userId) {
            $data = array(
                'user_id' => $userId,
                'note_type' => 'N',
            );
            $query = $this -> db -> get_where('note', $data);
            $finda = $query -> result();
            return count($finda);
        }

        public function get_num_recycle($userId) {
            $data = array(
                'user_id' => $userId,
                'note_type' => 'D',
            );
            $query = $this -> db -> get_where('note', $data);
            $finda = $query -> result();
            return count($finda);
        }

        public function get_num_trans($userId) {
            $data = array(
                'user_id' => $userId,
            );
            $query = $this -> db -> get_where('word', $data);
            $finda = $query -> result();
            return count($finda);
        }

        public function get_num($userId) {
            $note_num = $this -> get_num_note($userId);
            $recycle_num = $this -> get_num_recycle($userId);
            $trans_num = $this -> get_num_trans($userId);
            $args['note_num'] = $note_num;
            $args['recycle_num'] = $recycle_num;
            $args['trans_num'] = $trans_num;
            return $args;
        }










    }
 ?>
