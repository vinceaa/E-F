<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <base href="<?php echo site_url(); ?>"/>
        <title>index 测试</title>
    </head>
    <body>
        hello index ！
        <form action="index/index" method="post">
            <input type="input" name="username" value="">
            <input type="submit" name="sub" value="提交">
        </form>
        <!-- <form action="index/up" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" name="sub" value="上传图片">
        </form> -->

        <form action="index/do_upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" size="20" multiple="multiple"/>
            <input type="submit" value="upload"/>
        </form>
    </body>
</html>

<!--  -->
