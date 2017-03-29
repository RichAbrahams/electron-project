import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { push } from 'react-router-redux';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionHeader from '../../components/SectionHeader';
import PrintOrdersInner from '../../components/PrintOrdersInner';
import PrintOrdersControls from '../../components/PrintOrdersControls';
import SectionInnerWrapper from '../../components/stc/SectionInnerWrapper';
import SectionWrapper from '../../components/stc/SectionWrapper';

class PrintOrders extends Component {

  componentWillUnmount() {
    this.props.resetState();
  }


  render() {
    return (
      <SectionWrapper className="section-wrapper">
        <SectionHeader
          className="section-header"
          text="PRINT ORDERS"
          icon="print"/>
        <SectionInnerWrapper>
          <PrintOrdersControls {...this.props} />
          {this.props.orders !== null && <PrintOrdersInner {...this.props} />}
        </SectionInnerWrapper>
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  phase: selectors.selectPhase(),
  message: selectors.selectMessage(),
  orders: selectors.selectOrders(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUnprintedOrders: () => dispatch(actions.getUnprintedOrders()),
    printOrders: () => dispatch(actions.printOrders()),
    finish: () => { console.log('finished clicked'); },
    resetState: () => dispatch(actions.resetState()),
    home: () => dispatch(push('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintOrders);
