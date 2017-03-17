import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionHeader from '../../components/SectionHeader';

class Orders extends Component {

  componentDidMount() {
    this.props.getUnfullfilledOrders();
  }

  render() {
    return (
      <SectionHeader text="ORDERS" icon="envelope">
        {this.props.data}
      </SectionHeader>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    getUnfullfilledOrders: () => dispatch(actions.getUnfulfilledOrders()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
