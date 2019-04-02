<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Index extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
        $data = $this -> input -> post('username');
        echo $data;
		$this->load->view('index/index');
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


    public function response_test() {
        $code = $this -> input -> get('code');
        $appid = 'wxb7611e9cab4982c1';
        $secret = '83de526fba9aeb9c6aa4af7b5d08fd2b';
        $request_path = "https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code";
        $row = $this -> posturl($request_path);
        $dicta = array(
            // 'name' => 'vin',
            // 'code' => $code,
        );
        echo json_encode($row);
    }

    public function do_upload() {
        // echo base_url();
        $root = base_url();
        // $upload_path = $root."assets/uploads/";
        // echo $upload_path;
        $config['upload_path']      = './assets/uploads/';

        // $config['upload_path']      = $upload_path;
        $config['allowed_types']    = 'gif|jpg|png';
        $config['max_size']         = 100;
        $config['max_width']        = 1024;
        $config['max_height']       = 768;

        $this->load->library('upload', $config);

        // if (!$this->upload->do_upload('file')) {
        //     $this->upload->display_errors('<p>', '</p>');
        //     echo "<pre>";
        //     var_dump($this->upload->display_errors('<p>', '</p>'));
        //     echo "</pre>";
        //     // echo "上传图片错误";
        // } else {
        //     $data = array('upload_data' => $this->upload->data());
        //     echo "<pre>";
        //     var_dump($data);
        //     echo "</pre>";
        //     echo "上传图片成功";
        // }
        // var_dump($_FILES);
        if (isset($_FILES['file'])) {
            # code...
            echo "<pre>";
            // var_dump($_FILES['file']);
            var_dump($_FILES);
            echo "</pre>";
        }

    }
}
?>
