import { useState, useContext, useEffect } from 'react';
import { Modal, Radio, Button } from 'antd'
import { ModalFilterShowContext } from '../index';
import Search from '../../../components/Search';
import { FilterConditionContext } from '../../content';
import { useDispatch, useSelector } from 'react-redux';
import { parseFilterString } from "../../../utils/filterstring"
import { ORIGINAL_DEVICE_SELECT_ID, deviceFilter, agentFilter } from "../../../utils/config"


const FilterTagModal = () => {
  //context
  const [filterTagState, setFilterTagState] = useContext(ModalFilterShowContext);
  const setFilterCondition = useContext(FilterConditionContext)[1];

  //state
  const [radioValue, setRadioValue] = useState('device');
  const [crrFilterCondition, setCrrFilterCondition] = useState<any[]>();
  const [initFilterCondition, setInitFilter] = useState<any[]>([]);

  const dispatch = useDispatch();
  //redux state
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);

  /* eslint-disable */
  //load init filter condition for refresh
  useEffect(() => {
    const crrFilterString = localStorage.getItem("crrFilterString");
    let initCondition;
    if (crrFilterString) {
      initCondition = parseFilterString(crrFilterString);
      dispatch({
        type: "FILTER_CONDITION_REQUEST",
        payload: {
          filterCondition: initCondition,
        },
      })
      setInitFilter(initCondition)
    }
  }, [localStorage.getItem("crrFilterString")])
  /* eslint-enable */
  //select filter
  const getCurrentState = (e: any) => {
    setRadioValue(e.target.value);
  }

  const handleChangeSearchValue = (searchCondition: any) => {
    setCrrFilterCondition(searchCondition);
  }

  const handleClearFilterCondition = () => {
    dispatch({
      type: "CHANGE_SELECT_DEVICE",
      payload: ORIGINAL_DEVICE_SELECT_ID
    })
    dispatch({
      type: "CLEAR_FILTER_REQUEST",
      payload: false
    })
    dispatch({
      type: "LOAD_FILTER_ACTIVE",
      payload: false
    })
    dispatch({
      type: "FILTER_CONDITION_REQUEST",
      payload: []
    })
    localStorage.setItem("currentSelected", '[]');
    localStorage.setItem("currentModel", '[]');
    localStorage.removeItem("crrFilterString");
    // localStorage.setItem("crrFilterString", '[]');
    setCrrFilterCondition([]);
    setFilterCondition([]);
    setFilterTagState(false);
  }

  const handleSearch = () => {
    localStorage.setItem("currentSelected", '[]');
    localStorage.setItem("currentModel", '[]');
    setFilterCondition(crrFilterCondition);
    setFilterTagState(false);
    dispatch({
      type: "TABLE_PAGINATION_CHANGE",
      payload: {
        current: 1,
        pageSize: tablePagination.pageSize
      }
    });
    dispatch({
      type: "CLEAR_FILTER_REQUEST",
      payload: true
    })
    dispatch({
      type: "LOAD_FILTER_ACTIVE",
      payload: false
    })
    localStorage.setItem("currentPage", "1");
    localStorage.setItem("currentPageSize", String(tablePagination.pageSize));
  }

  return (
    <Modal
      title="Device's filters"
      centered
      visible={filterTagState}
      onCancel={setFilterTagState.bind(null, false)}
      className='device-filters-modal'
      footer={[
        <Button key='clear-all' className='filters-clear-all-button' onClick={handleClearFilterCondition}>Clear all</Button>,
        <Button key='search' className='filters-search-button' onClick={handleSearch}>Search</Button>
      ]}
    >
      <div className='radio-group'>
        <Radio.Group onChange={getCurrentState} value={radioValue}>
          <Radio value='device'>By device parameters</Radio>
          <Radio value='agent'>By agent parameters</Radio>
        </Radio.Group>
      </div>
      <Search
        data={radioValue === "device" ? deviceFilter : agentFilter}
        onChange={handleChangeSearchValue}
        state={radioValue}
        initCondition={initFilterCondition}
      />
    </Modal >

  )
}
export default FilterTagModal