/**
 * Created by dell on 2017/4/24.
 */


// 从上一个网页接收传递来的id

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
console.log(thisId);


//  读取这个用户的详细信息
$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/user/info_center",
        dataType:"json",
        data:{"id":thisId},
        timeout:5000,
        success:function (arr) {
            var data = arr.data;
            if(arr.status==200){  // 200


                var sex;
                if(data.sex==1){
                    sex = "男"
                }else{
                    sex = "女"
                }
                $("#number").text(data.id);  //编号
                $("#nickname").text(data.niceName);
                $("#grade").text(data.grades);
                $("#email").text(data.email);
                $("#sex").text(sex);
                $("#birth").text(data.birthday);
                $("#city").text(data.city);
                $("#realName").text(data.name);
                $("#deliveryAddress").text(data.address);
                $("#integral").text(data.integral);
                $("#loginTime").text(ge_time_format(data.loginTime));
                $("#updateTime").text(ge_time_format(data.updateTime));
                $("#createTime").text(ge_time_format(data.createTime));

                $("#avatar").attr("src",data.avatar);
                $("#background").attr("src",data.behind);
                $("#intro").text(data.autograph);

                if(data.status == 1){
                    $("#user_status").html('<option value="0">正常</option> <option value="1" selected>停用</option>')
                }else{
                    $("#user_status").html('<option value="0" selected>正常</option> <option value="1">停用</option>')
                }

            }else {
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
});


// 用户管理 修改

$("#user_status").change(function () {
    var selected = $(this).children("option:selected").val();
    console.log(selected);

    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/user/update_status",
        dataType:"json",
        data:{"id":thisId,"status":selected},
        timeout:5000,
        success:function (arr) {
            if(arr.status == 200){
                notie.alert(1, '修改成功!', 2);
            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })

});
