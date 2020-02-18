import React from 'react'
import { connect } from 'react-redux'
import { IFooterBlock } from '../types'
import FooterMenu from './FooterMenu'
// import FooterContacts from './FooterContacts'
// import FooterSocial from './FooterSocial'
import FooterBackForm from './FooterBackForm'

const mapStateToProps = (reducer:any):IFooterBlock => {
    const { footerBlockState } = reducer.DefaultReducer
    return {
      ...footerBlockState
    }
}

const FooterBlock = ({
    footerMenu, backForm
}:IFooterBlock) => {
    return (
        <div className="FooterBlock standart-container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <FooterMenu {...footerMenu}/>
                </div>
                {/* <div className="col-md-3 col-sm-12">
                    <FooterContacts {...contactsList}/>
                </div> */}
                {/* <div className="col-md-3">
                    <FooterSocial {...socialList}/>
                </div>
                <div className="col-md-3">
                    <FooterBackForm {...backForm}/>
                </div> */}

                <div className="col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-md-12  col-sm-12">
                            <FooterBackForm {...backForm}/>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default connect(mapStateToProps)(FooterBlock)