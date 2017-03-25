import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionWrapper from '../../components/stc/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import NewOrders from '../../components/NewOrders';

class DownloadOrders extends Component {

  componentDidMount() {
    console.log('dl mounted');
    this.props.getNewOrders(this.props.accessToken);
  }

  handleSubmit() {
    console.log('edit submitted');
  }

  render() {
    return (
      <SectionWrapper>
        <SectionHeader text="DOWNLOAD ORDERS" icon="envelope" />
        <NewOrders {...this.props} handleSubmit={this.handleSubmit} />
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  accessToken: selectors.selectAccessToken(),
  newOrders: selectors.selectNewOrders(),
  editIndex: selectors.selectEditIndex(),
  editOrder: selectors.selectEditOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewOrders: (payload) => dispatch(actions.getNewOrders(payload)),
    setEditIndex: (payload) => dispatch(actions.setEditIndex(payload)),
    resetEditIndex: () => dispatch(actions.resetEditIndex()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadOrders);
