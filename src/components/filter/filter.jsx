import React from 'react';
import { Checkbox } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions';

import classes from './filter.module.scss';

const Filter = function Filter ({checkList, check, checkAll, plainOptions}) {
  const CheckboxGroup = Checkbox.Group;
  return  (
    <div className={classes.filter_block}> 
      <div> КОЛИЧЕСТВО ПЕРЕСАДОК </div>
      <Checkbox  onChange={checkAll} checked={checkList.length === 4}>
        Все
      </Checkbox>
      <CheckboxGroup 
        className={classes.checkbox_wrapper}
        options={plainOptions} value={checkList} onChange={check} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkList: state.checkList,
  plainOptions: state.plainOptions,
  checkAllStatus: state.checkAllStatus,
});

const mapDispatchToProps = (dispatch) => {
  const { check, checkAll } = bindActionCreators(actions, dispatch);
  return {
    check,
    checkAll
  };
};

Filter.propTypes = {
  checkList: PropTypes.arrayOf(PropTypes.string).isRequired,
  check: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  plainOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
