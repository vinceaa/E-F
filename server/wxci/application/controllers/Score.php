<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Score extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function update() {
        $userId = $this -> input -> post('userId');
        $score_type = $this -> input -> post('score_type');
        $this -> load -> model('Score_model');
        $query = $this -> Score_model -> check_time($userId, $score_type);
        if ($query == NULL) {
            // echo "暂无时间戳$userId";
            $result = $this -> Score_model -> new_time($userId, $score_type);
            $result = $this -> Score_model -> update_score($userId, $score_type);
        } else {
            // echo "已经存在时间戳";
            $query = $this -> Score_model -> if_update_time($userId, $score_type);
            if ($query == NULL) {
                // echo "在新的一天操作, 需要更新时间戳";
                $result = $this -> Score_model -> update_time($userId, $score_type);
                $result = $this -> Score_model -> update_score($userId, $score_type);
                $result = $this -> Score_model -> update_limit($userId, $score_type);
            } else {
                // echo "在当天操作, 需要检查是否超过限制次数";
                $query = $this -> Score_model -> if_over_limit($userId, $score_type);
                if ($query) {
                    // echo "已经超过当天限制，不再更新积分";
                } else {
                    // echo "还没有超过当天限制，更新积分";
                    $result = $this -> Score_model -> update_score($userId, $score_type);
                    $result = $this -> Score_model -> update_limit($userId, $score_type);
                }

            }
        }

    }

    public function views() {
        $userId = $this -> input -> get('userId');
        $this -> load -> model('Score_model');
        $query = $this -> Score_model -> add_views($userId);
        return $query;
    }









}
?>
