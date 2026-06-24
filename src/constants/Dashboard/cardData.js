import trendUp from "../../assets/TrendUp.svg";
export const cardData = [
    {
        title: "AI Performance",
        metrics: [
            {
                label: "Success Rate",
                value: "87%",
                change: "+9% this week",
                changeIcon: trendUp,
            },
            {
                label: "Avg Response Time",
                value: "2.3s",
                change: "-0.6% this week",
                changeIcon: trendUp,
            },
        ],
    },
    {
        title: "System Health",
        metrics: [
            {
                label: "HIPAA Compliance",
                value: "100%",
                statusType: "success",
            },
            {
                label: "EMR Sync",
                value: "Delayed",
                statusType: "warning",
            },
        ],
    },
];
