import { useState, useContext, useEffect } from 'react';
import { Modal, Button, Input, Checkbox, Select, Tag } from 'antd';

import { ModalShowContext, EditTagContext } from '../index';
import { TableDataContext, TagListContext } from '../../../App';
import { close } from '../../../icons';
import { useSelector } from 'react-redux';
import { addNewTag, deviceSelectBuild, editCurrentTag, fetchAllTags, fetchDeviceData } from '../../../utils/request';


function NewTagModal() {
  // context
  const [newTagModalShow, setNewTagModalShow] = useContext(ModalShowContext);
  const [tagList, setTagList] = useContext(TagListContext);
  const [editTagItem, setEditTagItem] = useContext(EditTagContext);
  const setData = useContext(TableDataContext)[1];

  //redux state
  const currentDeviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);

  // state
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = useState(true);
  const [tagName, setTagName] = useState('');
  const [parentTagValue, setParentTagValue] = useState('');
  const [newTagCreated, setNewTagCreated] = useState(false);
  const [modalResultShow, setModalResultShow] = useState('New tag successfully created');
  const [modalTitle, setModalTitle] = useState("New tag");
  const [isBlocked, setIsBlocked] = useState(false);
  const [errTitle, setErrTitle] = useState("This tag is blocked!");
  //const [crrParentName, setParentName] = useState<any>();


  /* eslint-disable */
  //checking for create Tag and edit Tag
  useEffect(() => {
    let crrParentId: Number;
    if (editTagItem.id >= 0) {
      let flag = true;
      tagList.forEach((item: any) => {
        if (item.id === editTagItem.id) {
          crrParentId = item.parent_id;
          if (item.parent_id === null) flag = false;
        }
      });
      tagList.forEach((item: any) => {
        if (item.id === crrParentId) setParentTagValue(item.name);
      })

      setCheckboxDisabled(false);
      setTagName(editTagItem.name);
      setModalResultShow('Tags successfully edited');
      setModalTitle("Edit Tag");
      if (flag) setCheckboxValue(true);
    }
    else {
      setModalResultShow('New tag successfully created');
      setModalTitle("New Tag");
    }
  }, [editTagItem])
  /* eslint-enable */

  const { Option }: any = Select;

  //Modal closed
  const handleCancel = () => {
    initState();
    setNewTagModalShow(false);
  }

  //checkbox for parent Tag
  const onChangeHasParentTagCheckboxValue = (e: any) => {
    const checked = e.target.checked;
    setCheckboxValue(checked);
    if (!checked) {
      setParentTagValue('');
    }
  }

  //selected tag name
  const handleChangeTagName = (e: any) => {
    const value = e.target.value;
    setCheckboxDisabled(value === '');
    setTagName(value);
  }

  //selected parent tag name
  const handleChangeParentTagName = (parentTagName: any) => {
    setParentTagValue(parentTagName[0]);
  }

  //init all state
  const initState = () => {
    setNewTagCreated(false);
    setCheckboxValue(false);
    setTagName('');
    setParentTagValue('');
    setCheckboxDisabled(true);
    setEditTagItem({});
  }

  const handleErrName = () => {
    setErrTitle("Invalid tag name");
    setIsBlocked(true);
    setTimeout(() => { setIsBlocked(false) }, 1500)
  }

  //create new tag or edit tag
  const handleCreateParentTag = async () => {
    let crrTag = tagName;
    let crrParent;
    if (!parentTagValue) crrParent = null;
    else { tagList.forEach((item: any) => { if (parentTagValue === item.name) crrParent = item.id }) }

    const newTag = {
      name: crrTag,
      parent_id: crrParent
    }
    if (editTagItem.id >= 0) {
      /* eslint-disable */
      let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(crrTag) || crrTag.length >= 24) handleErrName();
      /* eslint-enable */
      else await editCurrentTag(editTagItem.node_guid, editTagItem.id, newTag)
        .then(async (res) => {
          setNewTagCreated(true);
          const getAllTags = await fetchAllTags();
          setTagList([...getAllTags]);
          await deviceSelectBuild(currentDeviceSelectId);
          const fetchData = await fetchDeviceData(currentDeviceSelectId, tablePagination.pageSize, tablePagination.current);
          setData(fetchData.data.listResult);
        })
        .catch((err) => {
          setIsBlocked(true);
          setErrTitle("This tag is blocked.")
          setTimeout(() => { setIsBlocked(false) }, 1500)
        })
    }
    else {
      /* eslint-disable */
      let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
      /* eslint-enable */
      if (format.test(crrTag) || crrTag.length >= 24) handleErrName();
      else {
        await addNewTag(newTag).then(async (res) => {
          const getAllTags = await fetchAllTags();
          setTagList([...getAllTags]);
        })
          .catch((err) => {
          })
      }
    }
    handleCancel();
  }

  return (<>
    {newTagCreated ?
      <Modal
        visible={newTagModalShow}
        className='new-tag-created-modal'
        closable={false}
        centered
        title={modalResultShow}
        footer={null}
      />
      :
      <Modal
        visible={newTagModalShow}
        className={`new-tag-modal ${checkboxValue ? 'new-tag-modal-expanded' : ''}`}
        centered
        title={modalTitle}
        onCancel={handleCancel}
        footer={[
          <Button key='back' className='create-tag-button' onClick={handleCreateParentTag} disabled={checkboxDisabled}>{editTagItem.id >= 0 ? 'Save' : 'Create'}</Button>,
        ]}
      >
        <Input className='tag-name-input' value={tagName} onChange={handleChangeTagName} placeholder='Tag name' />
        <div className='parent-tag-container'>
          <Checkbox className='has-parent-tag-checkbox' checked={checkboxValue} onChange={onChangeHasParentTagCheckboxValue} disabled={checkboxDisabled}>Has a parent tag</Checkbox>
          {checkboxValue && parentTagValue === '' && <Select className='parent-tag-select' mode='multiple' style={{ width: '100%', height: 40 }} showArrow={false} value={editTagItem.id > 0 && parentTagValue.length ? parentTagValue : undefined} onChange={handleChangeParentTagName} placeholder='Parent tag'>
            {tagList && tagList.map((item: any, index: number) => {
              return <Option key={index} value={item.name}>{item.name}</Option>
            })}
          </Select>}
          {parentTagValue !== '' && <Tag closable className='parent-tag-item' closeIcon={<img alt='close' src={close} />} onClose={() => { setParentTagValue('') }}>{parentTagValue}</Tag>}
        </div>
      </Modal>}
    <Modal
      visible={isBlocked}
      className='new-tag-created-modal'
      closable={false}
      centered
      title={errTitle}
      footer={null}
    />
  </>
  );
}

export default NewTagModal;
