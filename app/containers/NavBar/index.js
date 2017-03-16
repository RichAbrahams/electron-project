import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import Nav from '../../components/stc/Nav';
import NavBarUL from '../../components/stc/NavBarUL';
import NavButton from '../../components/stc/NavButton';
import * as selectors from './selectors';
import * as actions from './actions';

class NavBar extends Component {

  componentDidMount() {
    if (!this.props.refreshToken) {
      this.props.checkForLocalKeys();
    }
  }

  render() {
    return (
      <Nav>
        <NavBarUL>
          <li className="has-children">HOME
            <ul>
              <li><NavButton onClick={() => this.props.changePage('/')}>SUB1</NavButton></li>
              <li><NavButton>SUB2</NavButton></li>
              <li><NavButton>SUB3</NavButton></li>
              <li><NavButton>SUB4</NavButton></li>
              <li><NavButton>SUB5</NavButton></li>
            </ul>
          </li>
          <li className="has-children">ORDERS
            <ul>
              <li><NavButton onClick={() => this.props.changePage('download-orders')}>DOWNLOAD</NavButton></li>
              <li><NavButton onClick={() => this.props.changePage('orders')}>VIEW</NavButton></li>
            </ul>
          </li>
          <li className="has-children">PRODUCTS
            <ul>
              <li><NavButton onClick={() => this.props.changePage('products')}>VIEW</NavButton></li>
            </ul>
          </li>
          <li className="has-children">CONSIGNMENTS
            <ul>
              <li><NavButton onClick={() => this.props.changePage('add-consignment')}>ADD</NavButton></li>
              <li><NavButton onClick={() => this.props.changePage('consignments/view')}>VIEW</NavButton></li>
            </ul>
          </li>
          <li className="has-children">SALES
            <ul>
              <li><NavButton onClick={() => this.props.changePage('salesdata')}>SUB1</NavButton></li>
              <li><NavButton>SUB2</NavButton></li>
              <li><NavButton>SUB3</NavButton></li>
            </ul>
          </li>
          <li className="has-children">SETTINGS
            <ul>
              <li><NavButton onClick={() => this.props.changePage('settings')}>SUB1</NavButton></li>
              <li><NavButton>SUB2</NavButton></li>
              <li><NavButton>SUB3</NavButton></li>
            </ul>
          </li>
        </NavBarUL>
      </Nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectRoute: selectors.selectRoute(),
  refreshToken: selectors.selectRefreshToken(),
  accessToken: selectors.selectAccessToken(),
  tokenExpires: selectors.selectAccessTokenExpires(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePage: (newPage) => dispatch(push(newPage)),
    ebaySignIn: () => dispatch(actions.signInStart()),
    checkForLocalKeys: () => dispatch(actions.checkForLocalKeys()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
