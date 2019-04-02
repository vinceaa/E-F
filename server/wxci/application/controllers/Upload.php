<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Upload extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $this -> load -> view('/upload/demo');
    }

    public function do_upload() {
        // echo "do_upload";
        $root = base_url();
        $config['upload_path']      = './assets/uploads/';

        $config['allowed_types']    = 'gif|jpg|png';
        $config['max_size']         = 0;
        $config['max_width']        = 0;
        $config['max_height']       = 0;
        $config['encrypt_name']     = True;


        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('file')) {
            $this->upload->display_errors('<p>', '</p>');
            echo "<pre>";
            var_dump($this->upload->display_errors('<p>', '</p>'));
            echo "</pre>";
            echo "上传图片错误";
        } else {
            $data = array('upload_data' => $this->upload->data());
            // echo "<pre>";
            // var_dump($data);
            $filename = $this -> upload -> data()['file_name'];
            // var_dump($filename);
            echo $filename;

            // echo "</pre>";
            // echo "上传图片成功";
        }

    }








}
?>
