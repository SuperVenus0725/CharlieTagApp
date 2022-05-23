import { useState, useContext, useEffect } from 'react';
import { Modal, Select, Button, Divider, Tag } from 'antd'
import { ModalShowContext, ModalRemoveShowContext } from '../index';
import { close, plusicon } from '../../../icons/index';
import { useDispatch, useSelector } from 'react-redux';
import { RuleDataContext, TagListContext } from '../../../App';
import { TableDataContext } from '../../../App';
import { createNewFilterCondition, filterString, parseFilterString } from '../../../utils/filterstring';
import { addNewTag, assignNewTag, createDeviceSelectId, fetchDeviceData, deviceSelectBuild, getDeviceSelectInfo, clearCurrentTag } from '../../../utils/request';
import { ORIGINAL_DEVICE_SELECT_ID } from "../../../utils/config"


const AddTagModal = () => {
  //context
  const [addTagState, setAddTagState] = useContext(ModalShowContext);
  const [removeTagState, setRemoveTagState] = useContext(ModalRemoveShowContext);
  const [tagList, setTagList] = useContext(TagListContext);
  const setData = useContext(TableDataContext)[1];
  const ruleData = useContext(RuleDataContext)[0];

  //state
  const [currentTag, setCurrentTag] = useState('');
  const [currentDeleteTag, setCurrentDeleteTag] = useState('');
  const [showSelect, setShowSelect] = useState(true);
  const [showRemoveSelect, setRemoveShowSelect] = useState(true);
  const [guid, setGuid] = useState<string>('');
  const [id, setId] = useState<any>();
  const [buttonName, setButtonName] = useState<string[]>(['Add tag to all', 'Remove tag from all']);
  const [existTag, setExistTag] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isBlocked, setIsBlocked] = useState(false);

  //redux state
  const deviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);

  const { Option }: any = Select;

  let crrSelected = localStorage.getItem("currentSelected");

  useEffect(() => {
    if (!crrSelected || JSON.parse(crrSelected).length === 0) { setButtonName(['Add tag to all', 'Remove tag from all']); }
    else { setButtonName(['Add tag', 'Remove tag']); }
  }, [crrSelected])

  const createTag = async (name: String) => {
    const newTag = {
      name: name,
      parent_id: null
    }
    const createTag = await addNewTag(newTag);
    setGuid(createTag.data.node_guid);
    setId(createTag.data.id);
    let crrTagList = tagList;
    crrTagList.push(createTag.data);
    setTagList([...crrTagList]);
  }

  //select the tag for adding
  const handleOption = (item: any) => {
    /* eslint-disable */
    let flag = false;
    tagList.forEach((tag: any) => {
      {
        if (tag.name === item[0]) {
          flag = true;
          setGuid(tag.node_guid);
          setId(tag.id);
        }
      }
    })
    if (!flag) createTag(item[0])
    setShowSelect(false);
    setCurrentTag(item);

    /* eslint-enable */
  }

  //add Tag
  const handleAddTag = () => {
    let crrSelectedItem = currentTag[0];
    console.log(crrSelectedItem);
    /* eslint-disable */
    let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    /* eslint-enable */
    if (format.test(crrSelectedItem) || crrSelectedItem.length >= 24) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
      }, 1500)
    }
    else {
      dispatch({
        type: "ADD_TAG_REQUEST",
        payload: false
      })
      let crrSelected: (string | null) = localStorage.getItem("currentModel");
      let crrDeiceSelect: any = [];
      if (crrSelected) crrDeiceSelect = JSON.parse(crrSelected);
      const assignTag = async () => {
        await deviceSelectBuild(deviceSelectId);
        await assignNewTag(deviceSelectId, guid, id).then(async (res) => {
          const getAllData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
          setData(getAllData.data.listResult);
        })
          .catch((err) => alert("Server Error"))
      }
      const assignTagCertainColumn = async () => {
        let filter;
        let filterCondition;
        if (deviceSelectId !== ORIGINAL_DEVICE_SELECT_ID) {
          const currentDevice = await getDeviceSelectInfo(deviceSelectId);
          filterCondition = await (parseFilterString(currentDevice.data.filter))
        }
        else filterCondition = [];
        let newFilterCondition = await createNewFilterCondition(filterCondition, crrDeiceSelect);
        let filterConditionString: any = await filterString(newFilterCondition);
        filter = {
          id: 0,
          filter: filterConditionString
        }
        const createSelect = await createDeviceSelectId(filter);
        await deviceSelectBuild(createSelect.data.id);


        await assignNewTag(createSelect.data.id, guid, id).then(async (res) => {
          const getAllData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
          setData(getAllData.data.listResult);
        })
      }
      if (crrDeiceSelect.length === 0) assignTag();
      if (crrDeiceSelect.length > 0) assignTagCertainColumn();
      if (!showSelect) setAddTagState(false);
      setShowSelect(true);
    }
  }

  const deleteTag = () => {
    setShowSelect(true);
  }

  const deleteRemoveTag = () => {
    setRemoveShowSelect(true);
  }

  const handleRemoveOption = (item: any) => {
    /* eslint-disable */
    tagList.forEach((tag: any) => {
      {
        if (tag.name === item[0]) {
          setGuid(tag.node_guid);
          setId(tag.id);
        }
      }
    })
    setRemoveShowSelect(false);
    setCurrentDeleteTag(item[0]);
    /* eslint-enable */
  }

  const handleRemoveTag = () => {
    dispatch({
      type: "DELETE_TAG_REQUEST",
      payload: false
    })
    let crrSelected: (string | null) = localStorage.getItem("currentModel");
    let crrDeiceSelect: any = [];
    if (crrSelected) crrDeiceSelect = JSON.parse(crrSelected);
    const clearTag = async () => {
      await deviceSelectBuild(deviceSelectId);


      await clearCurrentTag(deviceSelectId, guid, id).then(async (res) => {
        const getAllData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
        setData(getAllData.data.listResult);
      })

    }
    const clearTagCertainColumn = async () => {
      let filter;
      let filterCondition;
      if (deviceSelectId !== ORIGINAL_DEVICE_SELECT_ID) {
        const currentDevice = await getDeviceSelectInfo(deviceSelectId);
        filterCondition = await (parseFilterString(currentDevice.data.filter))
      }
      else filterCondition = [];
      let newFilterCondition = await createNewFilterCondition(filterCondition, crrDeiceSelect);
      let filterConditionString: any = await filterString(newFilterCondition);
      filter = {
        id: 0,
        filter: filterConditionString
      }
      const createSelect = await createDeviceSelectId(filter);
      await deviceSelectBuild(createSelect.data.id);


      await clearCurrentTag(createSelect.data.id, guid, id).then(async (res) => {
        const getAllData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
        setData(getAllData.data.listResult);
      })

    }
    if (crrDeiceSelect.length === 0) clearTag();
    if (crrDeiceSelect.length > 0) clearTagCertainColumn();
    if (!showRemoveSelect) setRemoveTagState(false);
    setRemoveShowSelect(true);
  }

  const handleSearch = (value: any) => {
    let flag = false;
    tagList.forEach((item: any) => {
      if (item.name === value) flag = true;
    })
    setExistTag(flag);
  }

  const handleNewRule = () => {
    dispatch({
      type: "OPEN_NEW_RULE",
      payload: true
    });
    dispatch({
      type: "DATA_REQUESTED"
    })
  }
  const selectTagList = tagList && tagList.map((item: any) => {
    let flag = true;
    ruleData.listResult && ruleData.listResult.forEach((rule: any) => {
      if (rule.tag_id === item.id) flag = false;
    })
    if (flag) return <Option key={item.name}  >{item.name}</Option>
    else return null;
  })

  const addTag = (
    <div>
      {showSelect &&
        <Select
          mode='tags'
          showArrow={false}
          placeholder='Search tag'
          onChange={handleOption}
          onSearch={handleSearch}
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              {!existTag && <div className='create-tag'>
                <img src={plusicon} alt='plus' />
                Create tag
              </div>}
            </div>
          )}
        >
          {selectTagList}
        </Select>}
      {!showSelect && <div className='addedTag' ><Tag className='close-tag' closable closeIcon={<img src={close} onClick={deleteTag} alt='close' />}>{currentTag}</Tag></div>}
      <Button className={showSelect ? 'add-disable-tag' : 'add-enable-tag'} onClick={handleAddTag}>Add</Button>
      <div className='auto' onClick={handleNewRule}>
        <p className='create-auto'>Create automation rule</p>
      </div>
    </div >)

  const removeTag = (
    <div>
      {showRemoveSelect &&
        <Select
          mode='multiple'
          showArrow={false}
          placeholder='Search tag'
          onChange={handleRemoveOption}
          dropdownRender={menu => (
            <div>
              {menu}
            </div>
          )}
        >
          {selectTagList}
        </Select>}
      {!showRemoveSelect && <div className='addedTag' ><Tag className='close-tag' closable closeIcon={<img src={close} onClick={deleteRemoveTag} alt='close' />}>{currentDeleteTag}</Tag></div>}
      <Button className={showRemoveSelect ? 'remove-disable-tag' : 'remove-enable-tag'} onClick={handleRemoveTag}>Remove tag</Button>
    </div>)

  return (
    <>
      <Modal
        title={addTagState ? buttonName[0] : buttonName[1]}
        centered
        visible={addTagState || removeTagState}
        className='add-remove-modal'
        footer={null}
        onCancel={() => {
          if (addTagState) setAddTagState(false);
          if (removeTagState) setRemoveTagState(false);
          dispatch({
            type: "ADD_TAG_REQUEST",
            payload: false
          })
        }}
        width={452}
      >
        {addTagState && addTag}
        {removeTagState && removeTag}
      </Modal >
      <Modal
        visible={isBlocked}
        className='new-tag-created-modal'
        closable={false}
        centered
        title="Invalid tag name"
        footer={null}
      />
    </>
  )
}
export default AddTagModal