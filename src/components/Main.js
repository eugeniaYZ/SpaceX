import React, {Component} from 'react';
import {Row, Col} from 'antd';
import axios from 'axios';

import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from './WorldMap'

import {SAT_API_KEY, STARLINK_CATEGORY, NEARBY_SATELLITE} from '../constants';

class Main extends Component {
    state = {
        setting: null, //observer position
        setInfo: null, // full list of satellites
        satList:null, // satellites selected
        isLoadingList: false
    }

    showNearbySatellite = (setting) => {
        this.setState({setting: setting});
        //fetch sat list from the server
        this.fetchSatellite(setting);
    }

    showMap = (selected) => {
        // console.log(selected);
        this.setState({satList: [...selected]})
    }

    fetchSatellite = (setting) => {
        //api config
        const {latitude, longitude, elevation, altitude} = setting;
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        this.setState({
            isLoadingList: true
        });
        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList:false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite - >', error);
            })
    };

    render() {
        const {setting, satInfo, satList, isLoadingList} = this.state;
        return (
            <Row>
                <Col span={8} className='left-side'>
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList satInfo={satInfo}
                                   isLoad={isLoadingList}
                                   onShowMap={this.showMap}
                    />
                </Col>
                <Col span={16} className='right-side'>
                    <WorldMap observerData={setting} satData={satList}/>
                </Col>
            </Row>
        );
    }
}

export default Main;