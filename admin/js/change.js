/**
 * Created by dell on 2017/5/16.
 */


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
// console.log(thisId);

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/admin/search",
        dataType:"json",
        data:{"id":thisId},
        timeout:5000,
        success:function (arr) {

            var data = arr.data;
            if(arr.status == 200){

                $("#avatar_pic").attr("src",data.avatar);
                $("#email").text(data.email);
                $("#name").val(data.name);
                // $("#pwd").val(data.password);
                $("#phone").val(data.tel);

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }


        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
});


//  ===========================  填写提交，类似增加，只是不用再验证邮箱  ===================================



//  图片上传

var objUrl;
var imgBase64="";
$("#admin_avatar").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#admin_avatar").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#avatar_pic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
        }else{
            alert("请选择小于2M的图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            imgBase64 = this.result; //就是base64
        }

    });
});



// 验证密码

var pwdTF;
$("#pwd").blur(function () {
    var pwdReg = /^[a-z0-9_-]{8,16}$/;
    // var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
    var pwd = $(this).val();
    if(!pwdReg.test(pwd)||pwd==""){
        $(this).siblings("span").html("密码格式错误或者为空");
        pwdTF = 0;
    }else{
        pwdTF = 1;
    }
});

var phoneTF;
$("#phone").blur(function () {
    var phoneReg = /^1[34578]\d{9}$/;
    // var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
    var phone = $(this).val();
    if(!phoneReg.test(phone)||phone==""){
        $(this).siblings("span").html("手机格式错误或者为空");
        phoneTF = 0
    }else{
        phoneTF = 1
    }
});

// 所有输入框 焦点事件时去掉 提示信息

$(".form-group input").focus(function () {
    $(this).siblings("span").html("");
});

$(".form-group-code input").focus(function () {
    $(this).parents("div").siblings("span").html("");
});


//  点击注册按钮 ，向后台传送数据

$("#adminSubmit").click(function () {
    var email = $.trim($('#email').text());
    var pwd = $("#pwd").val();
    var name = $("#name").val();
    // var id = $("#id").val();
    var phone = $("#phone").val();

    var file;
    if(imgBase64==""){
        file = $("#avatar_pic").attr("src");
    }else{
        file = imgBase64;
    }

    if(pwdTF == 1 && phoneTF == 1 && name != ""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/admin/update",
            dataType:"json",
            data:{
                "file":file,
                "email":email,
                "password":pwd,
                "name":name,
                "tel":phone,
                "id":thisId
            },
            success:function (arr) {
                if(arr.status==200){

                    notie.alert(1, '修改成功!', 2);

                }else{
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            },
            error:function () {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        });

    }else{
        notie.alert(2, '请填写正确信息', 2);

    }

});
