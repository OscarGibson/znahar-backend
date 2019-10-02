import React from 'react';

interface BottomFooterBlockData {
    text:string
}

const BottomFooterBlock = ({ text }:BottomFooterBlockData) => {
    return (
        <div className="BottomFooterBlock">
            <span className="copyright">{text}</span>
        </div>
    )
}

export default BottomFooterBlock