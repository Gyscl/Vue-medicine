<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height: 252px">
                    <div class="user-info">
                        <el-avatar :size="120" :src="imgurl" />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2024-3-18</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>成都</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height: 252px">
                    <template #header>
                        <div class="clearfix">
                            <span>语言详情</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="79.4" color="#42b983"></el-progress>
                    TypeScript
                    <el-progress :percentage="14" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="5.6"></el-progress>
                    HTML
                    <el-progress :percentage="1" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <el-icon class="grid-con-icon">
                                    <User />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">111</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <el-icon class="grid-con-icon">
                                    <ChatDotRound />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">0</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <el-icon class="grid-con-icon">
                                    <Goods />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">20</div>
                                    <div>商品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height: 403px;overflow: auto;">
                    <template #header>
                        <div class="clearfix">
                            <span>待办事项</span>
                            <el-button style="float: right; padding: 3px 0" text @click="visible = true">添加</el-button>
                        </div>
                    </template>
                    <el-table :show-header="false" :data="todoList" style="width: 100% ;">
                        <el-table-column width="40">
                            <template #default="scope">
                                <!-- 两次取非将数字转化为布尔值 -->
                                <el-checkbox v-model="scope.row.status" :checked="!!scope.row.status"
                                    @change="updateStatus(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template #default="scope">
                                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">
                                    {{ scope.row.task }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog title="新增事项" width="400px" v-model="visible">
                        <el-input v-model="input" style="width: 240px; margin-right: 30px;"
                            placeholder="Please input" />
                        <el-button type="primary" plain @click="addTask">确认</el-button>
                    </el-dialog>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div ref="pieChart" id="pieChart" style="width: 100%;height:400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div ref="barChart" id="barChart" style="width: 100%;height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="dashboard">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from "element-plus";
import imgurl from '../assets/img/img.jpg';
import { taskListApi } from '@/apis/taskList';
import { addTaskApi } from '@/apis/addTask';
import { updateTaskApi } from '@/apis/updateTaskStatus';
import { todaySellApi } from '@/apis/todaySell';
import { stockNumApi } from '@/apis/stockNum';

const name = JSON.parse(localStorage.getItem('userInfo') as string).name;
const isroot = JSON.parse(localStorage.getItem('userInfo') as string).isroot
const role: string = isroot === '是' ? '超级管理员' : '普通用户';
let visible = ref(false);
const input = ref('')  //新增待办事项
let todoList: any = ref([]) //待办事项列表
let pieChartData: any = [] //饼图数据
let barChartData: any = {} //柱状图数据

// 通过 internalInstance.appContext.config.globalProperties 获取全局属性或方法
let internalInstance: any = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

onMounted(() => {
    getTask(),
        getTodaySell(),
        getStockNum()
})

//获取今日销量
async function getTodaySell() {
    let res = await todaySellApi();
    if (res.data.code == 1) {
        pieChartData = res.data.data
    }
    initPieChart()
}
//获取库存数量
async function getStockNum() {
    let res = await stockNumApi();
    if (res.data.code == 1) {
        barChartData = res.data.data
    }
    initBarChart()
}
//echart饼图:今日销量
function initPieChart() {
    //获取DOM节点
    var pieChartDom = document.getElementById('pieChart');
    // 创建 Echarts 实例并使用获取到的 DOM 节点
    const myChart = echarts.init(pieChartDom);
    // 配置饼图的数据和样式
    const option = {
        title: {
            text: '今日销量',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                data: pieChartData
            }
        ]
    };
    // 使用配置项显示饼图
    myChart.setOption(option);
}
//echart柱状图:库存数量
function initBarChart() {
    //获取DOM节点
    var barChartDOM = document.getElementById('barChart');
    // 创建 Echarts 实例并使用获取到的 DOM 节点
    const myChart = echarts.init(barChartDOM);
    // 配置饼图的数据和样式
    const option = {
        title: {
            text: '库存数量',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: barChartData.xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: barChartData.yAxis,
                type: 'bar'
            }
        ]
    };
    // 使用配置项显示饼图
    myChart.setOption(option);
}
//获取今日待办事项
async function getTask() {
    taskListApi().then((res: any) => {
        todoList.value = res.data.data
    })
}
//添加待办事项
async function addTask() {
    let res = await addTaskApi({ task: input.value })
    if (res.data.data.code == 200) {
        input.value = ''
        visible.value = false
        getTask()
        ElMessage({
            message: res.data.data.msg,
            type: "success",
        });
    } else {
        ElMessage({
            message: res.data.data.msg,
            type: "warning",
        });
    }
}
//更新事项状态
function updateStatus(item: any) {
    updateTaskApi(item).then((res: any) => {
        if (res.data.data.code == 200) {
            ElMessage({
                message: res.data.data.msg,
                type: "success",
            });
        } else {
            ElMessage({
                message: res.data.data.msg,
                type: "warning",
            });
        }
    })
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
