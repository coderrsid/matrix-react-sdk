/*
Copyright 2017 Vector Creations Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import AccessibleButton from './AccessibleButton';
import dis from '../../../dispatcher';
import sdk from '../../../index';
import Analytics from '../../../Analytics';

export default React.createClass({
    displayName: 'RoleButton',

    propTypes: {
        size: PropTypes.string,
        tooltip: PropTypes.bool,
        action: PropTypes.string.isRequired,
        mouseOverAction: PropTypes.string,
        label: PropTypes.string.isRequired,
        iconPath: PropTypes.string,
        className: PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            size: "25",
            tooltip: false,
        };
    },

    getInitialState: function() {
        return {
            showTooltip: false,
        };
    },

    _onClick: function(ev) {
        ev.stopPropagation();
        Analytics.trackEvent('Action Button', 'click', this.props.action);
        dis.dispatch({action: this.props.action});
    },

    _onMouseEnter: function() {
        if (this.props.tooltip) this.setState({showTooltip: true});
        if (this.props.mouseOverAction) {
            dis.dispatch({action: this.props.mouseOverAction});
        }
    },

    _onMouseLeave: function() {
        this.setState({showTooltip: false});
    },

    render: function() {
        const TintableSvg = sdk.getComponent("elements.TintableSvg");

        let tooltip;
        if (this.state.showTooltip) {
            const RoomTooltip = sdk.getComponent("rooms.RoomTooltip");
            tooltip = <RoomTooltip className="mx_RoleButton_tooltip" label={this.props.label} />;
        }

        const icon = this.props.iconPath ?
                (<TintableSvg src={this.props.iconPath} width={this.props.size} height={this.props.size} />) :
                undefined;

        const classNames = ["mx_RoleButton"];
        if (this.props.className) {
            classNames.push(this.props.className);
        }

        return (
            <AccessibleButton className={classNames.join(" ")}
                onClick={this._onClick}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
                aria-label={this.props.label}
            >
                { icon }
                { tooltip }
            </AccessibleButton>
        );
    },
});
