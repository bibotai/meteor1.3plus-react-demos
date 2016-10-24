import React from 'react';
import ReactDOM from 'react-dom';

export default class PriceTable extends React.Component {
    btnClicked() {
        const inputDist = this.refs.distInput.value
        //inputDist 对应routes.js中...params speed=40&city=beijing对应routes.js中...queryParams
        FlowRouter.go(`/p/${inputDist}?speed=40&city=tianjin`)
    }
    render() {
        return (
            <div>
                <div className="ui labeled action input" style={{
                    paddingTop: 50
                }}>
                    <div className="ui label">
                        公里数
                    </div>
                    <input type="number" placeholder="预测到目的地历程" ref="distInput"/>
                    <button className="ui orange right labeled icon button" onClick={() => this.btnClicked()}>
                        比较
                        <i className="car icon"/>
                    </button>
                </div>
            </div>
        )
    }
}
