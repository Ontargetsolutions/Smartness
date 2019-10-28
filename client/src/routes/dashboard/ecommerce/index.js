/**
 * Ecommerce Dashboard
 */

import React, {Component} from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

export default class EcommerceDashboard extends Component {
  render () {
    const {match} = this.props;
    return (
      <div className="ecom-dashboard-wrapper">
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Reactify Dashboard" />
        </Helmet>
        <PageTitleBar
          title={<IntlMessages id="sidebar.ecommerce" />}
          match={match}
        />
      </div>
    );
  }
}
