<template>
    <div class="ml-4">
        <v-card-title>
            <v-list-item-action>
                <v-icon class="teal--text">mdi-monitor-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-n3">
                <v-list-item-title class="teal--text">
                    <span>Dashboard</span>
                </v-list-item-title>
            </v-list-item-content>
        </v-card-title>

        <v-row class="mr-8 ml-2 mt-n4">
            <v-col 
                cols="12" 
                sm="6" 
                md="3" 
                v-for="(item, index) in riskCards" 
                :key="index"
            >
                <v-card
                    class="mx-auto"
                    height="150"
                    @click="goToPath(item.path)"
                    :color="item.color"
                    hover
                    style="cursor: pointer"
                >
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="white--text">
                            <div class="subtitle-1 font-weight-bold mb-2">{{item.text}}</div>
                            
                            <div v-if="item.type === 'risk-index'">
                                <v-progress-circular
                                    :value="item.value"
                                    :color="item.scoreColor"
                                    size="50"
                                >
                                    {{ item.value }}
                                </v-progress-circular>
                                <div class="mt-2">
                                    <v-icon small :color="item.trendColor">{{ item.trendIcon }}</v-icon>
                                    <span class="ml-1">较昨日{{ item.trend }}</span>
                                </div>
                            </div>

                            <div v-else-if="item.type === 'high-risk-addr'">
                                <div class="text-h5">{{ item.activeCount }} / {{ item.totalCount }}</div>
                                <v-progress-linear
                                    :value="item.percentage"
                                    color="red"
                                    height="8"
                                    class="mt-2"
                                ></v-progress-linear>
                                <v-chip x-small class="mt-2" dark>{{ item.source }}</v-chip>
                            </div>

                            <div v-else-if="item.type === 'port-risk'">
                                <div class="text-h5">{{ item.value }}</div>
                                <div class="mt-2">
                                    <v-chip 
                                        x-small 
                                        v-for="port in item.topPorts" 
                                        :key="port.name"
                                        class="mr-1 mt-1"
                                        dark
                                    >
                                        {{ port.name }}:{{ port.count }}
                                    </v-chip>
                                </div>
                            </div>

                            <div v-else-if="item.type === 'privacy-level'">
                                <v-progress-circular
                                    :value="item.safePercentage"
                                    color="green"
                                    size="50"
                                >
                                    {{ item.safePercentage }}%
                                </v-progress-circular>
                                <div class="mt-2">
                                    <v-icon small :color="item.trendColor">{{ item.trendIcon }}</v-icon>
                                    <span class="ml-1">较上周{{ item.trend }}</span>
                                </div>
                            </div>
                        </div>

                        <v-icon 
                            color="white" 
                            size="64"
                            class="ml-auto"
                        >
                            {{item.icon}}
                        </v-icon>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ml-2 mr-8">
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        <v-list-item-action>
                            <v-icon class="teal--text">mdi-chart-line</v-icon>
                        </v-list-item-action>
                        <v-list-item-content class="ml-n3">
                            <v-list-item-title class="teal--text">
                                <span>安全风险趋势</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-card-title>
                    <v-card-text>
                        <DashboardRiskTrend/>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" class="mb-6">
                <v-card>
                    <v-card-title>
                        <v-list-item-action>
                            <v-icon class="teal--text">mdi-chart-pie</v-icon>
                        </v-list-item-action>
                        <v-list-item-content class="ml-n3">
                            <v-list-item-title class="teal--text">
                                <span>风险分布统计</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-card-title>
                    <v-card-text>
                        <DashboardRiskDistribution/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import DashboardRiskTrend from "./DashboardRiskTrend";
    import DashboardRiskDistribution from "./DashboardRiskDistribution";
    export default {
        name: "Dashboard",
        components: {
            DashboardRiskTrend,
            DashboardRiskDistribution,
        },
        data: () => ({
            spinShow: true,
            riskCards: [
                {
                    type: 'risk-index',
                    text: "当前综合风险指数",
                    value: 75,
                    icon: "mdi-gauge",
                    path: "/risk/analysis",
                    color: "deep-orange",
                    scoreColor: "red",
                    trend: "上升5%",
                    trendIcon: "mdi-arrow-up",
                    trendColor: "red"
                },
                {
                    type: 'high-risk-addr',
                    text: "S级高危地址",
                    activeCount: 15,
                    totalCount: 28642,
                    percentage: 0.05,
                    source: "宿舍区6号楼",
                    icon: "mdi-alert-circle",
                    path: "/risk/address",
                    color: "red darken-1"
                },
                {
                    type: 'port-risk',
                    text: "暴露高危端口",
                    value: 238,
                    topPorts: [
                        {name: "22(SSH)", count: 76},
                        {name: "3389(RDP)", count: 52}
                    ],
                    icon: "mdi-lan-connect",
                    path: "/risk/ports",
                    color: "amber darken-2"
                },
                {
                    type: 'privacy-level',
                    text: "随机化地址占比",
                    safePercentage: 68,
                    trend: "提升12%",
                    trendIcon: "mdi-arrow-up",
                    trendColor: "green",
                    icon: "mdi-shield-check",
                    path: "/risk/privacy",
                    color: "green"
                }
            ],
        }),
        mounted() {
            this.getDashboardData();
        },
        methods: {
            goToPath(path){
                this.$router.push(path);
            },
            async getDashboardData() {
                // 添加模拟数据
                const mockData = {
                    risk_index: 75,
                    high_risk_count: 15,
                    port_risk_count: 238,
                    privacy_level: 68
                };
                this.updateRiskCards(mockData);
            },
            updateRiskCards(data) {
                this.riskCards = [
                    {
                        type: 'risk-index',
                        text: "当前综合风险指数",
                        value: data.risk_index,
                        icon: "mdi-gauge",
                        path: "/scanner/poc/vul",
                        color: "deep-orange",
                        scoreColor: "red",
                        trend: "上升5%",
                        trendIcon: "mdi-arrow-up",
                        trendColor: "red"
                    },
                    {
                        type: 'high-risk-addr',
                        text: "S级高危地址",
                        activeCount: data.high_risk_count,
                        totalCount: 28642,
                        percentage: (data.high_risk_count / 28642) * 100,
                        source: "宿舍区6号楼",
                        icon: "mdi-alert-circle",
                        path: "/discovery/port/result",
                        color: "red darken-1"
                    },
                    {
                        type: 'port-risk',
                        text: "暴露高危端口",
                        value: data.port_risk_count,
                        topPorts: [
                            {name: "22(SSH)", count: Math.floor(data.port_risk_count * 0.32)},
                            {name: "3389(RDP)", count: Math.floor(data.port_risk_count * 0.22)}
                        ],
                        icon: "mdi-lan-connect",
                        path: "/discovery/port/tasks",
                        color: "amber darken-2"
                    },
                    {
                        type: 'privacy-level',
                        text: "随机化地址占比",
                        safePercentage: data.privacy_level,
                        trend: "提升12%",
                        trendIcon: "mdi-arrow-up",
                        trendColor: "green",
                        icon: "mdi-shield-check",
                        path: "/discovery/whatweb",
                        color: "green"
                    }
                ];
            }
        }
    }
</script>

<style scoped>
.v-card {
    transition: transform 0.2s;
}
.v-card:hover {
    transform: translateY(-5px);
}
</style>