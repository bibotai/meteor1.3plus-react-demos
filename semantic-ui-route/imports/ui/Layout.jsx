import React from 'react';

//主要布局
export const Layout = ({menu, content}) => (
    <div>
        <div>{menu}</div>
        <div className="ui container" style={{
            paddingTop: 50
        }}>
            <h1>出行比价<span style={{
        color: "grey"
    }}>
                    <smail>(天津)</smail>
                </span>
            </h1>
            <hr></hr>
            {content}
        </div>
    </div>
);

//设置布局
export const SettingLayout = ({menu, content}) => (
    <div>
        <div>{menu}</div>
        <div className="ui container" style={{paddingTop : 50}}>
            <h1>设置</h1>
            <hr></hr>
            {content}
        </div>
    </div>
);
