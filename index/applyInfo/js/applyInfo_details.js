/**
 * Created by dell on 2017/5/5.
 */

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");
console.log(thisId);

var tbody = $("#searchList");


// 分页 加载数据函数
function pageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/activity/search/user",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":2,    //显示的行数
            "search":searchCon,
            "id":thisId
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            // var status = arr.status;  // 返回状态值
            var data = arr.data.joinUserVos;   //  数据

            var str;
            tbody.html("");
            if(arr.status == 200){

                if(data == ""||arr.data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        str += '<tr data-id = "' + data[i].joinUserId+'">' +
                            '<td class="wideTd">'+ data[i].joinUserId +'</td> ' +   //编号
                            '<td class="">'+ data[i].name +'</td> ' +   // 姓名
                            '<td class="">'+ data[i].sex +'</td> ' +   // 性别
                            '<td class="">'+ data[i].email +'</td> ' +   // 邮箱
                            '<td class="">'+ data[i].tel +'</td> ' +   // 手机
                            // '<td class="">'+ data[i].address +'</td> ' +   // 地址
                            '<td class="">'+ data[i].passNo +'</td> ' +   // 护照号
                            '<td class="">'+ data[i].card +'</td> ' +   // 身份证号

                            '<td class="wideTd">'+ ge_time_format(data[i].joinTime) +'</td> ' +  // 报名时间

                            '</tr>';
                    }

                    tbody.html(str);
                }

            }else{
                notie.alert(3, '服务器繁忙，请稍后重试', 2);
            }
            //显示分页
            laypage({
                cont: 'page', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: arr.data.pages, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                jump: function(obj, first){ //触发分页后的回调
                    if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                        pageLoad(obj.curr,searchCon);
                    }
                },
                first:false,
                last:false
            });

        },
        error:function () {
            notie.alert(3, '服务器繁忙，请稍后重试', 2);
        }
    })
}

$(function () {
    pageLoad(1,"");
});


//  ===========================================================  搜索  ============================================

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    pageLoad(1,searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        pageLoad(1,searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        pageLoad(1,"");
    }
});


//  点击导出excel  下载表

 $("#exportBtn").click(function () {
     $(this).attr("href","http://192.168.1.111:8081/manager/activity/download?id="+thisId);
 });