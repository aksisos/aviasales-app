import React, { useEffect } from 'react';
import { Radio } from 'antd';
import  './tabs.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions';

const Tabs = function Tabs ( { isCheapest, sortToggle, fetchTickets }) {
  const options = [
    { label: 'САМЫЙ ДЕШЕВЫЙ', value: true },
    { label: 'САМЫЙ БЫСТРЫЙ', value: false }
  ];

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return <div>
    <Radio.Group
      options={options}
      onChange={sortToggle}
      value={isCheapest}
      optionType="button"
      buttonStyle="solid"
    />
  </div>;
};

const mapStateToProps = (state) => ({
  isCheapest: state.isCheapest,
  tickets: state.tickets
});
  
const mapDispatchToProps = (dispatch) => {
  const { sortToggle, fetchTickets } = bindActionCreators(actions, dispatch);
  
  return {
    sortToggle,
    fetchTickets
  };
};

Tabs.defaultProps = {
  isCheapest: true,
};

Tabs.propTypes = {
  isCheapest: PropTypes.bool,
  sortToggle: PropTypes.func.isRequired,
  fetchTickets: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
