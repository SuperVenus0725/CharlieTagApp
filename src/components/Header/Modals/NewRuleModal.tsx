import { useContext, useEffect, useState } from 'react';
import { Modal, Divider, Button, Select, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { check } from '../../../icons';
import Search from '../../Search';
import { useDispatch, useSelector } from 'react-redux';
import { RuleDataContext, TagListContext } from '../../../App';
//import { FilterConditionContext } from '../../../pages/content';
import { parseFilterString } from "../../../utils/filterstring";
import { getAllSettings, getCurrentAutomation, getDeviceSelectInfo } from '../../../utils/request';
import { deviceFilter } from '../../../utils/config';

const { Option }: any = Select;

function NewRuleModal() {

  const dispatch = useDispatch();

  //context
  const tagList = useContext(TagListContext)[0];
  const ruleData = useContext(RuleDataContext)[0];
  //state
  const [frequency, setFrequency] = useState<Number>(4);
  const [crrTag, setCrrTag] = useState<any>();
  const [crrFilterCondition, setCrrFilterCondition] = useState<any>([]);
  const [editAutomationId, setEditAutomationId] = useState();
  const [editFilterCondition, setEditFilter] = useState<any>([]);
  const [automationTagId, setAutomationTagId] = useState<any>();
  const [ruleModalTitle, setTitle] = useState("New Rule");
  const [crrFrequency, setCrrFrequency] = useState<any>([]);
  const [beforeSelect, setBeforeSelect] = useState<any>({});
  const [showFilterModal, setShowFilterModal] = useState(false);

  //redux state
  const filterCondition = useSelector((state: any) => state.filterCondition.filterCondition);
  const isOpen = useSelector((state: any) => state.newModal.newRuleModal);
  const editId = useSelector((state: any) => state.newModal.id);
  const editState = useSelector((state: any) => state.newModal.editModal);
  const activeState = useSelector((state: any) => state.loadActiveState.loadState);

  //get settings
  useEffect(() => {
    const getSettings = async () => {
      const settings = await getAllSettings();
      setCrrFrequency(Object.values(settings.data.BI.Children.TagAutomation.Children.Frequencies.Children));
    }
    getSettings();
  }, [])

  //load active filter condition
  useEffect(() => {
    if (activeState) {
      let crrFilterString = localStorage.getItem("crrFilterString");
      if (crrFilterString) {
        let crrFilterCondition = parseFilterString(crrFilterString);
        setCrrFilterCondition(crrFilterCondition);
      }
    }
  }, [activeState, filterCondition])

  //Set the name of this modal
  useEffect(() => {
    if (editState) setTitle("Edit Rule");
    else setTitle("New Rule");
  }, [editState])

  //Automation edit
  useEffect(() => {
    const editAutomation = async () => {
      const crrAutomation = await getCurrentAutomation(editId);
      const crrDeviceSelect = await getDeviceSelectInfo(crrAutomation.data.device_select_id);
      let parsedFilterCondition = await parseFilterString(crrDeviceSelect.data.filter);
      setEditFilter(parsedFilterCondition);
      setCrrFilterCondition(parsedFilterCondition);
      setAutomationTagId(crrAutomation.data.tag_id);
      tagList.forEach((item: any) => {
        if (crrAutomation.data.tag_id === item.id) { setBeforeSelect(item); setCrrTag(item); }
      })
      setEditAutomationId(crrAutomation.data.id);
    }
    if (editState) editAutomation();
    else { setCrrTag({}); setBeforeSelect({}) }
  }, [editState, editId, tagList])



  const handleCancel = () => {
    //open this modal
    dispatch({
      type: "OPEN_NEW_RULE",
      payload: {
        newRuleModal: false,
        editModal: false,
        id: null
      }
    });
  }

  const handleEndState = (crrState: number) => {
    dispatch({
      type: "LOAD_FILTER_ACTIVE",
      payload: false
    });
    dispatch({
      type: "OPEN_NEW_RULE",
      payload: {
        newRuleModal: false,
        editModal: false,
        id: null
      }
    });
    let auto_id = editState ? editAutomationId : 0
    let automationState = {
      auto_id: auto_id,
      guid: crrTag.node_guid,
      id: crrTag.id,
      frequency: frequency,
      state: crrState,
      filterCondition: crrFilterCondition
    }
    dispatch({
      type: "AUTOMATIOIN_CREATE",
      payload: automationState
    })
    dispatch({
      type: "CLEAR_FILTER_REQUEST",
      payload: true
    })
    localStorage.setItem("currentSelected", '[]');
    localStorage.setItem("currentModel", '[]');
    handleCloseFilterShowConfirmModal();
  }

  const handleChangeSearchValue = (searchCondition: any) => {
    setCrrFilterCondition(searchCondition);
  }

  const handleFilterActive = () => {
    dispatch({
      type: "LOAD_FILTER_ACTIVE",
      payload: true
    })
  }

  const handleFrequency = (value: Number) => {
    setFrequency(value);
  }

  const handleTag = (value: any) => {
    tagList.forEach((item: any) => {
      if (item.name === value) {
        setCrrTag(item);
      }
    })
  }

  const handleShowFilter = () => {
    setShowFilterModal(true);
  }

  const handleCloseFilterShowConfirmModal = () => {
    setShowFilterModal(false);
  }

  const selectTagList = tagList && tagList.map((item: any, index: any) => {
    let flag = true;
    ruleData.listResult && ruleData.listResult.forEach((rule: any) => {
      if (rule.tag_id === item.id) flag = false;
    })
    if (beforeSelect.id && beforeSelect.id === item.id) flag = true;
    if (flag) return (<Option key={item.name}>{item.name}</Option>)
    else return null;
  })


  return (
    <>
      <Modal
        visible={isOpen}
        className='new-rule-modal'
        centered
        title={ruleModalTitle}
        onCancel={handleCancel}
        footer={[
          <Button key='save-and-run' disabled={crrTag === undefined || Object.keys(crrTag).length === 0 ? true : false} className='new-rule-save-button new-rule-save-and-run-button' onClick={handleShowFilter}>Save and run</Button>
        ]}
      >
        {/* <div className='new-rule-input-panel new-rule-name-panel'>
        <div className='panel-title'>Name</div>
        <div className='panel-content'><Input placeholder='Enter rule name' onChange={handleChangeRuleName} value={editRuleItem.name} /></div>
      </div> */}
        {/* <Divider /> */}
        <div className='new-rule-input-panel'>
          <div className='panel-title'>
            <div>Rules</div>
            <div className='panel-title-comment'>Search for devices that meet the following conditions</div>
          </div>
          <div className='panel-content'>
            <Search
              data={deviceFilter}
              activeFilter={activeState ? filterCondition : []}
              editFilter={editState ? editFilterCondition : []}
              automationTagId={automationTagId}
              onChange={handleChangeSearchValue}
            />
          </div>
        </div>
        <div className='new-rule-input-panel'>
          <div className='panel-content load-active-filters'><Button onClick={handleFilterActive} icon={<PlusOutlined style={{ fontSize: 10 }} />}>Load active filters</Button></div>
        </div>
        <Divider />
        <div className='new-rule-input-panel'>
          <div className='panel-title'>
            <div>Actions</div>
            <div className='panel-title-comment'>Add tag to found devices</div>
          </div>
          <div className='panel-content'>
            <Select showSearch={true} placeholder='Search tag' onChange={handleTag} value={crrTag && crrTag.name} className="tag-auto-select">
              {selectTagList}
            </Select>
          </div>
        </div>
        <Divider />
        <div className='new-rule-input-panel update-rule'>
          <div className='panel-content'>
            <div className='update-rule-checkbox'><Checkbox>Update the list of related devices</Checkbox></div>
            <div className='update-rule-repeat'>
              Repeat
              {/* <InputNumber className='rule-period-input' disabled min={1} defaultValue={1} controls={false} /> */}
              <Select
                className='rule-period-select'
                defaultValue={4}
                menuItemSelectedIcon={<img src={check} alt='check' />}
                onChange={handleFrequency}
              >
                {crrFrequency && crrFrequency.map((item: any, index: any) => {
                  if (item.Id === 10) return null;
                  else return <Option key={index} value={item.Id}>{item.Code}</Option>
                })}
              </Select>
              {/* at
            <TimePicker className='rule-time-picker' defaultValue={moment('09:00', 'HH:mm')} format='hh:mm' clearIcon={null} /> */}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        visible={showFilterModal}
        className='delete-tag-confirm-modal'
        centered
        closable={false}
        title="Do you want to filter the data?"
        onCancel={handleCloseFilterShowConfirmModal}
        footer={[
          <div key='delete-tag-confirm-buttons' className='delete-tag-confirm-buttons' >
            <Button className='delete-tag-confirm-button confirm-delete-button' onClick={handleEndState.bind(null, 2)}>Yes</Button>
            <Button className='delete-tag-confirm-button cancel-delete-button' onClick={handleEndState.bind(null, 1)}>No</Button>
          </div>
        ]}
      />
    </>
  );
}

export default NewRuleModal;