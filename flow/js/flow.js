/**
 * Created by dell on 2017/4/17.
 */

 //  基本信息饼图 加载

$(function () {
    $.ajax({
        type:"get",
        url:"http://192.168.1.111:8081/manager/flow/query/current",
        dataType:"json",
        data:{},
        timeout: 5000, //超时时间：5秒
        success:function (arr) {

            var data = arr.data;
            if(arr.status == 200){
                basicInfoEchart(data.user,data.store,data.goods,0);    //基本信息饼图
                indexEchart(data.banner,data.abroad,data.life,data.fashion,data.social,data.newStore,data.weekly);
                dealEchart(data.paid,data.NoPaid,data.trade,data.refund);
                moneyEchart(data.payMoney,data.refundMoney);
                sexEchart(data.man,data.woman);
            }else{
                notie.alert(3, '服务器忙，请稍后重试', 2);
            }

        },
        error:function () {
            notie.alert(3, '服务器忙，请稍后重试', 2);
        }
    });
});

function basicInfoEchart(user_value,merchant_value,goods_value,order_value) {

    var myChart1 = echarts.init(document.getElementById('chart1'));

    var option1 = {
        title : {
            text: '基本信息数量',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ["用户数量","商户数量","商品数量","订单数量"]
        },
        series : [
            {
                name: '基本信息数量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:user_value, name:'用户数量'},
                    {value:merchant_value, name:'商户数量'},
                    {value:goods_value, name:'商品数量'},
                    {value:order_value, name:'订单数量'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
}

// 指定图表的配置项和数据

//  首页专栏数量饼图
function indexEchart(banner_value,abroad_value,life_value,fashion_value,social_value,new_value,weekly_value) {

    var myChart2 = echarts.init(document.getElementById('chart2'));

    var option2 = {
        title : {
            text: '首页专栏数量',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ["banner数量","留学出境","生活服务","时尚购物","社交活动","新店首发","每周精选"]
        },
        series : [
            {
                name: '首页专栏数量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:banner_value, name:'banner数量'},
                    {value:abroad_value, name:'留学出境'},
                    {value:life_value, name:'生活服务'},
                    {value:fashion_value, name:'时尚购物'},
                    {value:social_value, name:'社交活动'},
                    {value:new_value, name:'新店首发'},
                    {value:weekly_value, name:'每周精选'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
}


function dealEchart(dealSuccess_value,dealError_value,dealNum_value,refund_value) {

    var myChart3 = echarts.init(document.getElementById('chart3'));

    var option3 = {
        title : {
            text: '交易',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ["已支付","未支付","交易总数","退款总数"]
        },
        series : [
            {
                name: '交易',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:dealSuccess_value, name:'已支付'},
                    {value:dealError_value, name:'未支付'},
                    {value:dealNum_value, name:'交易总数'},
                    {value:refund_value, name:'退款总数'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);
}


function moneyEchart(dealSum_value,refund_value) {

    var myChart4 = echarts.init(document.getElementById('chart4'));

    var option4 = {
        title : {
            text: '金额',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ["交易额","退款额"]
        },
        series : [
            {
                name: '金额',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:dealSum_value, name:'交易额'},
                    {value:refund_value, name:'退款额'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart4.setOption(option4);

}


function sexEchart(male_value,female_value) {

    var myChart5 = echarts.init(document.getElementById('chart5'));

    var option5 = {
        title : {
            text: '性别分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ["男","女"]
        },
        series : [
            {
                name: '性别分布',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:male_value, name:'男'},
                    {value:female_value, name:'女'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart5.setOption(option5);

}

