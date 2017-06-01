/**
 * Created by dell on 2017/4/26.
 */

//

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
console.log(thisId);

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/column/search",
        dataType:"json",
        data:{"id":thisId,"type":5},
        timeout:5000,
        success:function (arr) {

            var data = arr.data;
            if(arr.status == 200){

                $("#storeImg").attr("src",data.images);
                $("#storeIntro").val(data.title);
                $("#url").val(data.storeUrl);
                $("#ad_money").val(toDecimal2(data.price));
                $("#startTime").val(ge_time_format(data.startTime));
                $("#endTime").val(ge_time_format(data.endTime));

                // 判断 上下架
                if(data.status == 1){
                    $("#putaway").attr("checked",true);
                }else{
                    $("#soldOut").attr("checked",true);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }


        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
});


//  图片上传

var objUrl;
var imgBase64="";
$("#storePic").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#storePic").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#storeImg").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
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



$("#submit").click(function () {
    var storeIntro = $("#storeIntro").val();
    var url = $("#url").val();
    var ad_money = $("#ad_money").val();
    var startDate = $("#startTime").val();
    var endDate = $("#endTime").val();
    var status = $("input[name=status]:checked").val();

    console.log(typeof startDate);
    console.log(typeof endDate);

    var img;
    if(imgBase64==""){
        img = $("#storeImg").attr("src");
    }else{
        img = imgBase64;
    }

    if(storeIntro!=""&&url!=""&&startDate!=""&&endDate!=""&&ad_money!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/column/update/week",
            dataType:"json",
            data:{
                "file":img,
                "title":storeIntro,
                "storeUrl":url,
                "startWithTime":startDate,
                "endWithTime":endDate,
                "status":status,
                "price":ad_money,
                "id":thisId
            },
            success:function (arr) {
                if(arr.status==200){

                    notie.alert(1, '修改成功!', 2);
                    setTimeout(function () {
                        window.location.href = "./search.html";
                    },800)

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