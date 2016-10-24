import React from 'react';

export const PriceTable = () => (
    <table className="ui celled striped table">
        <thead>
            <tr>
                <th>项目</th>
                <th>滴滴</th>
                <th>Uber</th>
                <th>易到</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>元/每公里</td>
                <td>1.5</td>
                <td>1.5</td>
                <td>1.5</td>
            </tr>
            <tr>
                <td>元/每分钟</td>
                <td>0.2</td>
                <td>0.2</td>
                <td>0.2</td>
            </tr>
            <tr>
                <td>最低消费</td>
                <td>8</td>
                <td>8</td>
                <td>7（4公里）</td>
            </tr>
            <tr>
                <td>加价</td>
                <td>超过10公里 0.75元/公里</td>
                <td>--</td>
                <td>--</td>
            </tr>
        </tbody>
    </table>
);
