import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelContent from './PanelContent';
import Animate from 'rc-animate';

class CollapsePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagStatus: this.props.flagStatus,
    };
  }

  handleItemClick() {
    if (this.props.onItemClick) {
      this.props.onItemClick(this.props.id);
    }
  }

  handleCheckFlagOnClick(e) {
    e.stopPropagation();
    if (this.props.headerReadIconOnClick) {
      this.setState((prevState) => {
        return {
          flagStatus: !prevState.flagStatus,
        };
      }, () => this.props.headerReadIconOnClick(this.props.id, this.state.flagStatus)
      );
    }
  }

  render() {
    const {
      className,
      id,
      style,
      prefixCls,
      header,
      headerClass,
      children,
      isActive,
      showArrow,
      destroyInactivePanel,
      disabled,
      forceRender,
      showHeaderReadIcon,
    } = this.props;
    const { flagStatus } = this.state;
    const headerCls = classNames(`${prefixCls}-header`, {
      [headerClass]: headerClass,
    });
    const itemCls = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive,
      [`${prefixCls}-item-disabled`]: disabled,
    }, className);
    const showHeaderReadIconCls = classNames(
      {
        [`headerReadIcon`]: true,
        [`headerReadIcon-selected`]: flagStatus,
      });
    return (
      <div className={itemCls} style={style} id={id} role="tablist">
        <div
          className={headerCls}
          onClick={this.handleItemClick.bind(this)}
          role="tab"
          aria-expanded={isActive}
        >
          {showArrow && <i className="arrow" />}
          {header}
          {showHeaderReadIcon &&
            <i
              className={showHeaderReadIconCls}
              onClick={this.handleCheckFlagOnClick.bind(this)}
            />
          }
        </div>
        <Animate
          showProp="isActive"
          exclusive
          component=""
          animation={this.props.openAnimation}
        >
          <PanelContent
            prefixCls={prefixCls}
            isActive={isActive}
            destroyInactivePanel={destroyInactivePanel}
            forceRender={forceRender}
          >
            {children}
          </PanelContent>
        </Animate>
      </div>
    );
  }
}

CollapsePanel.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  id: PropTypes.string,
  children: PropTypes.any,
  openAnimation: PropTypes.object,
  prefixCls: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  headerClass: PropTypes.string,
  showArrow: PropTypes.bool,
  showHeaderReadIcon: PropTypes.bool,
  flagStatus: PropTypes.bool,
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
  headerReadIconOnClick: PropTypes.func,
  style: PropTypes.object,
  destroyInactivePanel: PropTypes.bool,
  disabled: PropTypes.bool,
  forceRender: PropTypes.bool,
};

CollapsePanel.defaultProps = {
  showArrow: true,
  showHeaderReadIcon: false,
  flagStatus: false,
  isActive: false,
  destroyInactivePanel: false,
  onItemClick() {},
  headerReadIconOnClick() {},
  headerClass: '',
  forceRender: false,
};

export default CollapsePanel;
