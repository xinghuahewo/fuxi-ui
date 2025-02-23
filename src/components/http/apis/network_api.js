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
    }
};

export default network; 