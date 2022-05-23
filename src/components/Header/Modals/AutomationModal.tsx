import { useContext, useState, useEffect } from 'react';
import { Modal, Input, Button, Tabs, Statistic } from 'antd';
import Icon from '@ant-design/icons';

import { ModalShowContext } from '../index';
import { plus, run, stop } from '../../../icons';
import { useDispatch } from 'react-redux';
import { RuleDataContext, TagListContext } from '../../../App';
import { deleteCurrentAutomation, getAllSettings, editCurrentAutomation, fetchAutomationData } from '../../../utils/request';

const plusIcon = () => <img src={plus} alt='plus' />;

const { Search } = Input;
const { TabPane } = Tabs;

function AutomationModal() {

  const dispatch = useDispatch();

  //context
  const [automationModalShow, setAutomationModalShow] = useContext(ModalShowContext);
  const [ruleData, setRuleData] = useContext(RuleDataContext);
  const tagList = useContext(TagListContext)[0];

  // state
  const [searchValue, setSearchValue] = useState('');
  const [targetRuleItem, setTargetRuleItem] = useState<any>({});
  const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);
  const [title, setTitle] = useState<any>();
  const [crrFrequency, setCrrFrequency] = useState<object[]>([]);

  useEffect(() => {
    const fetchRuleData = async () => {
      const fetchData = await fetchAutomationData();
      setRuleData(fetchData.data);
    }
    fetchRuleData();
  }, [setRuleData])

  useEffect(() => {
    const getSettings = async () => {
      const settings = await getAllSettings();
      setCrrFrequency(Object.values(settings.data.BI.Children.TagAutomation.Children.Frequencies.Children));
    }
    getSettings();
  }, [])


  const setNewRuleModalShow = () => {
    dispatch({
      type: "OPEN_NEW_RULE",
      payload: {
        newRuleModal: true,
        editModal: false,
        id: null
      }
    })
  }

  const initState = () => {

  }

  const handleCloseAutomationModal = () => {
    initState();
    setAutomationModalShow(false);
  }

  const handleOnSearch = (searchValue: any) => {
    setSearchValue(searchValue);
  }

  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
  }

  const handleTabChange = (tabKey: any) => {

  }

  const handleClickDelete = (tagItem: any) => {
    setTargetRuleItem(tagItem);
    setDeleteConfirmModalShow(true);
    let crrTagName: string = "";
    tagList.forEach((item: any) => { if (item.id === tagItem.tag_id) crrTagName = item.name });
    crrTagName += "-";
    crrFrequency.forEach((item: any) => { if (item.Id === tagItem.frequency_id) crrTagName += item.Code; })
    setTitle(`Are you sure to delete "${crrTagName}" rule?`);
  }

  const handleClickEdit = (tagItem: any) => {
    dispatch({
      type: "OPEN_NEW_RULE",
      payload: {
        newRuleModal: true,
        editModal: true,
        id: tagItem.id
      }
    })
  }

  const handleCloseDeleteRuleConfirmModal = () => {
    //setTargetRuleItem({});
    setDeleteConfirmModalShow(false);
  }

  const handleConfirmDeleteRule = () => {
    const deleteAutomation = async () => {
      await deleteCurrentAutomation(targetRuleItem.id);
      const fetchData = await fetchAutomationData();
      setRuleData(fetchData.data);
    }

    deleteAutomation();
    handleCloseDeleteTagConfirmModal();
  }

  const handleCloseDeleteTagConfirmModal = () => {
    //setTargetRuleItem({});
    setDeleteConfirmModalShow(false);
  }

  const handleEditRun = (ruleItem: any) => {
    const editState = async () => {
      const editRule = {
        id: ruleItem.id,
        tag_id: ruleItem.tag_id,
        tag_node_guid: ruleItem.tag_node_guid,
        frequency_id: ruleItem.frequency_id,
        device_select_id: ruleItem.device_select_id,
        active: !ruleItem.active,
        clear: ruleItem.clear
      }
      await editCurrentAutomation(ruleItem.id, editRule)
        .then(async (res) => {
          const fetchData = await fetchAutomationData();
          setRuleData(fetchData.data);
        })

    }
    editState();
  }

  //show active rules
  const renderActiveRules = () => {
    return (
      <div className='rule-list'>
        {ruleData.listResult && ruleData.listResult.map((ruleItem: any, ruleIndex: any) => {
          if (ruleItem.active === true) {
            let name: String = "";
            tagList.forEach((item: any) => {
              if (item.id === ruleItem.tag_id) name += item.name;
            })
            name += "-";
            crrFrequency.forEach((item: any) => {
              if (item.Id === ruleItem.frequency_id) name += item.Code;
            })
            if (searchValue === '' || name.includes(searchValue))
              return (
                <div key={ruleIndex} className='rule-item'>
                  <div className='rule-item-name'>{name}</div>
                  <div className='rule-item-operation-buttons'>
                    <div className='rule-item-operation-button rule-item-delete-button' onClick={handleClickDelete.bind(null, ruleItem)}>delete</div>
                    <div className='rule-item-operation-button rule-item-edit-button' onClick={handleClickEdit.bind(null, ruleItem)}>edit</div>
                    <img className='rule-item-operation-button' alt='tree' onClick={handleEditRun.bind(null, ruleItem)} src={ruleItem.active === true ? stop : run} />
                  </div>
                </div>
              )
            else return null;
          }
          else return null;
        })}
      </div>
    )
  }

  //show all rules
  const renderRules = () => {
    return (
      <div className='rule-list'>
        {ruleData.listResult && ruleData.listResult.map((ruleItem: any, ruleIndex: any) => {
          let name: String = "";
          tagList.forEach((item: any) => {
            if (item.id === ruleItem.tag_id) name += item.name;
          })
          name += "-";
          crrFrequency.forEach((item: any) => {
            if (item.Id === ruleItem.frequency_id) name += item.Code;
          })
          if (searchValue === '' || name.includes(searchValue))
            return (
              <div key={ruleIndex} className='rule-item'>
                <div className='rule-item-name'>{name}</div>
                <div className='rule-item-operation-buttons'>
                  <div className='rule-item-operation-button rule-item-delete-button' onClick={handleClickDelete.bind(null, ruleItem)}>delete</div>
                  <div className='rule-item-operation-button rule-item-edit-button' onClick={handleClickEdit.bind(null, ruleItem)}>edit</div>
                  <img className='rule-item-operation-button' onClick={handleEditRun.bind(null, ruleItem)} alt='tree' src={ruleItem.active === true ? stop : run} />
                </div>
              </div>
            )
          else return null;
        })}
      </div>
    )
  }

  return (
    <>
      <Modal
        key='automation-modal'
        visible={automationModalShow}
        className='automation-modal'
        centered
        title='Automation'
        onCancel={handleCloseAutomationModal}
        footer={null}
      >
        <div className='search-rule-container'>
          <Search placeholder='Search' className={`search-rule-input ${searchValue === '' ? '' : 'search-rule-input-has-value'}`} allowClear onChange={handleSearchValueChange} onSearch={handleOnSearch} style={{ width: 256 }} />
          <Button className='header-button new-rule-button' icon={<Icon component={plusIcon} />} onClick={setNewRuleModalShow}>New rule</Button>
        </div>
        <Tabs
          className='rule-list-tab'
          onChange={handleTabChange}
          type='card'
          hideAdd={true}
        >
          <TabPane tab='Running' key={1}>{renderActiveRules()}</TabPane>
          <TabPane tab='All' key={2}>{renderRules()}</TabPane>
        </Tabs>
        <div className='search-result-count'>
          <Statistic value={ruleData.totalCount} suffix='rules' />
        </div>
      </Modal>
      <Modal
        key='delete-rule-confirm-modal'
        visible={deleteConfirmModalShow}
        className='delete-rule-confirm-modal'
        centered
        closable={false}
        title={title}
        onCancel={handleCloseDeleteRuleConfirmModal}
        footer={[
          <div key='delete-rule-confirm-buttons' className='delete-rule-confirm-buttons'>
            <Button className='delete-rule-confirm-button confirm-delete-button' onClick={handleConfirmDeleteRule}>Yes</Button>
            <Button className='delete-rule-confirm-button cancel-delete-button' onClick={handleCloseDeleteRuleConfirmModal}>No</Button>
          </div>
        ]}
      />
    </>
  );
}

export default AutomationModal;