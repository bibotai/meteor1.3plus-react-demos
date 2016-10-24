import React from 'react';

const ResultView = ({dist, deal, price, city, speed}) => (
    <div style={{
        paddingTop: 50
    }}>
        假设不同的车都会花一样的时间到达目的地，而城市里平均时速为
        <span style={{
            color: 'red'
        }}>{speed}</span>
        公里每小时
        <div style={{
            paddingTop: 25
        }}>
            <span style={{
                paddingRight: 50
            }}>
                距离目的地
                <span style={{
                    color: 'red',
                    fontSize: '2em'
                }}>{dist}</span>
                公里, 使用
                <a className="ui red massive label">{deal}</a>
            </span>
            <a className="ui red statistic" style={{
                paddingLeft: 100
            }}>
                <div className="value">
                    {price.toFixed(2)}<span style={{
        fontSize: '0.3em'
    }}>元</span>
                </div>
                <div className="label">预估</div>
            </a>
        </div>
    </div>
)

export default class Result extends React.Component {
    render() {
        const dist = Number(this.props.dist);
        const speed = Number(this.props.speed);
        const minutes = Math.round(dist / speed * 60);
        console.log(this.props);
        let didi = (1.5 * dist + 0.2 * minutes) < 8
            ? 8
            : (1.5 * dist + 0.2 * minutes);
        if (dist > 10) {
            didi = didi + (dist - 10) * 0.75;
        }
        let uber = (1.5 * dist + 0.2 * minutes) < 8
            ? 8
            : (1.5 * dist + 0.2 * minutes);
        let yd = dist > 4
            ? (1.5 * (dist - 4) + 0.2 * minutes) + 7
            : 7;
        let deal = "";
        let price = Math.min(didi, uber, yd);

        if (price == didi) {
            deal = "滴滴";
        }
        if (price == uber) {
            deal = "Uber";
        }
        if (price == yd) {
            deal = "易到";
        }
        if (price == didi && didi == uber) {
            deal = "滴滴 or Uber";
        }
        if (price == yd && yd == uber) {
            deal = "Uber or 易到";
        }
        if (price == didi && didi == uber && uber == yd) {
            deal = "滴滴 or Uber or 易到";
        }
        console.log({price: price, didi: didi, uber: uber, yd: yd, deal: deal});
        //   deal="Uber";
        // }
        // if (diff<0) {
        //   deal="滴滴";
        //   diff=Math.abs(diff);
        // }
        return <ResultView {...{deal,price,...this.props}}></ResultView>
    }
}
