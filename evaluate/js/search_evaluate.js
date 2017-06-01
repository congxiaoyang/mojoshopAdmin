/**
 * Created by dell on 2017/4/21.
 */

// 从上一个页面得到id
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var thisId = GetQueryString("id");

var tbody = $("#searchEvaluate_tbody");


// 分页 加载数据函数
function pageLoad(curr,grageStatus,searchCon) {
    $.ajax({
        type:"post",
        url:"http://192.168.1.111:8081/manager/evaluate/by_store_id",
        dataType:"json",
        data:{
            "page":curr || 1,
            "rows":20,    //显示的行数
            "search":searchCon,
            "status":grageStatus,
            "id":thisId
        },
        timeout:5000,
        success:function (arr) {
            // 获取到用户名，连同昵称变化

            var status = arr.status;  // 返回状态值
            var data = arr.data.evaluate;   //  数据

            var str;
            tbody.html("");
            if(status == 200){

                if(data == ""||arr.data == ""){
                    notie.alert(2, '暂无数据', 2);
                }else{
                    for(var i in data){

                        str += '<tr data-id = "' + data[i].aid+'">' +
                            '<td class="wideTd">'+ data[i].cid +'</td> ' +   //编号
                            // '<td>'+ type +'</td> ' +   //分类
                            '<td>'+ data[i].goodsName +'</td> ' +  // 商名
                            '<td>'+ data[i].rated +'</td> ' +  // 星级
                            '<td>'+ data[i].userCode +'</td> ' +  // 用户账号
                            '<td>'+ data[i].userName +'</td> ' +  // 用户名称
                            '<td class="name" title="'+ data[i].content +'">'+ data[i].content +'</td> ' +  // 评价内容
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
                url:"http://192.168.1.111:8081/manager/evaluate/delete",
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
