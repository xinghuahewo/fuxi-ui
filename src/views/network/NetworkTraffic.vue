<template>
    <div class="ml-4">
        <v-card-title>
            <v-list-item-action>
                <v-icon class="teal--text">mdi-chart-timeline-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-n3">
                <v-list-item-title class="teal--text">
                    <span>网络流量分析</span>
                </v-list-item-title>
            </v-list-item-content>
        </v-card-title>

        <!-- 筛选器 -->
        <v-row class="mr-8 ml-2">
            <v-col cols="12">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="filters.host"
                                    label="主机"
                                    dense
                                    outlined
                                    clearable
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-select
                                    v-model="filters.protocol"
                                    :items="protocolOptions"
                                    label="协议"
                                    dense
                                    outlined
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col cols="2">
                                <v-select
                                    v-model="filters.state"
                                    :items="stateOptions"
                                    label="TCP状态"
                                    dense
                                    outlined
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    v-model="filters.type"
                                    :items="trafficTypes"
                                    label="流量类型"
                                    dense
                                    outlined
                                    clearable
                                ></v-select>
                            </v-col>
                            <v-col cols="2">
                                <v-btn 
                                    color="primary" 
                                    @click="resetFilters"
                                    block
                                >
                                    重置
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- 流量列表 -->
        <v-row class="mr-8 ml-2 mt-4">
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="trafficData"
                    :loading="loading"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon small @click="viewDetails(item)">
                            mdi-eye
                        </v-icon>
                    </template>

                    <template v-slot:item.lastSeen="{ item }">
                        {{ formatTime(item.lastSeen) }}
                    </template>

                    <template v-slot:item.score="{ item }">
                        <v-chip
                            :color="getScoreColor(item.score)"
                            dark
                            small
                        >
                            {{ item.score }}
                        </v-chip>
                    </template>

                    <template v-slot:item.flow="{ item }">
                        <div class="d-flex align-center">
                            <span class="mr-2">{{ item.flow.source }}</span>
                            <v-icon small>mdi-arrow-right</v-icon>
                            <span class="ml-2">{{ item.flow.destination }}</span>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <!-- 详情弹窗 -->
        <v-dialog v-model="dialog" max-width="800">
            <v-card>
                <v-card-title>
                    流量详情
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row v-if="selectedItem">
                        <v-col cols="12">
                            <pre>{{ JSON.stringify(selectedItem, null, 2) }}</pre>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'NetworkTraffic',
    data: () => ({
        loading: false,
        dialog: false,
        selectedItem: null,
        filters: {
            host: '',
            protocol: null,
            state: null,
            type: null
        },
        protocolOptions: [
            'TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS'
        ],
        stateOptions: [
            'ESTABLISHED', 'TIME_WAIT', 'CLOSE_WAIT', 'FIN_WAIT'
        ],
        trafficTypes: [
            '正常流量', 'P2P流量', '加密流量', '异常流量'
        ],
        headers: [
            { text: '操作', value: 'actions', sortable: false, width: '80' },
            { text: '最近活动', value: 'lastSeen', width: '120' },
            { text: '持续时间', value: 'duration', width: '120' },
            { text: '协议', value: 'protocol', width: '150' },
            { text: '分数', value: 'score', width: '100' },
            { text: '流量信息', value: 'flow' },
            { text: '实时吞吐量', value: 'throughput', width: '120' },
            { text: '总流量', value: 'totalBytes', width: '120' }
        ],
        trafficData: [
            {
                lastSeen: new Date().toISOString(),
                duration: '2天 58:55',
                protocol: 'UDP: BitTorrent',
                score: 85,
                flow: {
                    source: '192.168.1.100:6881',
                    destination: '45.85.123.45:6882'
                },
                throughput: '1.5 Mbps',
                totalBytes: '43.03 GB'
            },
            {
                lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                duration: '1天 12:30',
                protocol: 'TCP: HTTPS',
                score: 45,
                flow: {
                    source: '192.168.1.101:443',
                    destination: '104.16.124.96:443'
                },
                throughput: '500 Kbps',
                totalBytes: '2.5 GB'
            }
        ]
    }),
    methods: {
        resetFilters() {
            this.filters = {
                host: '',
                protocol: null,
                state: null,
                type: null
            };
        },
        async fetchTrafficData() {
            this.loading = true;
            try {
                const params = {
                    host: this.filters.host,
                    protocol: this.filters.protocol,
                    state: this.filters.state,
                    type: this.filters.type,
                    page: this.page,
                    pageSize: this.itemsPerPage
                };
                const res = await this.$api.network.getTrafficList(params);
                this.trafficData = res.data.items;
                this.totalItems = res.data.total;
            } catch (error) {
                this.$message.error('获取流量数据失败');
                // 使用模拟数据作为降级方案
                this.trafficData = this.getMockData();
            } finally {
                this.loading = false;
            }
        },
        async viewDetails(item) {
            try {
                const res = await this.$api.network.getTrafficDetail(item.id);
                this.selectedItem = res.data;
                this.dialog = true;
            } catch (error) {
                this.$message.error('获取详情失败');
            }
        },
        formatTime(time) {
            if (!time) return '未知';
            
            const now = new Date();
            const lastSeen = new Date(time);
            const diffSeconds = Math.floor((now - lastSeen) / 1000);

            if (diffSeconds < 60) {
                return '< 1分钟';
            } else if (diffSeconds < 3600) {
                const minutes = Math.floor(diffSeconds / 60);
                return `${minutes}分钟前`;
            } else if (diffSeconds < 86400) {
                const hours = Math.floor(diffSeconds / 3600);
                return `${hours}小时前`;
            } else {
                const days = Math.floor(diffSeconds / 86400);
                return `${days}天前`;
            }
        },
        getScoreColor(score) {
            if (score >= 80) return 'red';
            if (score >= 60) return 'orange';
            return 'green';
        }
    }
};
</script>

<style scoped>
.v-data-table {
    background: white !important;
}
</style> 