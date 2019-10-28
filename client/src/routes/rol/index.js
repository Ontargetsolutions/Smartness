/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// Widgets
import ActiveUser from 'Components/Widgets/ActiveUser';

export default class Blank extends Component {
	render() {
		return (
			<div className="blank-wrapper">
				<Helmet>
					<title>Rol Page</title>
					<meta name="description" content="Reactify Rol Page" />
				</Helmet>
				<PageTitleBar title={<IntlMessages id="sidebar.rol" />} match={this.props.match} />
                <ActiveUser />
			</div>
		);
	}
}
