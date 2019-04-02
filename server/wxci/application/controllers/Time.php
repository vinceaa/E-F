<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Time extends CI_Controller {
    public function __construct() {
        parent::__construct();
    }

    public function test() {
        echo "测试一下时间戳";

        //设置北京时间为默认时区
        date_default_timezone_set('PRC');

        //获得当日凌晨的时间戳

        $today = strtotime(date("Y-m-d"),time());
        $current = time();
        echo "当前的时间戳:$current";
        echo '<br>';
        $s = $today > 1529078401;
        echo "当日凌晨:$today"; //1470844800
        var_dump($s);
        echo '<br>';

        $end = $today+60*60*24;

        //验证当天的24点时间戳是否正确
        echo "次日凌晨:$end"; //1470844800

    }









}
?>
