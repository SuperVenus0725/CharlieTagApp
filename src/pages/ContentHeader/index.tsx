import { useState, useContext, createContext, useEffect } from 'react';
import { Button, Statistic } from 'antd';
import Icon from '@ant-design/icons';

import { SelectedColumnsContext, TotalNumberContext } from '../content';
import { filter, refresh } from '../../icons/index';
import AddRemoveTagModal from "./Modal/AddRemoveTagModal"
import FilterTagModal from "./Modal/FilterTagModal"
import { useDispatch } from 'react-redux';
import { fetchAllTags } from '../../utils/request';
import { TagListContext } from '../../App';


type ModalShowType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const ModalShowContext = createContext<ModalShowType>([false, () => { }]);
export const ModalRemoveShowContext = createContext<ModalShowType>([false, () => { }]);
export const ModalFilterShowContext = createContext<ModalShowType>([false, () => { }]);

const ContentHeader = () => {
  const dispatch = useDispatch();
  //context
  const totalNum = useContext(TotalNumberContext)[0];
  const selectedRowKeys = useContext(SelectedColumnsContext)[0];
  const setTagList = useContext(TagListContext)[1];
  //state
  const [addTagState, setAddTagState] = useState(false);
  const [removeTagState, setRemoveTagState] = useState(false);
  const [filterTagState, setFilterTagState] = useState(false);
  const [buttonName, setButtonName] = useState<string[]>(['Add tag to all', 'Remove tag from all']);

  useEffect(() => {
    //let selectedRowKeys = localStorage.getItem("currentSelected");
    if (!selectedRowKeys || selectedRowKeys.length === 0) { let buttonGroup = ['Add tag to all', 'Remove tag from all']; setButtonName([...buttonGroup]); }
    if (selectedRowKeys && selectedRowKeys.length > 0) { let buttonGroup = ['Add tag', 'Remove tag']; setButtonName([...buttonGroup]); }
  }, [selectedRowKeys])

  const filters = () => <img src={filter} alt='filter' />;
  const reload = () => <img src={refresh} alt='refresh' />;

  const handleAddTagState = () => {
    dispatch({
      type: "ADD_TAG_REQUEST",
      payload: true
    })
    setAddTagState(true);
  }

  const handleRemoveTagState = () => {
    dispatch({
      type: "DELETE_TAG_REQUEST",
      payload: true
    })
    setRemoveTagState(true);
  }

  const handleFilterTag = () => {
    setFilterTagState(true);
  }

  const reloadData = async () => {
    const allTags = await fetchAllTags();
    setTagList(allTags);
    dispatch({
      type: "RELOAD_REQUEST",
      payload: true
    })
  }

  return (
    <div className='table-header'>
      <div className='first-group'>
        <Button onClick={handleFilterTag} icon={<Icon component={filters} />} className='filters'>Filters</Button>
        <Button icon={<Icon component={reload} />} onClick={reloadData} className='reload' />
      </div>
      <div className='result'>
        <Statistic value={totalNum} suffix='results' className='statistic' />
      </div>
      <div className='second-group'>
        <Button className='add' onClick={handleAddTagState}>{buttonName[0]}</Button>
        <Button className='remove' onClick={handleRemoveTagState}>{buttonName[1]}</Button>
      </div>
      <ModalShowContext.Provider value={[addTagState, setAddTagState]}>
        <ModalRemoveShowContext.Provider value={[removeTagState, setRemoveTagState]}>
          <AddRemoveTagModal />
        </ModalRemoveShowContext.Provider>
      </ModalShowContext.Provider>
      <ModalFilterShowContext.Provider value={[filterTagState, setFilterTagState]}>
        <FilterTagModal />
      </ModalFilterShowContext.Provider>
    </div>)
}

export default ContentHeader