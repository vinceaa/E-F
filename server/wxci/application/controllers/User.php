<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function posturl($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        $jsoninfo = json_decode($output, true);
        return $jsoninfo;
    }

    public function login() {
        $if_reset = $this -> input -> get('if_reset');
        $code = $this -> input -> get('code');
        // $appid = 'wxb7611e9cab4982c1';
        // $secret = '83de526fba9aeb9c6aa4af7b5d08fd2b';
        $appid = 'wxce0dc058870a1663';
        $secret = '315d8fd7daeb3376bbc6b03b5e68a3d3';

        $request_path = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code";
        $row = $this -> posturl($request_path);

        $openid = $row['openid'];
        $session_key = $row['session_key'];
        $this -> load -> model('User_model');


        if ($if_reset == 1) {
            $finda = $this -> User_model -> if_exsit($openid);
            if ($finda == NULL) {
                $query = $this -> User_model -> new_user($openid, $session_key);
            } else {
                $query = $this -> User_model -> update_user($openid, $session_key);
            }


            if ($query == 0) {
                echo 0;
            }
        }

        $finda = $this -> User_model -> get_user($openid);
        $args['userId'] = $finda -> user_id;
        $args['token'] = $finda -> token;
        echo json_encode($args);
    }

    public function get_avatar() {
        $userInfo = $this -> input -> get('userInfo');
        $userId = $this -> input -> get('userId');
        $this -> load -> model('User_model');
        $query = $this -> User_model -> save_avatar($userId, json_decode($userInfo));
        echo $query;
    }

    public function get_num_info() {
        $userId = $this -> input -> get('userId');
        $this -> load -> model('User_model');
        $finda = $this -> User_model -> get_nums($userId);
        echo json_encode($finda);
    }

    public function get_rank() {
        $userId = $this -> input -> get('userId');
        $this -> load -> model('User_model');
        $finda = $this -> User_model -> get_rank($userId);
        echo json_encode($finda);
    }






}
?>
