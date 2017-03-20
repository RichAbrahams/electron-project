import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import SectionWrapper from '../../components/stc/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import DownloadOrdersButton from '../../components/DownloadOrdersButton';

class DownloadOrders extends Component {

  componentDidMount() {
    console.log('dl mounted');
    this.props.getNewOrders(this.props.accessToken);
  }

  render() {
    return (
      <SectionWrapper>
        <SectionHeader text="DOWNLOAD ORDERS" icon="envelope"/>
        <DownloadOrdersButton {...this.props}/>
      </SectionWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  accessToken: selectors.selectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNewOrders: (payload) => dispatch(actions.getNewOrders(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadOrders);
