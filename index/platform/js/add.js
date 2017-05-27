/**
 * Created by dell on 2017/4/20.
 */

var objUrl;
var imgBase64="";
$("#bannerPic").click(function () {
    // $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#bannerPic").on("change",function(){

        objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径

        var file = this.files[0];

        if (/image\/\w+/.test(file.type)&&this.files[0].size/1024<2048) {
            $(this).siblings("img").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
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

//  点击“完成”按钮，向后台请求 传递参数

$("#submit").click(function () {

    // var adMoney = $("#adMoney").val();  //广告价格
    // var entryFee = $("#entryFee").val();  // 报名费
    var status = $("input[name=status]:checked").val();  //状态
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();

    var ueHtml = $(document.getElementById('baidu_editor_0').contentWindow.document.body).html();
    console.log(ueHtml);

    if(imgBase64!="" && startTime!=""&&endTime!=""){
        $.ajax({
            type:"post",
            url:"http://192.168.1.111:8081/manager/share/insert",
            dataType:"json",
            data:{
                "file":imgBase64,
                "startWithTime":startTime,
                "endWithTime":endTime,
                "status":status,    //状态
                "details":ueHtml
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
        notie.alert(2, '请填写完整正确信息', 2);
    }
});

