import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionWrapper from '../../components/stc/SectionWrapper';
import SectionInnerWrapper from '../../components/stc/SectionInnerWrapper';
import SectionHeader from '../../components/SectionHeader';
import NewOrders from '../../components/NewOrders';
import DownloadOrdersControls from '../../components/DownloadOrdersControls';

class DownloadOrders extends Component {

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return (
      <SectionWrapper className="section-wrapper">
        <SectionHeader
          className="section-header"
          text="DOWNLOAD ORDERS"
          icon="envelope"/>
        <SectionInnerWrapper>
          <DownloadOrdersControls {...this.props} />
          {this.props.phase !== 'finish' && <NewOrders {...this.props} />}
        </SectionInnerWrapper>
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  accessToken: selectors.selectAccessToken(),
  newOrders: selectors.selectNewOrders(),
  editIndex: selectors.selectEditIndex(),
  editOrder: selectors.selectEditOrder(),
  phase: selectors.selectPhase(),
  message: selectors.selectMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewOrders: (payload) => dispatch(actions.getNewOrders(payload)),
    setEditIndex: (payload) => dispatch(actions.setEditIndex(payload)),
    resetEditIndex: () => dispatch(actions.resetEditIndex()),
    editOrder: (payload) => dispatch(actions.editOrder(payload)),
    saveNewOrders: (payload) => dispatch(actions.saveNewOrders(payload)),
    resetState: () => dispatch(actions.resetState()),
    finish: () => dispatch(push('print-orders')),
    home: () => dispatch(push('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadOrders);
