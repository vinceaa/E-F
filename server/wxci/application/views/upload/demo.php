<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <base href="<?php echo site_url(); ?>" />
        <title></title>
    </head>
    <body>
        文件上传测试
        <form action="upload/do_upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" name="sub" value="上传">
        </form>
    </body>
</html>
