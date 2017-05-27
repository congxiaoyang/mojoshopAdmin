/**
 * Created by dell on 2017/4/25.
 */


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
            console.log(this.result);
        }

    });
});

// 验证邮箱
var emailTF;

$("#email").blur(function () {
    var email = $.trim($('#email').val());
//验证邮箱格式的js正则表达式
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//清空显示层中的数据
    $(".msgHint").html("");
    var countdown=60;
    if (email == "") {
        $(this).siblings("span").html("邮箱不能为空");
        emailTF =0;
    }
    else if (!(isEmail.test(email))) {
        $(this).siblings("span").html("邮箱格式不正确");
        emailTF =0;
    }else{
        emailTF =1;
    }
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
    var email = $.trim($('#email').val());
    var pwd = $("#pwd").val();
    var name = $("#name").val();
    var id = $("#id").val();
    var phone = $("#phone").val();

    if(imgBase64 != ""&& emailTF ==1 && phoneTF == 1 && name != ""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/admin/register",
            dataType:"json",
            data:{
                "file":imgBase64,
                "email":email,
                "password":pwd,
                "name":name,
                "tel":phone
            },
            success:function (arr) {
                if(arr.status==200){

                    notie.alert(1, '增加成功!', 2);

                }else{
                    notie.alert(2, '请填写完整信息', 2);
                }
            },
            error:function () {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        });

    }else{
        notie.alert(2, '请填写完整信息', 2);

    }

});


