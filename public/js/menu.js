/**
 * Created by dell on 2017/4/19.
 */


$.extend({'menuLoad':function (src) {
    var asideBar = '<section  class="sidebar">'+
        '        <ul class="sidebar-menu">'+
        '            <li class="treeview">'+
        '                <a href="#" class="tc">'+
        '                    <span>首页专栏</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li class="treeview">'+
        '                        <a href="#" class="tc">'+
        '                            <span>banner</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/banner/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/banner/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>留学出境</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/abroad/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/abroad/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>生活服务</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/life/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/life/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>时尚购物</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/fashion/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/fashion/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>社交活动</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/socialContact/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/banner/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>新店首发</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/newShop/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/newShop/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li>'+
        '                        <a href="#" class="tc">'+
        '                            <span>每周精选</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/weekly/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                            <li><a href="' + src + 'index/weekly/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li class="treeview">'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>报名信息</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/applyInfo/applyInfo.html"><i class="iconfont"></i> 详情</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                    <li class="treeview">'+
        '                        <a href="#" class="tc secMenu">'+
        '                            <span>平台推广</span> <i class="iconfont">&#xe61a;</i>'+
        '                        </a>'+
        '                        <ul class="treeview-menu third-menu">'+
        '                            <li><a href="' + src + 'index/platform/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                            <li><a href="' + src + 'index/platform/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                        </ul>'+
        '                    </li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>商户管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'merchant/basicInfo.html"><i class="iconfont"></i> 基本信息</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>用户管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'user/basicInfo.html"><i class="iconfont"></i> 基本信息</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>订单管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'order/search_store.html"><i class="iconfont"></i> 订单查询 </a></li>'+
        '                    <li><a href="' + src + 'order/activity_order.html"><i class="iconfont"></i> 活动订单 </a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>评价管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'evaluate/search_store.html"><i class="iconfont"></i> 评价查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>流量管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'flow/flow.html"><i class="iconfont"></i> 流量查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>财务管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="../flow/flow.html"><i class="iconfont"></i> 流量查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>投诉管理</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'complain/processed.html"><i class="iconfont"></i> 已处理</a></li>'+
        '                    <li><a href="' + src + 'complain/untreated.html"><i class="iconfont"></i> 未处理</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>退款记录</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'refund/store.html"><i class="iconfont"></i> 退款查询</a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>用户反馈</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="' + src + 'feedback/processed.html"><i class="iconfont"></i> 已处理 </a></li>'+
        '                    <li><a href="' + src + 'feedback/untreated.html"><i class="iconfont"></i> 未处理 </a></li>'+
        '                </ul>'+
        '            </li>'+
        '            <li class="treeview">'+
        '                <a href="#">'+
        '                    <span>管理员</span> <i class="iconfont">&#xe61a;</i>'+
        '                </a>'+
        '                <ul class="treeview-menu sec-menu">'+
        '                    <li><a href="'+src+'admin/search.html"><i class="iconfont"></i> 查询</a></li>'+
        '                    <li><a href="'+src+'admin/add.html"><i class="iconfont"></i> 增加</a></li>'+
        '                </ul>'+
        '            </li>'+
        '        </ul>'+
        '    </section>';

    $(".main-sidebar").html(asideBar);
}});



