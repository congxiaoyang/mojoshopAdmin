/**
 * Created by dell on 2017/5/28.
 */


// ========================================  举办方列表  ===========================================

//  这个页面的tbody变量 ，便于后面使用

var tbody = $("#search_tbody");

// 分页 加载数据函数
function pageLoad(curr) {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/organizer/eventAll",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":20    //显示的行数
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.organizer;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){


                        var settlemen;     // 结算状态
                        if(data[i].settlemen == 0){
                            settlemen = "未结算"
                        }else{
                            settlemen = "已结算"
                        }

                        str += '<tr data-id = "' + data[i].eventId+'">' +
                            '<td class="wideTd">'+ data[i].id +'</td> ' +   //订单编号
                            '<td>'+ data[i].eventId +'</td> ' +   //活动编号
                            '<td>'+ data[i].name +'</td> ' +  // 举办方名称
                            '<td>'+ ge_time_format(data[i].createTime) +'</td> ' +  // 创建时间

                            '<td> ' +
                            '<a href="#" class="settled_link">查询</a>' +
                            '</td> ' +
                            '<td> ' +
                            '<a href="#" class="unsettled_link">查询</a>' +
                            '</td> ' +
                            '<td><a href="javascript:void (0)" class="deleteBtn"><i class="iconfont">&#xe601;</i></a></td> ' +

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
                        pageLoad(obj.curr);
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
    pageLoad(1);
});


//  点击去已结算订单页面
tbody.delegate(".settled_link","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="activity_order_settled.html?id="+id;
});


//  点击去未结算订单页面
tbody.delegate(".unsettled_link","click",function () {
    var id = $(this).parents("tr").attr("data-id");
    window.location.href="activity_order_unsettled.html?id="+id;
});


// 删除

tbody.delegate(".deleteBtn","click",function(){
    var _this = $(this);
    var id = $(this).parents("tr").attr("data-id").trim();
    $('#btn-dialogBox').dialogBox({
        hasClose: true,
        hasBtn: true,
        confirmValue: '确定',
        confirm: function(){
            // 这里写数据传递
            $.ajax({
                type:"get",
                url:"http://192.168.1.111:8081/manager/organizer/remove",
                dataType:"json",
                data:{"id":id},
                success:function (arr) {
                    var backStatus = arr.status;
                    if(backStatus == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '删除成功!', 2);
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


