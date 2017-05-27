/**
 * Created by dell on 2017/4/26.
 */


// 验证邮箱

$("#sendCodeToEmail").click(function() {
    //获取id对应的元素的值，去掉其左右的空格
    var email = $.trim($('#email').val());
    //验证邮箱格式的js正则表达式
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //清空显示层中的数据
    $(".msgHint").html("");
    var countdown=60;
    if (email == "") {
        $(this).parents("div").siblings("span").html("邮箱不能为空");
    }
    else if (!(isEmail.test(email))) {
        $(this).parents("div").siblings("span").html("邮箱格式不正确");
    }
    else {
        $(this).parents("div").siblings("span").html("").addClass("ture").html("验证码已发送");
        // 这里调用接口
        $.ajax({
            type:"get",
            url:"http://192.168.1.111:8089/user/emailcheck",
            dataType:"json",
            data:{"email":email},
            success:function (arr) {
                if(arr.status==200){
                    settime();
                }else{
                    alert("失败")
                    // $("#myModal").removeClass("in");
                    // var html = '<li class="pl-20"><a href="">' + arr.data.userName +'</a></li> <li class="pl-40"><a href="">客服服务</a></li>';
                    // $("#headNav").html(html);
                }
            },
            error:function () {

            }
        })

    }



    function settime() {
        if (countdown == 0) {
            $("#sendCodeToEmail").removeClass("disabled").html("发送验证码到邮箱");
            countdown = 60;
            return;
        } else {

            $("#sendCodeToEmail").addClass("disabled").html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
                settime($("#sendCodeToEmail")) }
            ,1000)
    }


});

// 验证密码


$("#pwd").blur(function () {
    var pwdReg = /^[a-z0-9_-]{8,16}$/;
    // var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
    var pwd = $(this).val();
    if(!pwdReg.test(pwd)){
        $(this).siblings("span").html("密码格式错误");
    }else{

    }
});


// 密码确认验证


$("#confirmPwd").blur(function () {
    var pwd = $("#pwd").val();
    var pwd_confirm = $(this).val();
    if(pwd_confirm!=pwd){
        $(this).siblings("span").html("两次输入密码不一致，请检查");
    }else if(pwd_confirm==""){
        $(this).siblings("span").html("密码不能为空");
    }
});

// 所有输入框 焦点事件时去掉 提示信息

$(".form-group .form-control").focus(function () {
    $(this).siblings("span").html("");
});

$(".form-group-code .form-control").focus(function () {
    $(this).parents("div").siblings("span").html("");
});


//  点击注册按钮 ，向后台传送数据

$("#register").click(function () {
    var email = $.trim($('#email').val());
    var pwd = $("#pwd").val();
    var name = $("#name").val();
    var code = $("#code").val();
    $.ajax({
        type:"post",
        url:"http://192.168.1.108:8089/user/register",
        dataType:"json",
        data:{},
        jsonp: "callbackparam",
        jsonpCallback: "jsonpCallback1",
        success:function (arr) {
            if(arr.status==400){
                // $("#hint").html("用户名或者密码错误")
                // alert()
            }else if(arr.status==200){
                // $("#myModal").removeClass("in");
                // var html = '<li class="pl-20"><a href="">' + arr.data.userName +'</a></li> <li class="pl-40"><a href="">客服服务</a></li>';
                // $("#headNav").html(html);

                window.location.href = "../../../login/login.html";
            }
        },
        error:function () {

        }
    })
});
