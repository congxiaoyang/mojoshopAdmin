/**
 * Created by dell on 2017/4/20.
 */


var objUrl1;
var imgBase641="";    //banner

$("#bannerPic").click(function () {
    $(this).on("change",function(){

        objUrl1 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl1) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase641 = this.result; //就是base64
        }

    });
});

var objUrl2;
var imgBase642="";    //  专栏图

$("#columnPic").click(function () {
    $(this).on("change",function(){

        objUrl2 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl2) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase642 = this.result; //就是base64
        }

    });
});

var objUrl3;
var imgBase643="";    // 活动背景

$("#activityBg").click(function () {
    $(this).on("change",function(){

        objUrl3 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl3) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase643 = this.result; //就是base64
        }

    });
});

var objUrl4;
var imgBase644="";    //   logo

$("#logo").click(function () {
    $(this).on("change",function(){

        objUrl4 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl4) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase644 = this.result; //就是base64
        }

    });
});

var objUrl5;
var imgBase645="";    //  按钮

$("#activityBtnBg").click(function () {
    $(this).on("change",function(){

        objUrl5 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl5) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase645 = this.result; //就是base64
        }

    });
});


//  点击“完成”按钮，向后台请求 传递参数
$("#submit").click(function () {
    var adMoney = $("#adMoney").val();  //广告价格
    var entryFee = $("#entryFee").val();  // 报名费
    var status = $("input[name=status]:checked").val();  //状态
    var type = $("input[name=type]:checked").val();   // 类型
    var hostIntro = $("#hostIntro").val();   // 举办方简介
    var hostName = $("#hostName").val();   // 举办方名称
    var activityTheme = $("#activityTheme").val();   // 活动主题

    var ueHtml = $(document.getElementById('baidu_editor_0').contentWindow.document.body).html();

    var startTime = $("#startTime").val();   // 开始时间
    var endTime = $("#endTime").val();   // 结束时间

    if(adMoney!=""&&entryFee!=""&&hostIntro!=""&&hostName!=""&&activityTheme!=""&&startTime!=""&&endTime!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/ad/insert",
            dataType:"json",
            data:{
                "logo":imgBase644,
                "backImage":imgBase643,
                "buttonImage":imgBase645,
                "bannerImage":imgBase641,
                "smallImage":imgBase642,

                "startWithTime":startTime,
                "endWithTime":endTime,

                "price":adMoney,  //广告价格
                "signupMoney":entryFee,   //报名费

                "status":status,  //状态
                "occupy":type,  //类型

                "content":ueHtml,  //富文本中输入的html代码
                "organizer":hostName,
                "activityTheme":activityTheme,
                "title":hostIntro   //举办方简介
            },
            success:function (arr) {
                var data = arr.data;
                if(arr.status == 200){  // 200
                    notie.alert(1, '上传成功!', 2);
                }else{
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            },
            error:function () {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        })
    }else{
        notie.alert(2, '请填写完整信息', 2);
    }


});

