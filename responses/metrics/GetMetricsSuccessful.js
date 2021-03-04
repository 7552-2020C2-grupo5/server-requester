import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

const metricsConversions = {
    new_users_per_day: "newUsersPerDay",
    users_during_history: "usersDuringHistory",
    new_publications_per_day: "newPublicationsPerDay",
    publications_during_history: "publicationsDuringHistory",
    transactions_accepted_per_day: "transactionsAcceptedPerDay",
    revenue_per_day: "totalAmountInTransactionsPerDay"
};

export class GetMetricsSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return [
            {
                name: "new_users_per_day",
                data: [
                    {date: "2021-02-02", value: 4},
                    {date: "2021-02-03", value: 3},
                    {date: "2021-02-04", value: 0},
                    {date: "2021-02-05", value: 1},
                ]
            },
            {
                name: "users_during_history",
                data: [
                    {date: "2021-02-02", value: 10},
                    {date: "2021-02-03", value: 13},
                    {date: "2021-02-04", value: 13},
                    {date: "2021-02-05", value: 14},
                ]
            },
            {
                name: "new_publications_per_day",
                data: [
                    {date: "2021-02-02", value: 2},
                    {date: "2021-02-03", value: 0},
                    {date: "2021-02-04", value: 0},
                    {date: "2021-02-05", value: 1},
                ]
            },
            {
                name: "publications_during_history",
                data: [
                    {date: "2021-02-02", value: 15},
                    {date: "2021-02-03", value: 15},
                    {date: "2021-02-04", value: 15},
                    {date: "2021-02-05", value: 16},
                ]
            },
            {
                name: "transactions_accepted_per_day",
                data: [
                    {date: "2021-02-02", value: 2},
                    {date: "2021-02-03", value: 1},
                    {date: "2021-02-04", value: 0},
                    {date: "2021-02-05", value: 7},
                ]
            },
            {
                name: "revenue_per_day",
                data: [
                    {date: "2021-02-02", value: 0.05},
                    {date: "2021-02-03", value: 0.1},
                    {date: "2021-02-04", value: 0},
                    {date: "2021-02-05", value: 0.03},
                ]
            },
        ];
    }

    metrics() {
        let metrics = {};
        for (const metric of this.content()) {
            let metricLabels = [];
            let metricValues = [];
            for (const point of metric.data) {
                metricLabels.push(point.date);
                metricValues.push(point.value);
            }
            metrics[this._metricName(metric.name)] = {labels: metricLabels, data: metricValues};
        }
        return metrics;
    }

    _metricName(metricName) {
        return metricsConversions[metricName]
    }
}