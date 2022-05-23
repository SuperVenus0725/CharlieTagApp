import { useState, useEffect } from 'react';
import { Select, Input, Divider, DatePicker } from 'antd';
import _ from 'lodash';//, { values }
//import Icon from '@ant-design/icons';
import { check, plus, close, greaterThan, greaterThanEqual, lessThanEqual, lessThan, equal } from '../../icons';
import { useSelector } from 'react-redux';


const { Option } = Select;

function Search(props: any) {
  const { data, onChange, defaultValue, state } = props;
  const activeFilter = props.activeFilter || [];
  const editFilter = props.editFilter || [];
  const automationTagId = props.automationTagId || null;
  const initFilterCondition = props.initCondition;

  // state
  const [searchValue, setSearchValue] = useState<any>([]);
  const activeState = useSelector((state: any) => state.loadActiveState.loadState);
  const editState = useSelector((state: any) => state.newModal.editModal);
  const filterState = useSelector((state: any) => state.filterState.filterState)

  const DEFAULT_SEARCH_VALUE = { FieldName: data[0].value, Operator: '=' }

  const numberFilter = ['Batch Number', 'ScanningsCount'];
  const stringFilter = ['TagName', 'Model', 'FirmWare', 'ID', 'SerialNumber', "AgentId"];
  const timeFilter = ['Scannings/Day'];
  /* eslint-disable */
  useEffect(() => {
    setSearchValue(defaultValue || [[DEFAULT_SEARCH_VALUE]]);
  }, [state])


  useEffect(() => {
    if (data.length) {
      if (!initFilterCondition || initFilterCondition.length === 0) { setSearchValue(defaultValue || [[DEFAULT_SEARCH_VALUE]]); }
      else setSearchValue(initFilterCondition);
    }
  }, []);


  useEffect(() => {
    if (activeState && activeFilter.length > 0) { setSearchValue(activeFilter); }
    if (!activeState && !initFilterCondition) { setSearchValue(defaultValue || [[DEFAULT_SEARCH_VALUE]]); }
  }, [activeState])

  useEffect(() => {
    if (editState && editFilter.length > 0 && automationTagId) { setSearchValue(editFilter); }
    else if (!initFilterCondition) setSearchValue(defaultValue || [[DEFAULT_SEARCH_VALUE]]);
  }, [automationTagId, editState])


  useEffect(() => {
    if (!filterState) setSearchValue(defaultValue || [[DEFAULT_SEARCH_VALUE]]);
  }, [filterState])

  const options = ['==', '>', "<", '>=', '<='];
  const [secondOption, setSecondOption] = useState<any[]>([]);

  // const initState = () => {
  //   setSearchValue([[DEFAULT_SEARCH_VALUE]]);
  // }
  /* eslint-enable */
  const isEnableDelete = () => {
    return searchValue.length > 1 || searchValue[0].length > 1;
  }

  const handleChangeSearch = (fieldName: string, index: number, parentIndex: number, value: any) => {
    let newSearchValue: any = _.clone(searchValue);
    const settingValue = fieldName === 'Values' ? [value.target.value] : value
    _.set(newSearchValue, `[${parentIndex}][${index}].${fieldName}`, settingValue);
    if (fieldName === 'FieldName') {
      if (stringFilter.includes(newSearchValue[parentIndex][index].FieldName))
        newSearchValue[parentIndex][index].Operator = '=';
      if (numberFilter.includes(newSearchValue[parentIndex][index].FieldName))
        newSearchValue[parentIndex][index].Operator = '==';
    }
    onChange(newSearchValue);
    setSearchValue(newSearchValue);
  }

  const handleAddNewSearchItem = (index: number, parentIndex: number) => {
    let newSearchValue: any = _.clone(searchValue);
    let parentValue: any = searchValue[parentIndex];
    parentValue.push(DEFAULT_SEARCH_VALUE);
    newSearchValue[parentIndex] = parentValue;
    onChange(newSearchValue);
    setSearchValue(newSearchValue);
  }

  const handleDeleteSearchItem = (index: number, parentIndex: number) => {
    let newSearchValue: any = _.clone(searchValue);
    let parentValue: any = searchValue[parentIndex];
    if (parentValue.length === 1) {
      if (newSearchValue.length === 1) {
        parentValue = [DEFAULT_SEARCH_VALUE];
        newSearchValue[parentIndex] = parentValue;
      } else {
        newSearchValue.splice(parentIndex, 1);
      }
    } else {
      parentValue.splice(index, 1);
      newSearchValue[parentIndex] = parentValue;
    }
    onChange(newSearchValue);
    setSearchValue(newSearchValue);
  }

  const handleAddNewSearchItemGroup = () => {
    let newSearchValue: any = _.clone(searchValue);
    newSearchValue.push([DEFAULT_SEARCH_VALUE]);
    onChange(newSearchValue);
    setSearchValue(newSearchValue);
  }


  const handleFirstInterval = (fieldName: string, index: number, parentIndex: number, value: any) => {
    let newSearchValue: any = _.clone(searchValue);
    let settingValue;
    if (fieldName === 'Values') {
      settingValue = [value.target.value];
      if (!newSearchValue[parentIndex][index].Values)
        _.set(newSearchValue, `[${parentIndex}][${index}].${fieldName}`, settingValue);
      else newSearchValue[parentIndex][index].Values[0] = String(settingValue);
    }
    else _.set(newSearchValue, `[${parentIndex}][${index}].${fieldName}`, value);
    if (fieldName === 'FieldName') {
      if (stringFilter.includes(newSearchValue[parentIndex][index].FieldName))
        newSearchValue[parentIndex][index].Operator = '=';
      if (numberFilter.includes(newSearchValue[parentIndex][index].FieldName))
        newSearchValue[parentIndex][index].Operator = '==';
    }
    if (fieldName === "Operator") {
      let currentOperator = String(newSearchValue[parentIndex][index].Operator);
      let currentOption: any = [];
      if (currentOperator === '==') { currentOption = []; setSecondOption([...currentOption]); }
      if (currentOperator === '>' || currentOperator === '>=') { currentOption = ['<', '<=']; setSecondOption([...currentOption]); }
      if (currentOperator === '<=' || currentOperator === '<') { currentOption = ['>', '>=']; setSecondOption([...currentOption]); }
    }
    onChange(newSearchValue);
    setSearchValue(newSearchValue);
  }

  const handleSecondInterval = (fieldName: string, index: number, parentIndex: number, value: any) => {
    let newSearchValue: any = _.clone(searchValue);
    if (fieldName === 'SecondOperator') _.set(newSearchValue, `[${parentIndex}][${index}].${fieldName}`, value);
    if (fieldName === 'SecondValues') {
      let settingValue = [value.target.value];
      _.set(newSearchValue, `[${parentIndex}][${index}].${fieldName}`, settingValue);
    }
    onChange(newSearchValue);
  }

  const renderSearchItem = (searchItem: any, index: number, parentIndex: number) => {
    const operationValue = `${searchItem.Negative ? '!' : ''}${searchItem.Operator || '='}`;
    const secondOperator = _.get(searchItem, 'SecondOperator');
    const inputValue = _.get(searchItem, 'Values[0]') || '';
    const secondValue = _.get(searchItem, 'SecondValues[0]');
    const isEnableDeleteButton = isEnableDelete();


    const stringOption = (
      <div>
        <Select
          value={operationValue}
          className='search-operation-select'
          onChange={handleChangeSearch.bind(null, 'Operator', index, parentIndex)}
        >
          <Option value='='>is</Option>
          <Option value='!='>is not</Option>
          <Option value='LIKE'>contains</Option>
          <Option value='UNLIKE'>does not contain</Option>
        </Select>
        <Input className='search-value-input' value={inputValue} onChange={handleChangeSearch.bind(null, 'Values', index, parentIndex)} />
      </div>
    );

    const numberOption = (
      <div className='number-option'>
        <Select
          value={operationValue}
          onChange={handleFirstInterval.bind(null, 'Operator', index, parentIndex)}
          className={"number-filter-option"}
        >
          {options.map((item: any, index: any) => {
            switch (item) {
              case '==': return <Option value={item} key={index}><img src={equal} alt='equal' /></Option>
              case '>=': return <Option value={item} key={index}><img src={greaterThanEqual} alt='greaterThanEqual' /></Option>
              case '>': return <Option value={item} key={index}><img src={greaterThan} alt='greaterThan' /></Option>
              case '<=': return <Option value={item} key={index}><img src={lessThanEqual} alt='lessThanEqual' /></Option>
              case '<': return <Option value={item} key={index}><img src={lessThan} alt='lessThan' /></Option>
              default: return null;
            }
          })}
        </Select>
        <Input type="number" className={searchValue[parentIndex][index].Operator !== "==" ? 'search-value-input' : 'search-first-interval-value-input'} value={inputValue} onChange={handleFirstInterval.bind(null, 'Values', index, parentIndex)} />
        {searchValue[parentIndex][index].Operator !== "==" &&
          <Select
            onChange={handleSecondInterval.bind(null, 'SecondOperator', index, parentIndex)}
            className="number-filter-option"
            style={{ marginLeft: "10px" }}
            value={secondOperator}
          >
            {secondOption && secondOption.map((item: any, index: any) => {
              switch (item) {
                case '>=': return <Option value={item} key={index}><img src={greaterThanEqual} alt='greaterThanEqual' /></Option>
                case '>': return <Option value={item} key={index}><img src={greaterThan} alt='greaterThan' /></Option>
                case '<=': return <Option value={item} key={index}><img src={lessThanEqual} alt='lessThanEqual' /></Option>
                case '<': return <Option value={item} key={index}><img src={lessThan} alt='lessThan' /></Option>
                default: return null;
              }
            })}
          </Select>}
        {searchValue[parentIndex][index].Operator !== "==" && <Input value={secondValue} type="number" className='search-value-input' onChange={handleSecondInterval.bind(null, 'SecondValues', index, parentIndex)} />}
      </div>
    );

    const timeOption = (
      <div className='time-interval'>
        <DatePicker placeholder='Start Date' />
        <DatePicker placeholder='End Date' />
      </div>
    );

    return (
      <div key={`${parentIndex}-${index}`} className='search-item'>
        {index > 0 && <div key={`${parentIndex}-${index}-and-divider`} className='search-item-and-divider' >and</div>}
        <div>
          <Select
            className='search-target-select'
            onChange={handleChangeSearch.bind(null, 'FieldName', index, parentIndex)}
            value={searchItem.FieldName}
            menuItemSelectedIcon={<img src={check} alt='check' />}
          >
            {data.map((dataItem: any, dataIndex: any) => {
              return <Option key={dataIndex} value={dataItem.value}>{dataItem.title}</Option>
            })}
          </Select>
          {numberFilter.includes(searchValue[parentIndex][index].FieldName) ? numberOption : ''}
          {stringFilter.includes(searchValue[parentIndex][index].FieldName) ? stringOption : ''}
          {timeFilter.includes(searchValue[parentIndex][index].FieldName) ? timeOption : ''}
          <div className='search-item-operation-buttons'>
            <div className='operation-button plus-button' onClick={handleAddNewSearchItem.bind(null, index, parentIndex)}>
              <img alt='plus' src={plus} />
            </div>
            <div className={`operation-button close-button ${isEnableDeleteButton ? 'close-button-enable' : ''}`} onClick={isEnableDeleteButton ? handleDeleteSearchItem.bind(null, index, parentIndex) : () => { }}>
              <img alt='close' src={close} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container-component-search'>
      {searchValue.map((parentItem: any, parentIndex: number) => {
        if (!parentItem || !parentItem.length) return null;
        return (
          <div key={parentIndex} className='search-item-group'>
            {parentIndex > 0 && <Divider className='search-item-or-divider'>or</Divider>}
            <div className={parentItem.length > 1 ? 'search-item-group-container' : ''}>
              {parentItem.map((searchItem: any, searchIndex: number) => {
                return renderSearchItem(searchItem, searchIndex, parentIndex);
              })}
            </div>
          </div>
        )
      })}
      <Divider>
        <div className='divider-button' onClick={handleAddNewSearchItemGroup}><img src={plus} alt='plus' />or</div>
      </Divider>
    </div>
  );
}

export default Search;