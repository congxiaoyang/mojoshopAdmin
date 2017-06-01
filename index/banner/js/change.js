/**
 * Created by dell on 2017/4/20.
 */

//  获取id 渲染当前的数据

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
console.log(thisId);

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/ad/b_id",
        dataType:"json",
        data:{"id":thisId},
        success:function (arr) {
            var data = arr.data;
            if(arr.status == 200){  // 200

                $("#id").text(data.id);
                $("#hostName").val(data.organizer);
                $("#activityTheme").val(data.activityTheme);
                $("#activityAddr").val(data.address);
                $("#adMoney").val(toDecimal2(data.price));
                $("#signupMoney").val(toDecimal2(data.signupMoney));
                $("#startTime").val(ge_time_format(data.startWithTime));
                $("#endTime").val(ge_time_format(data.endWithTime));
                $("#createTime").text(ge_time_format(data.createTime));
                $("#updateTime").text(ge_time_format(data.updateTime));

                $("#bannerImg").attr("src",data.bannerImages);
                $("#activityBgImg").attr("src",data.bgImages);
                $("#signupImg").attr("src",data.buttonBg);
                $("#columnImg").attr("src",data.smalimages);

                $("#hostLogo").attr("src",data.logo);
                $("#hostIntro").val(data.title);

                $(document.getElementById('baidu_editor_0').contentWindow.document.body).html(data.content);

                $("#status").find("option").each(function () {
                    if($(this).val()==data.status){
                        $(this).attr("selected",true);
                    }
                });

                $("#type").find("option").each(function () {
                    if($(this).val()==data.occupy){
                        $(this).attr("selected",true);
                    }
                })


            //    活动简介写在这里


            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
});


//     点击上传 和添加类似


var objUrl1;
var imgBase641="";    //banner

$("#bannerBtn").click(function () {
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

$("#columnBtn").click(function () {
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

$("#activityBgBtn").click(function () {
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
var imgBase644="";    //  logo

$("#hostLogoBtn").click(function () {
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

$("#signupBtn").click(function () {
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

    var entryFee = $("#signupMoney").val();  // 报名费
    var adMoney = $("#ad_money").val();  // 广告费

    var status = $("#status").find("option:selected").val();  //状态
    var type = $("#type").find("option:selected").val();   // 类型

    var startTime = $("#startTime").val();   // 开始时间
    var endTime = $("#endTime").val();   // 结束时间

    var hostIntro = $("#hostIntro").val();
    var hostName = $("#hostName").val();
    var activityTheme = $("#activityTheme").val();
    var activityAddr = $("#activityAddr").val();

    var ueHtml = $(document.getElementById('baidu_editor_0').contentWindow.document.body).html();

    var bannerImg;
    if(imgBase641==""){
        bannerImg = $("#bannerImg").attr("src");
    }else{
        bannerImg = imgBase641;
    }

    var columnPic;
    if(imgBase642==""){
        columnPic = $("#columnImg").attr("src");
    }else{
        columnPic = imgBase642;
    }

    var activityBgImg;
    if(imgBase643==""){
        activityBgImg = $("#activityBgImg").attr("src");
    }else{
        activityBgImg = imgBase643;
    }

    var hostLogoImg;
    if(imgBase644==""){
        hostLogoImg = $("#hostLogo").attr("src");
    }else{
        hostLogoImg = imgBase644;
    }

    var signupImg;
    if(imgBase645==""){
        signupImg = $("#signupImg").attr("src");
    }else{
        signupImg = imgBase645;
    }

    if(entryFee!=""&&hostIntro!=""&&startTime!=""&&endTime!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/ad/update",
            dataType:"json",
            data:{
                "logo":hostLogoImg,
                "backImage":activityBgImg,
                "buttonImage":signupImg,
                "bannerImage":bannerImg,
                "smallImage":columnPic,

                "startWithTime":startTime,
                "endWithTime":endTime,

                "signupMoney":entryFee,   //报名费
                "price":adMoney,  //广告价格

                "status":status,  //状态
                "occupy":type,  //类型

                "details":ueHtml,  //富文本中输入的html代码

                "organizer":hostName,
                "activityTheme":activityTheme,
                "address":activityAddr,
                "title":hostIntro,   //举办方简介
                "id":thisId
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
