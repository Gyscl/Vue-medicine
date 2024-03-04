<template>
    <div class="extra">
        <div class="footer_container">
            <div class="slogan">
                <a href="javascript:;">
                    <i class="iconfont icon-footer01"></i>
                    <span>价格亲民</span>
                </a>
                <a href="javascript:;">
                    <i class="iconfont icon-footer02"></i>
                    <span>物流快捷</span>
                </a>
                <a href="javascript:;">
                    <i class="iconfont icon-footer03"></i>
                    <span>品质保证</span>
                </a>
            </div>
            <!-- 版权信息 -->
            <div class="copyright">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>版权所有 ©2024. All rights reserved.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style>
.extra {
    background-color: #333;
}

.slogan {
    height: 60px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
        height: 50px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;

        i {
            font-size: 50px;
            vertical-align: middle;
            margin-right: 10px;
            font-weight: 100;
        }

        span {
            vertical-align: middle;
            text-shadow: 0 0 1px #333;
        }
    }
}

.copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
        line-height: 1;
        margin-bottom: 20px;
    }

    a {
        color: #999;
        line-height: 1;
        padding: 0 10px;
        border-right: 1px solid #999;

        &:last-child {
            border-right: none;
        }
    }
}
</style>