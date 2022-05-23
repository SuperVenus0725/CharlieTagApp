import { useState, useContext, useEffect } from 'react';
import { Table, Popover, Row, Tag, Checkbox, Pagination } from 'antd';
import { buttonsort, setting, buttonmore, service } from '../../icons/index';
import Icon from '@ant-design/icons';
import { SelectedColumnsContext, TotalNumberContext } from '../content';
import { RuleDataContext, TableDataContext, TagListContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash"
import { checkBoxWidth, widthId, restWidth, widthSN } from "../../utils/config"
import { assignNewTag, createDeviceSelectId, deviceSelectBuild, fetchDeviceData } from '../../utils/request';
import { filterString } from '../../utils/filterstring';

const ContentTable = () => {

  let crrPageSize = Number(localStorage.getItem("currentPageSize"));
  //context
  const [dataSource, setData] = useContext(TableDataContext);
  const totalNum = useContext(TotalNumberContext)[0];
  const [selectedRowKeys, setSelectedRowKeys] = useContext(SelectedColumnsContext);
  const ruleData = useContext(RuleDataContext)[0];
  const tagList = useContext(TagListContext)[0];

  // state
  // const [addTag, setAddTag] = useState<any[]>(tags);
  const [allChecked, setAllChecked] = useState(false);
  const [currentSeial, setCurrentSerial] = useState('');
  const [selectedColumns, setColumns] = useState([0, 1, 3, 4, 6]);
  const [selectedModel, setSelectedModel] = useState<any[]>([]);
  const [showTags, setShowTags] = useState<any[]>([]);

  const deviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);
  //icon
  const sort = () => <img src={buttonsort} alt='buttonsort' />;
  const settings = () => <img src={setting} alt='settings' />;
  const ellipses = () => <img src={buttonmore} alt='ellipses' />;
  const services = () => <img src={service} alt='service' />;


  const dispatch = useDispatch();
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);

  const tableColumns = [
    {
      title: () => {
        return (<div className='order-title'>#</div>);
      },
      dataIndex: 'id',
      width: widthId,
      render(text: any, record: any) {
        return (
          <div className='order'>{text}</div>
        );
      },
      onCell: () => {
        return { style: { background: '#ededed' } }
      }
    },
    {
      dataIndex: 'checked',
      width: checkBoxWidth,
      title: () => {
        return (
          <div className='checkbox-title'>
            <Checkbox
              checked={allChecked}
              onChange={(e) => selectAll(e)}
            ></Checkbox>
          </div>
        );
      },
      render: (text: any, rec: any, index: any) => {
        return (
          <div className='checkbox'>
            <Checkbox
              checked={
                selectedRowKeys.includes(rec.id) ||
                allChecked
              }
              onChange={(e) => handleChangeRowSelection(e, rec)}
            ></Checkbox>
          </div>
        );
      },
      onCell: () => {
        return { style: { padding: "0px" } }
      }
    },
    {
      title: () => {
        return (
          <div className='model'>
            <div className='text'>Model</div>
            <div className='sort'>  <Icon component={sort} /> </div>
          </div>)
      },
      dataIndex: 'model'
    },
    {
      title: 'FirmWare',
      dataIndex: 'firmWare'
    },
    {
      title: 'ID',
      dataIndex: 'Id'
    },
    {
      title: 'Serial Number',
      dataIndex: 'serial_number',
    },
    {
      title: 'Batch Number',
      dataIndex: 'batchNumber'
    },
    {
      title: 'Scannings Count',
      dataIndex: 'scanningsCount',
    },
    {
      title: 'Scannings/day',
      dataIndex: 'scanningsDay'
    },
    {
      title: 'Scannings time',
      dataIndex: 'scanningsTime'
    },
    {
      title: 'First activity',
      dataIndex: 'firstActivity'
    },
    {
      title: 'Last activity',
      dataIndex: 'lastActivity'
    },
    {
      title: () => {
        return (
          <div className='tags'>
            <div className='tags-literal'>Tags</div>
            <div className='popconfirm'>
              <Popover placement='bottomRight' className='check-list' content={checkList} trigger='click'>
                < Icon component={settings} className='settings' />
              </Popover>
            </div>
          </div>)
      },
      ellipsis: true,
      dataIndex: 'tags',
      render: (record: any, text: any) => {
        text.tags.sort(function (a: any, b: any) { return a.id - b.id })
        const tagsCategory = text.tags && text.tags.map((item: any, index: any) => {
          let flag = true;
          ruleData.listResult && ruleData.listResult.forEach((rule: any) => {
            if (rule.tag_id === item.id) flag = false;
          })

          // <div key={index} className='table-tags'>
          //   <Tag color='#1C89B6' onClick={handleRemoveTag.bind(this, text.id, 'service')} icon={<Icon component={services} />}>service</Tag>
          // </div>
          if (flag) return (
            <div key={index} className='table-tags'>
              <Tag color='#2db7f5' onClick={handleRemoveTag.bind(this, text.id, item.name)}>{item.name}</Tag>
            </div>
          )
          else return (<div key={index} className='table-tags'>
            <Tag color='#1C89B6' onClick={handleRemoveTag.bind(this, text.id, 'service')} icon={<Icon component={services} />}>{item.name}</Tag>
          </div>)
        })
        return (
          <div className='tags-list'>
            <div className='tags'>{tagsCategory}</div>
            <div className='tags-add-list'>
              <Popover placement='bottomRight' content={tagsList} trigger='click'>
                < Icon onClick={findAddTagIndex.bind(this, text.serial_number, text.id)} component={ellipses} className='ellipse' />
              </Popover>
            </div>
          </div>)
      }
    }
  ];


  tableColumns[0].width = widthId;
  let columnsDevicesIndex = [0, 12];
  let columnLength = selectedColumns.length;

  if (selectedColumns.includes(0)) {
    tableColumns[1].width = checkBoxWidth;
    columnsDevicesIndex.push(1);
    columnLength -= 1;
  }

  let columnWidth = restWidth / (columnLength);

  selectedColumns.forEach((item) => {
    if (item !== 0) {
      if (item === 1) { tableColumns[2].width = `${0.633 * columnWidth}%`; columnsDevicesIndex.push(item + 1); }
      else {
        if (item !== 4) { tableColumns[item + 1].width = `${0.562 * columnWidth}%`; columnsDevicesIndex.push(item + 1); }
        else { tableColumns[item + 1].width = widthSN; columnsDevicesIndex.push(item + 1); }
      }
    }
  })

  columnsDevicesIndex.sort(function (a, b) { return (a - b); })

  let columnsDevices: any = [];

  columnsDevicesIndex.forEach((item) => {
    columnsDevices.push(tableColumns[item]);
  })
  /* eslint-disable */
  useEffect(() => {
    let currentSelected = localStorage.getItem("currentSelected");
    let currentSelectedIndex = JSON.parse(String(currentSelected));
    let crrModel = localStorage.getItem("currentModel");
    let crrModelSelected = JSON.parse(String(crrModel))
    if (currentSelected) setSelectedRowKeys(currentSelectedIndex);
    if (crrModelSelected) setSelectedModel(crrModelSelected);
  }, [localStorage.getItem("currentSelected"), localStorage.getItem("currentModel")])

  useEffect(() => {
    let crrModels = localStorage.getItem("currentModel");
    if (crrModels) setSelectedModel(JSON.parse(crrModels));
  }, [])

  useEffect(() => {
    let crrColumns = localStorage.getItem("crrColumns");
    if (crrColumns) setColumns(JSON.parse(crrColumns));
  }, [])
  /* eslint-enable */
  // const columnsAgents = [
  //   {
  //     title: () => {
  //       return (<div className='order-title'>#</div>);
  //     },
  //     dataIndex: 'id',
  //     ellipsis: true,
  //     width: '2.17%',
  //     render(text: any, record: any) {
  //       return {
  //         props: {
  //           style: { background: '#ededed' }
  //         },
  //         children: <div className='order'>{text}</div>
  //       };
  //     }
  //   },
  //   {
  //     dataIndex: 'checked',
  //     width: '1.9%',
  //     title: () => {
  //       return (
  //         <div className='checkbox-title'>
  //           <Checkbox
  //             checked={allChecked}
  //             onChange={(e) => selectAll(e)}
  //           ></Checkbox>
  //         </div>
  //       );
  //     },
  //     render: (text: any, rec: any, index: any) => {
  //       return (
  //         <div className='checkbox'>
  //           <Checkbox
  //             checked={
  //               selectedRowKeys.includes(rec.id) ||
  //               allChecked
  //             }
  //             onChange={(e) => handleChangeRowSelection(e, rec)}
  //           ></Checkbox>
  //         </div>
  //       );
  //     }
  //   },
  //   {
  //     title: () => {
  //       return (
  //         <div className='model'>
  //           <div className='text'>Model</div>
  //           <div className='sort'>  <Icon component={sort} /> </div>
  //         </div>)
  //     },
  //     dataIndex: 'model',
  //     width: '12.17%',
  //   },
  //   {
  //     title: 'DeviceID',
  //     dataIndex: 'Id',
  //     width: '10.81%',
  //   },
  //   {
  //     title: 'SDK',
  //     key: 'sdk',
  //     dataIndex: 'sdk',
  //     width: '10.81%',
  //     ellipsis: true,
  //   },
  //   {
  //     title: 'OS',
  //     key: 'os',
  //     dataIndex: 'os',
  //     width: '10.81%',
  //     ellipsis: true,
  //   },
  //   {
  //     title: () => {
  //       return (
  //         <div className='connected'>
  //           Connected<span>(last time)</span>
  //         </div>)
  //     },
  //     key: 'connected',
  //     dataIndex: 'connected',
  //     width: '10.81%',
  //     ellipsis: true,
  //   },
  //   {
  //     title: () => {
  //       return (
  //         <div className='tags'>
  //           <div className='tags-literal'>Tags</div>
  //           <div className='popconfirm'>
  //             <Popover placement='bottomRight' className='check-list' content={checkList} trigger='click'>
  //               < Icon component={settings} />
  //             </Popover>
  //           </div>
  //         </div>)
  //     },
  //     key: 'tags',
  //     // width: '737px',
  //     ellipsis: true,
  //     dataIndex: 'tags',
  //     render: (record: any, text: any) => {
  //       const tagsCategory = text.tags.map((item: any, index: any) => {
  //         if (item.name === 'service')
  //           return (
  //             <div key={index} className='tag'>
  //               <Tag className='service' color='#1C89B6' icon={<Icon component={services} />} onClick={handleRemoveTag.bind(this, text.id, 'service')}>service</Tag>
  //             </div>
  //           )
  //         else return (
  //           <div key={index} className='tag' onClick={handleRemoveTag.bind(this, text.id, item.name)}>
  //             <Tag color='#2db7f5'>{item.name}</Tag>
  //           </div>
  //         )
  //       })
  //       return (
  //         <div className='tags-list'>
  //           <div className='tags'>{tagsCategory}</div>
  //           {(text.popover ?
  //             <div className='tags-add-list'>
  //               <Popover placement='bottomRight' content={tagsList} trigger='click'>
  //                 < Icon onClick={findAddTagIndex.bind(this, text.id)} component={ellipses} />
  //               </Popover>
  //             </div> :
  //             <div />)}
  //         </div>)
  //     }
  //   }
  // ];


  //change checkbox state
  const handleChangeRowSelection = (e: any, rec: any) => {
    const checked = e.target.checked;
    let currentSelected = selectedRowKeys;
    let crrModels = selectedModel;
    if (checked) {
      currentSelected.push(rec.id);
      crrModels.push(rec.serial_number);
      setSelectedRowKeys([...currentSelected]);
      setSelectedModel([...crrModels]);
      handleLocalSave(currentSelected);
      handleModelLocalSave(crrModels);

    } else {
      if (allChecked) setAllChecked(false);
      let emptyArray: any = [];
      currentSelected.forEach((item) => {
        if (item !== rec.id) emptyArray.push(item);
      })
      let emptyModel: any = [];
      crrModels.forEach((item) => {
        if (item !== rec.serial_number) emptyModel.push(item);
      })
      setSelectedRowKeys([...emptyArray]);
      setSelectedModel([...emptyModel]);
      handleLocalSave(emptyArray)
      handleModelLocalSave(emptyModel);
    }

  };

  const handleModelLocalSave = (array: any) => {
    let crrModel = _.clone(array);
    localStorage.setItem("currentModel", JSON.stringify(crrModel));
  }

  const handleLocalSave = (array: any) => {
    let currentSelected = _.clone(array);
    localStorage.setItem("currentSelected", JSON.stringify(currentSelected));
  }

  //change all checkbox state
  const selectAll = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      setAllChecked(true);
      let currentSelected = selectedRowKeys;
      let crrModels = selectedModel;
      dataSource.forEach((item) => {
        if (!currentSelected.includes(item.id))
          currentSelected.push(item.id);
        if (!crrModels.includes(item.serial_number))
          crrModels.push(item.serial_number);
      })
      setSelectedRowKeys([...currentSelected]);
      handleLocalSave(currentSelected);
      setSelectedModel([...crrModels]);
      handleModelLocalSave(crrModels);
    }
    else {
      setAllChecked(false);
      let currentSelected = selectedRowKeys;
      let crrModel = selectedModel;
      let emptyArray: any = [];
      currentSelected.forEach((item) => {
        let flag = true;
        dataSource.forEach((data) => {
          if (item === data.id) flag = false;
        })
        if (flag) emptyArray.push(item);
      })
      let emptyModel: any = [];
      crrModel.forEach((item) => {
        let flag = true;
        dataSource.forEach((data) => {
          if (data.serial_number === item) flag = false;
        })
        if (flag) emptyModel.push(item);
      })
      setSelectedRowKeys([...emptyArray]);
      handleLocalSave(emptyArray);
      setSelectedModel([...emptyModel]);
      handleModelLocalSave(emptyModel);
    }
  };

  //find row index when we click ellipse
  const findAddTagIndex = (currentSN: any, id: any) => {
    let emptyArray: any = [];
    tagList.forEach((item: any) => {
      let flag = true;
      dataSource[id - 1].tags.forEach((crrTag: any) => {
        if (crrTag.id === item.id) flag = false;
      })
      if (flag) { emptyArray.push(item); }
    })
    setShowTags([...emptyArray]);
    setCurrentSerial(currentSN);
  }

  const handleAddTag = async (item: any) => {
    let newCondition = [];
    newCondition.push([{
      FieldName: "SerialNumber",
      Negative: false,
      Operator: "=",
      valueType: "string",
      Values: [currentSeial],
    }]);
    const filter = {
      id: 0,
      filter: filterString(newCondition)
    }
    const createSelect = await createDeviceSelectId(filter);
    await deviceSelectBuild(createSelect.data.id);
    await assignNewTag(createSelect.data.id, item.node_guid, item.id).catch((err) => { console.log(err); })
    const fetchData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
    setData(fetchData.data.listResult);
  }

  const handleRemoveTag = (index: any, removeItem: any) => {
    // let currentDataSource = dataSource;
    // let emptyArray: any = [];
    // currentDataSource[index - 1].tags.map((item: any) => {
    //   if (item.name !== removeItem) emptyArray.push(item);
    // })
    // currentDataSource[index - 1].tags = emptyArray;
    // setData([...currentDataSource]);
  }

  const handleSelectColumn = (item: any) => {
    let currentColumn = selectedColumns;
    if (selectedColumns.indexOf(item) < 0) currentColumn.push(item);
    else {
      let emptyArray: any = [];
      currentColumn.forEach((column: any) => { if (Number(item) !== column) emptyArray.push(column); })
      currentColumn = emptyArray;
    }
    localStorage.setItem("crrColumns", JSON.stringify(currentColumn));
    setColumns([...currentColumn]);
  }

  const columnMenu = ['Mark All', 'Model', 'FirmWare', 'ID', 'Serial Number', 'Batch Number',
    'Scannings Count', 'Scannings / day', 'Scannings time', 'First activity', 'Last activity'];

  //top_right checkbox list
  const checkList = (
    <div className='checkbox-group'>
      {columnMenu.map((item: any, index: any) => {
        return (
          <Row key={index}>
            <Checkbox checked={selectedColumns.includes(index)}
              onChange={handleSelectColumn.bind(this, index)}
            >{item}</Checkbox>
          </Row>
        )
      })}
    </div>
  );

  //tags list appear by clicking ellipse
  const addTaglist = showTags && showTags.map((item: any, index: any) => {
    let flag = true;
    ruleData.listResult && ruleData.listResult.forEach((rule: any) => {
      if (rule.tag_id === item.id) flag = false;
    })
    if (flag) return (<div key={index} className='add-tag'>
      <Tag color='#3DB5E6' onClick={handleAddTag.bind(this, item)} className='tag-select'>{item.name}</Tag>
    </div>)
    else return null;
  })



  const handlePagination = (current: Number, pageSize: Number) => {
    if (pageSize !== tablePagination.pageSize) current = 1;
    const currentPageState = {
      current: current,
      pageSize: pageSize
    }
    dispatch({
      type: "TABLE_PAGINATION_CHANGE",
      payload: currentPageState
    })
    localStorage.setItem("currentPage", String(current));
    localStorage.setItem("currentPageSize", String(pageSize));
    // setAllChecked(false);
    setAllChecked(false);
  }

  const tagsList = (
    <div className='add-tags'>
      {addTaglist}
    </div>
  );
  return (
    <div className='table-content'>
      <Table
        bordered={false}
        columns={columnsDevices}
        // tableType === 'agents' ? columnsAgents : 
        dataSource={[...dataSource]}
        showHeader={true}
        size={'small'}
        scroll={{ x: 240, y: 'calc(100% - 36px)' }}
        pagination={false}
        rowClassName={(record, i) => (i % 2 === 1 ? 'data-row' : '')}
        rowKey='id'
      />
      <Pagination
        className='table-pagination'
        showSizeChanger
        onChange={handlePagination}
        defaultCurrent={2}
        total={totalNum}
        pageSize={crrPageSize > 0 ? crrPageSize : tablePagination.pageSize}
      />
    </div>
  );
}

export default ContentTable