import React from 'react';
import { connect } from 'react-redux';
import { IFooterBlock, IRootApp } from '../types';
import FooterMenu from './FooterMenu';
import FooterContacts from './FooterContacts';
import FooterSocial from './FooterSocial';
import FooterBackForm from './FooterBackForm';

const mapStateToProps = (reducer:any):IFooterBlock => {
    const { footerBlockState } = reducer.DefaultReducer
    return {
      ...footerBlockState
    }
}

const FooterBlock = ({
    footerMenu, contactsList, socialList, backForm
}:IFooterBlock) => {
    return (
        <div className="FooterBlock standart-container">
            <div className="row">
                <div className="col-md-3">
                    <FooterMenu {...footerMenu}/>
                </div>
                <div className="col-md-3">
                    <FooterContacts {...contactsList}/>
                </div>
                {/* <div className="col-md-3">
                    <FooterSocial {...socialList}/>
                </div>
                <div className="col-md-3">
                    <FooterBackForm {...backForm}/>
                </div> */}

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-5">
                            <FooterSocial {...socialList}/>
                        </div>
                        <div className="col-md-7">
                            <FooterBackForm {...backForm}/>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default connect(mapStateToProps)(FooterBlock)