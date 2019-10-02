import React from 'react';
import { connect } from 'react-redux';
import { ISearchState, IInfoLayer } from '../types';
import { showInfoLayer, hideInfoLayer } from '../actions';
import { Animated } from "react-animated-css"


const mapStateToProps = (rootReducer:ISearchState, props:IInfoLayer):IInfoLayer => {
    const { infoLayerState } = rootReducer
    return {
        ...infoLayerState
    }
}

const mapDispathToProps = (dispatch:any) => {
    return {
        showInfoLayer: (payload:IInfoLayer) => dispatch(showInfoLayer(payload)),
        hideInfoLayer: () => dispatch(hideInfoLayer())
    }
}

const InfoLayer = ({text, timer, active, hideInfoLayer }:IInfoLayer) => {
    let animationIDuration:number
    let animationInDelay:number
    let animationOutDuration:number
    if (active && timer !== 0) {
        setTimeout( () => {
            hideInfoLayer()
        }, (timer * 1000) + 600)
        animationIDuration = 300
        animationOutDuration = 300
        animationInDelay = 0
    } else if (!active && timer !== 0) {
        animationIDuration = 300
        animationOutDuration = 300
        animationInDelay = 0
    } else {
        animationIDuration = 0
        animationOutDuration = 0
        animationInDelay = 300
    }
    
    return (
        <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={active}
            animationOutDuration={animationOutDuration}
            animationInDuration={animationIDuration}
            animationInDelay={animationInDelay}
        >
            <div className="InfoLayer">
                <div className="wrapper">
                    <div className="block">
                        <p className="text">{text}</p>
                    </div>
                </div>
            </div>
        </Animated>
    )
}

export default connect(mapStateToProps, mapDispathToProps)(InfoLayer)