/**
 * Created by dell on 2017/4/26.
 */


var tbody = $("#searchList");


// 分页 加载数据函数
function pageLoad(curr,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/activity/search",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":2,    //显示的行数
            "search":searchCon
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            // var status = arr.status;  // 返回状态值
            var data = arr.data.activityVos;   //  数据

            var str;
            tbody.html("");
            if(arr.status == 200){

                if(data == ""||arr.data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){


                        str += '<tr data-id = "' + data[i].activityId+'">' +
                            '<td class="wideTd">'+ data[i].activityId +'</td> ' +   //编号
                            '<td class="">'+ data[i].activityName +'</td> ' +   //举办方
                            '<td class="wideTd">'+ data[i].activityTheme +'</td> ' +   // 活动主题

                            '<td class="wideTd">'+ ge_time_format(data[i].startTime) +'</td> ' +  // 开始时间
                            '<td class="wideTd">'+ ge_time_format(data[i].endTime) +'</td> ' +  // 结束时间
                            '<td class="redMark">￥'+ toDecimal2(data[i].price) +'</td> ' +  // 广告价格
                            '<td class="redMark">￥'+ toDecimal2(data[i].signupMoney) +'</td> ' +  // 报名价格
                            '<td class="operateIcon">' +
                            '<p><a href="javascript:void (0)" style="margin-left: 0" class="deleteBtn"><i class="iconfont">&#xe601;</i></a></p>'+
                            '</td>'+  // 操作

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

// 点击 删除

tbody.delegate(".deleteBtn","click",function(e){
    e.stopPropagation();
    var _this = $(this);
    var id = $(this).parents("tr").attr("data-id").trim();
    console.log(id);
    $('#btn-dialogBox').dialogBox({
        hasClose: true,
        hasBtn: true,
        confirmValue: '确定',
        confirm: function(){
            // 这里写数据传递
            $.ajax({
                type:"get",
                url:"http://192.168.1.111:8081/manager/activity/remove",
                dataType:"json",
                data:{"id":id},
                success:function (arr) {
                    var backStatus = arr.status;
                    if(backStatus == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '删除成功!', 2);
                        // window.location.reload();
                    }else{
                        notie.alert(3, '服务器繁忙，请稍后重试', 2);
                    }

                },
                error:function () {
                    notie.alert(3, '服务器繁忙，请稍后重试', 2);
                }
            });
        },
        cancelValue: '取消',
        title: '删除',
        content: '删除之后不可恢复，确定要删除么'
    });
});


//  点击 某一行进入此举办方下的所有报名者信息列表

tbody.delegate("tr","click",function (e) {
    // e.stopPropagation();
    var id = $(this).attr("data-id");
    window.location.href="applyInfo_details.html?id="+id;
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