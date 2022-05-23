import { useState, useContext, useEffect } from 'react';
import { Modal, Input, Button, Statistic } from 'antd';
import Icon from '@ant-design/icons';

import Tree from '../../Tree';
import { ModalShowContext, EditTagContext, ShowNewTagModalContext } from '../index';
import { TableDataContext, TagListContext } from '../../../App';
import { plus, tree } from '../../../icons';
import { deleteCurrentTag, deviceSelectBuild, fetchDeviceData, getAllSettings } from '../../../utils/request';
import { useSelector } from 'react-redux';


const plusIcon = () => <img src={plus} alt='plus' />;

const { Search } = Input;

function TagsModal() {
  // context
  const [tagsModalShow, setTagsModalShow] = useContext(ModalShowContext);
  const setNewTagModalShow = useContext(ShowNewTagModalContext);
  const setEditTagItem = useContext(EditTagContext)[1];
  const [tagList, setTagList] = useContext(TagListContext);
  const setData = useContext(TableDataContext)[1];
  // state
  const [searchValue, setSearchValue] = useState('');
  const [targetTagItem, setTargetTagItem] = useState<any>({});
  const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);
  const [tagTreeModalShow, setTagTreeModalShow] = useState(false);
  const [title, setTitle] = useState<any>();
  const [showTagList, setShowTagList] = useState<any>([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [tagTreeName, setTagTreeName] = useState('');
  // const [treeData, setTreeData] = useState<any>([]);
  // const [seletedItem, setSelectedItem] = useState();

  const currentDeviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);

  //tagList for showing
  useEffect(() => {
    setShowTagList(tagList);
  }, [tagsModalShow, tagList])



  const initState = () => {
    setSearchValue('');
  }

  //close tag modal
  const handleCloseTagsModal = () => {
    initState();
    setTagsModalShow(false);
  }

  //close tag tree modal
  const handleCloseTagTreeModal = () => {
    setTagTreeModalShow(false);
  }

  //close delete tag modal
  const handleCloseDeleteTagConfirmModal = () => {
    setTargetTagItem({});
    setDeleteConfirmModalShow(false);
  }

  //tree modal show
  const handleClickShowTreeModal = (tagItem: any) => {
    //setTargetTagItem(tagItem);
    setTagTreeModalShow(true);
    setTagTreeName(tagItem.name);
  }

  const handleOnSearch = (searchValue: any) => {

  }

  //change search value
  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.target.value);
    let emptyArray: any = [];
    tagList.forEach((item: any) => {
      if (item.name.includes(e.target.value)) emptyArray.push(item);
    })
    setShowTagList([...emptyArray]);
  }

  //delete the tag
  const handleClickDelete = async (tagItem: any) => {
    await getAllSettings();
    setTargetTagItem(tagItem);
    setTitle(`Are you sure you want to delete "${tagItem.name}" tag?`)
    setDeleteConfirmModalShow(true);
  }

  const handleClickEdit = (tagItem: any) => {
    setEditTagItem(tagItem);
    setNewTagModalShow(true);
  }

  const handleConfirmDeleteTag = async () => {
    handleCloseDeleteTagConfirmModal();

    await deleteCurrentTag(targetTagItem.node_guid, targetTagItem.id)
      .then(async (res) => {
        let crrTaglist = tagList;
        let emptyArray: any = [];
        crrTaglist.forEach((item: any) => {
          if (item.id !== targetTagItem.id) emptyArray.push(item);
        })
        setTagList([...emptyArray]);
        setShowTagList([...emptyArray]);
        await deviceSelectBuild(currentDeviceSelectId);
        const fetchData = await fetchDeviceData(currentDeviceSelectId, tablePagination.pageSize, tablePagination.current);
        setData(fetchData.data.listResult);
      })
      .catch((err) => {
        setIsBlocked(true);
        setTimeout(() => { setIsBlocked(false) }, 1000)
      })

  }

  return (
    <>
      <Modal
        visible={tagsModalShow}
        className='tags-modal'
        centered
        title='Tags'
        onCancel={handleCloseTagsModal}
        footer={null}
      >
        <div className='search-tag-container'>
          <Search placeholder='Search' className={`search-tag-input ${searchValue === '' ? '' : 'search-tag-input-has-value'}`} allowClear value={searchValue} onChange={handleSearchValueChange} onSearch={handleOnSearch} style={{ width: 256 }} />
          <Button className='header-button new-tag-button' icon={<Icon component={plusIcon} />} onClick={setNewTagModalShow.bind(null, true)}>New Tag</Button>
        </div>
        <div className='search-tag-list'>
          {showTagList && showTagList.map((tagItem: any, tagIndex: number) => {
            return (
              <div key={tagIndex} className='tag-item'>
                <div className='tag-item-name'>{tagItem.name}</div>
                <div className='tag-item-operation-buttons'>
                  <div className='tag-item-operation-button tag-item-delete-button' key={tagIndex} onClick={handleClickDelete.bind(null, tagItem)}>delete</div>
                  <div className='tag-item-operation-button tag-item-edit-button' onClick={handleClickEdit.bind(null, tagItem)}>edit</div>
                  <img className='tag-item-operation-button' alt='tree' src={tree} onClick={handleClickShowTreeModal.bind(null, tagItem)} />
                </div>
              </div>
            )
          })}
        </div>
        <div className='search-result-count'>
          <Statistic value={tagList.length} suffix='tags' />
        </div>
      </Modal>
      <Modal
        visible={deleteConfirmModalShow}
        className='delete-tag-confirm-modal'
        centered
        closable={false}
        title={title}
        onCancel={handleCloseDeleteTagConfirmModal}
        footer={[
          <div key='delete-tag-confirm-buttons' className='delete-tag-confirm-buttons' >
            <Button className='delete-tag-confirm-button confirm-delete-button' onClick={handleConfirmDeleteTag}>Yes</Button>
            <Button className='delete-tag-confirm-button cancel-delete-button' onClick={handleCloseDeleteTagConfirmModal}>No</Button>
          </div>
        ]}
      />
      <Modal
        visible={tagTreeModalShow}
        className='tag-tree-modal'
        centered
        title=''
        onCancel={handleCloseTagTreeModal}
        footer={null}
      >
        <Tree
          data={tagList}
          currentTag={tagTreeName}
          option={{
            nodeHeight: 24,
            rowGap: 8,
            depthGap: 50,
            linePadding: 25,
          }}
          nodeStyle={(item: any) => {
            return item === tagTreeName ? { background: '#00A786' } : { background: '#3DB5E6' };
          }}
        />
      </Modal>
      <Modal
        visible={isBlocked}
        className='new-tag-created-modal'
        closable={false}
        centered
        title="This tag is blocked."
        footer={null}
      />
    </>
  );
}

export default TagsModal;
