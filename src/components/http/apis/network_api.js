import request from './request'

const network = {
    // 网络流量分析接口
    getTrafficList(params) {
        return request.get("/api/network/traffic/list", { params });
    },
    getTrafficDetail(id) {
        return request.get(`/api/network/traffic/detail/${id}`);
    },
    getTrafficStats() {
        return request.get("/api/network/traffic/stats");
    },

    // IPv6风险分析接口
    getIPv6List(params) {
        return request.get("/api/network/ipv6/list", { params });
    },
    getIPv6Detail(address) {
        return request.get(`/api/network/ipv6/detail/${address}`);
    },
    getIPv6Stats() {
        return request.get("/api/network/ipv6/stats");
    },
    enableIPv6Privacy(params) {
        return request.post("/api/network/ipv6/privacy/enable", params);
    },

    // IP地理位置分布接口
    getIPGeoData(params) {
        return request.get("/api/network/geo/data", { params });
    },
    // 获取实时连接数据
    getIPGeoRealtime() {
        return request.get("/api/network/geo/realtime");
    },
    // 获取某个地区的详细信息
    getIPGeoLocationDetail(location) {
        return request.get(`/api/network/geo/location/${location}`);
    },
    // 获取连接趋势
    getIPGeoTrend(params) {
        return request.get("/api/network/geo/trend", { params });
    },

    // 添加端口风险分析接口
    getPortRiskList() {
        return request.get("/api/network/port/risk/list");
    },
    getPortRiskDetail(port) {
        return request.get(`/api/network/port/risk/detail/${port}`);
    }
};

export default network; 