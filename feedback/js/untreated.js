/**
 * Created by dell on 2017/5/15.
 */


var tbody = $("#untreated_tbody");


// 分页 加载数据函数
function pageLoad(curr,grageStatus,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/feedback/processless",
        dataType:"json",
        async:false,
        data:{
            "page":curr || 1,
            "rows":20,    //显示的行数
            "search":searchCon,
            "status":grageStatus
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.feedback;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""||arr.data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        var dataStatus;     // 状态
                        if(data[i].status == 0){
                            dataStatus = "已处理"
                        }else{
                            dataStatus = "未处理"
                        }

                        var feedbackType;
                        if(data[i].type == 1){
                            feedbackType = "社交活动"
                        }else if(data[i].type == 2){
                            feedbackType = "商品相关"
                        }else if(data[i].type == 3){
                            feedbackType = "客户服务"
                        }else if(data[i].type == 4){
                            feedbackType = "商家入驻"
                        }else if(data[i].type == 5){
                            feedbackType = "其他"
                        }


                        var receivingDateAndTime = ge_time_format(data[i].createTime).split(" ");
                        var receivingDate = receivingDateAndTime[0];
                        var receivingTime = receivingDateAndTime[1];

                        str += '<tr data-id = "' + data[i].id+'">' +
                            '<td class="wideTd">'+ data[i].id +'</td> ' +   //编号
                            // '<td>'+ type +'</td> ' +   //分类
                            '<td>'+ feedbackType +'</td> ' +  // 反馈类型
                            '<td><img src="' + data[i].images + '" class="img-largen" alt="图片加载失败"></td> ' +   // 图片
                            '<td class="name" title="'+data[i].content+'">'+ data[i].content +'</td> ' +  // 反馈说明
                            '<td>'+ data[i].email +'</td> ' +  // 联系邮箱
                            '<td class="wideTd"><p>'+receivingDate +'</p><p>' + receivingTime +'</p></td> ' +  // 创建时间
                            '<td><input type="button" class="goProcessed" value="处理"></td> ' +  // 状态
                            '<td><a href="javascript:void (0)" class="deleteBtn"><i class="iconfont">&#xe601;</i></a></td>'+  // 操作

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
                        pageLoad(obj.curr,grageStatus,searchCon);
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
    pageLoad(1,"","");
});

// 点击 删除

tbody.delegate(".deleteBtn","click",function(){
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
                url:"http://192.168.1.111:8081/manager/feedback/delete",
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

//  点击 "状态" 下拉框，选择上架和下架 渲染在页面上

$(".status_search").click(function () {

    var status = $(this).attr("data-value");

    pageLoad(1,status,"")

});

// 点击 “已查看” 当前反馈信息状态改为了已处理

tbody.delegate(".goProcessed","click",function () {
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
                url:"http://192.168.1.111:8081/manager/feedback/update_status",
                dataType:"json",
                data:{"id":id},
                success:function (arr) {
                    var backStatus = arr.status;
                    if(backStatus == 200){
                        _this.parents("tr").remove();
                        notie.alert(1, '处理成功!', 2);
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
        title: '处理',
        content: '处理之后不可恢复，确定要处理么'
    });
});

//  ===========================================================  搜索  ============================================

//  点击搜索  按条件搜索
$(".searchIcon a").click(function () {
    var searchCon = $("#search").val();
    pageLoad(1,"",searchCon);
});


$("#search").keyup(function(event){
    if(event.keyCode == 13){
        var searchCon = $("#search").val();
        pageLoad(1,"",searchCon);
    }
});

//  监听搜索框中的值，如果值为空，重新请求

$('#search').bind('input propertychange', function() {
    if($(this).val()==""){
        pageLoad(1,"","");
    }
});
