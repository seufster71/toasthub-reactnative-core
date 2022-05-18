import React from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

const Tabs = ({tabLabels, activeTab, onClickTabItem}) => {



  return (
    <div className="tabs">
      <ol className="tab-list">
        {tabLabels.map((label) => {

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        No content yet
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabLabels: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClickTabItem: PropTypes.func.isRequired,
};

export default Tabs;
