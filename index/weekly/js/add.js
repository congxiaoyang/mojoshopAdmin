/**
 * Created by dell on 2017/4/26.
 */


//  图片上传

var objUrl;
var imgBase64="";
$("#storePic").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#storePic").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $("#storeLogo").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
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

    if(imgBase64!="" && storeIntro!=""&&url!=""&&startDate!=""&&endDate!=""&&ad_money!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/column/insert/week",
            dataType:"json",
            data:{
                "file":imgBase64,
                "title":storeIntro,
                "storeUrl":url,
                "price":ad_money,
                "startWithTime":startDate,
                "endWithTime":endDate,
                "status":status
            },
            success:function (arr) {
                if(arr.status==200){

                    notie.alert(1, '上传成功!', 2);

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