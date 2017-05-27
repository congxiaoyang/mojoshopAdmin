 // 商户端 详情页面的JS 只修改一个“状态” ,其他都是只可观看



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
        url:"http://192.168.1.111:8081/manager/store/by_id",
        dataType:"json",
        data:{"id":thisId},
        timeout:5000,
        success:function (arr) {
            var data = arr.data;
            if(arr.status==200){  // 200


                var storeType;
                if(data.storeType==1){
                    storeType = "留学/出境"
                }else if(data.storeType==2){
                    storeType = "生活服务"
                }
                else if(data.storeType==3){
                    storeType = "时尚购物"
                }
                $("#storeId").text(data.id);  //编号
                $("#name").text(data.name);
                $("#storeName").text(data.storeName);
                $("#email").text(data.email);
                $("#phone").text(data.tel);
                $("#passport").text(data.passportNo);
                $("#idCard").text(data.card);
                $("#type").text(storeType);
                $("#saleAddr").text(data.citys.join(","));
                $("#addr").text(data.address);
                $("#succ").text(data.creditNoCode);
                $("#loginTime").text(ge_time_format(data.loginTime));
                $("#createTime").text(ge_time_format(data.createTime));

                $("#logo").attr("src",data.logo);
                $("#storeIntro").text(data.blurb);

                var amArray = data.serviceAM.split(",");
                var amStart = amArray[0];
                var amEnd = amArray[1];
                $("#amStart").text(amStart);
                $("#amEnd").text(amEnd);

                var pmArray = data.servicePM.split(",");
                var pmStart = pmArray[0];
                var pmEnd = pmArray[1];
                $("#pmStart").text(pmStart);
                $("#pmEnd").text(pmEnd);

                if(data.status == 1){
                    $("#store_status").html('<option value="0">正常</option> <option value="1" selected>停用</option>')
                }else{
                    $("#store_status").html('<option value="0" selected>正常</option> <option value="1">停用</option>')
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

$("#store_status").change(function () {
    var selected = $(this).children("option:selected").val();
    console.log(selected);

    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/store/update_status",
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

