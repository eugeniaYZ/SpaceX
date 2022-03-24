import React, {Component} from 'react';
import {Button, Spin, List, Avatar, Checkbox} from 'antd';

import satellite from '../assets/images/satellite.svg';

class SatelliteList extends Component {
    state = {
        selected:[]
    };

    onChange = e => {
        console.log(e.target);
        const {dataInfo, checked} = e.target;
        const {selected} = this.state;
        //add/remove selected sat to/from selected state
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({selected: list});
    }

    addOrRemove = (item, status, list) => {
        // case1: check is true
        //      item not in the list -> add it
        // case2: check is false
        //      item is in the list -> remove it
        const found = list.some(entry => entry.satid ===item.satid);
        if(status && !found) {
            list = [...list, item];
        }
        if(!status && found) {
            list = list.filter(entry => entry.satid !== item.satid);
        }
        return list
    }

    onShowSatMap = () => {
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo? this.props.satInfo.above:[];
        const {isLoad} = this.props;
        return (
            <div className='sat-list-box'>
                    <Button className='sat-list-btn'
                            type='primary'
                            onClick={this.onShowSatMap}
                    >
                        Track on the map
                    </Button>
                <hr/>
                    {
                        isLoad?
                            <div className='spin-box'>
                                <Spin tip = 'Loading...' size='large'/>
                            </div>:
                            <List
                                className='sat-list'
                                itemLayout='horizontal'
                                size='small'
                                dataSource={satList}
                                renderItem={item => {
                                    // console.log(item);
                                    return (
                                    <List.Item
                                        actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar size={50} src={satellite}/>}
                                            title={<p>{item.satname}</p>}
                                            description={`Launch Date: ${item.launchDate}`}
                                        />
                                    </List.Item>)
                                }}
                            />
                    }
            </div>
        );
    }
}

export default SatelliteList;