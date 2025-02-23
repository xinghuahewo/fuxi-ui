export default function () {
    return [
        { header: true, text: "VULNERABILITY" },
        { group: true, text: "PoC Scanner", icon: 'mdi-credit-card-scan-outline', items: [
                { text: "New scan", path: "/scanner/poc/new" },{ text: "Tasks", path: "/scanner/poc/tasks" },
                { text: "Plugins", path: "/scanner/poc/plugin" },{ text: "Vulnerabilities", path: "/scanner/poc/vul" },
            ]
        },
        { dc: true, icon: 'mdi-needle', text: 'SQLMAP', path: '/scanner/sqlmap/tasks' },
        { divider: true },
        { header: true, text: "INFORMATION" },
        { group: true, text: "Network Port", icon: 'mdi-map-marker-path', items: [
                { text: "New scan", path: "/discovery/port/new" },{ text: "Tasks", path: "/discovery/port/tasks" },
            ]
        },
        { dc: true, icon: 'mdi-fingerprint', text: 'Web Fingerprint', path: '/discovery/whatweb' },
        { group: true, text: "SubDomain", icon: 'mdi-web-box', items: [
                { text: "New scan", path: "/discovery/subdomain/new" },
                { text: "Tasks", path: "/discovery/subdomain/tasks" }
            ]
        },
        
        { divider: true },
        { header: true, text: "EXPLOITATION" },
        { dc: true, icon: 'mdi-nodejs', text: 'Jsonp Hijacker', path: '/exploit/jsonp/tasks' },
        { dc: true, icon: 'mdi-anchor', text: 'XSS Hunter', path: '/exploit/xss/tasks' },
        { dc: true, icon: 'mdi-spider-web', text: 'HTTP Logger', path: '/exploit/http/result' },
        
        { divider: true },
        { header: true, text: "NETWORK" },
        { dc: true, icon: 'mdi-chart-timeline-variant', text: '流量分析', path: '/network/traffic' },
        { dc: true, icon: 'mdi-ip-network', text: 'IPv6风险分析', path: '/network/ipv6' },
    ]
}