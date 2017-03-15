import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionWrapper from '../../components/stc/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import DownloadOrdersButton from '../../components/DownloadOrdersButton';

class DownloadOrders extends Component {
  render() {
    return (
      <SectionWrapper>
        <SectionHeader text="DOWNLOAD ORDERS" icon="envelope" />
        <DownloadOrdersButton {...this.props} />
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadOrders);
