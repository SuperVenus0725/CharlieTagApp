import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from './ContentHeader';
import ContentTable from './ContentTable';
import { RuleDataContext, TableDataContext, TagListContext } from '../App';
import { filterString } from "../utils/filterstring"
import { fetchDeviceData, deleteDeviceSelectId, deviceSelectBuild, createDeviceSelectId, fetchAutomationData, createNewAutomation, editCurrentAutomation, fetchAllTags } from '../utils/request';
import { ORIGINAL_DEVICE_SELECT_ID } from "../utils/config"
// /import _ from "lodash"

type FilterConditionType = [any, React.Dispatch<React.SetStateAction<any>>];
type TotalNumbertype = [any, React.Dispatch<React.SetStateAction<any>>];
type SelectedModelType = [any[], React.Dispatch<React.SetStateAction<any[]>>];
type SelectedColumnsType = [any[], React.Dispatch<React.SetStateAction<any[]>>];

export const FilterConditionContext = createContext<FilterConditionType>([[], () => { }]);
export const SelectedColumnsContext = createContext<SelectedColumnsType>([[], () => { }]);
export const TotalNumberContext = createContext<TotalNumbertype>([[], () => { }]);
export const SelectedModelContext = createContext<SelectedModelType>([[], () => { }]);

const Content = () => {
  //context
  const setRuleData = useContext(RuleDataContext)[1];
  const [dataSource, setData] = useContext(TableDataContext);
  const setTagList = useContext(TagListContext)[1];
  //state
  const [filterCondition, setFilterCondition] = useState<any[]>([]);
  const [totalNum, setTotalNum] = useState<Number>();
  const [selectedModel, setSelectedModel] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const dispatch = useDispatch();
  //redux state
  const automationState = useSelector((state: any) => state.automationState.automationState);
  const currentDeviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);
  const reloadState = useSelector((state: any) => state.reload.reloadState);
  const filterState = useSelector((state: any) => state.filterState.filterState)
  const tablePagination = useSelector((state: any) => state.tablePagination.tablePaginationState);
  const deviceSelectId = useSelector((state: any) => state.deviceSelectId.deviceId);

  let savedFilterString = localStorage.getItem("crrFilterString");

  /* eslint-disable */
  useEffect(() => {
    const fetchData = async () => {
      const getAllData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current);
      setData(getAllData.data.listResult);
      setTotalNum(getAllData.data.totalCount);
    }
    if (deviceSelectId !== ORIGINAL_DEVICE_SELECT_ID) fetchData();
    if (!savedFilterString) fetchData();
  }, [tablePagination, deviceSelectId]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FILTER_CONDITION_REQUEST",
        payload: {
          filterCondition: filterCondition,
        },
      });
      let crrFilterString: string = await filterString(filterCondition);
      if (currentDeviceSelectId !== ORIGINAL_DEVICE_SELECT_ID)
        await deleteDeviceSelectId(currentDeviceSelectId)
      localStorage.setItem("crrFilterString", crrFilterString);
      setFilterCondition([]);
    }
    if (filterCondition !== undefined && filterCondition.length) fetchData();
    if (filterCondition && filterCondition.length === 0 && filterState) fetchRefreshData();
    // if (!filterState) fetchOriginalData();
  }, [filterCondition])

  useEffect(() => {
    if (currentDeviceSelectId === ORIGINAL_DEVICE_SELECT_ID && !localStorage.getItem("crrFilterString")) fetchOriginalData();
  }, [])

  useEffect(() => {
    //automationState.state === 2
    const fetchData = async () => {
      let crrfilterString = filterString(automationState.filterCondition);
      const filter = {
        id: 0,
        filter: crrfilterString
      }
      if (automationState.auto_id === 0 && automationState.state === 2) { localStorage.setItem("crrFilterString", crrfilterString); setFilterCondition(automationState.filterCondition) }
      const createSelect = await createDeviceSelectId(filter);
      await deviceSelectBuild(createSelect.data.id);
      const newAutomation = {
        id: automationState.auto_id,
        tag_id: automationState.id,
        tag_node_guid: automationState.guid,
        device_select_id: createSelect.data.id,
        frequency_id: automationState.frequency,
        active: "true",
        clear: "true"
      };
      await deviceSelectBuild(createSelect.data.id);
      //  const fetchData = await fetchDeviceData(createSelect.data.id, ORIGINAL_DEVICE_SELECT_ID, 1);
      (newAutomation.id > 0) ? await editCurrentAutomation(newAutomation.id, newAutomation) : await createNewAutomation(newAutomation);
      const getAllAutomationData = await fetchAutomationData();
      const getAllTag = await fetchAllTags();
      setTagList(getAllTag);
      setRuleData(getAllAutomationData.data);
      // if (newAutomation.id === 0) {
      //   const fetchData = await fetchDeviceData(createSelect.data.id, tablePagination.pageSize, tablePagination.current);
      //   dispatch({ type: "CHANGE_SELECT_DEVICE", payload: createSelect.data.id })
      //   setData(fetchData.data.listResult);
      //   setTotalNum(fetchData.data.totalCount);
      // }
      let autoState = {
        auto_id: 0,
        guid: null,
        id: null,
        frequency: null,
        state: 0,
        filterCondition: []
      }
      dispatch({
        type: "AUTOMATIOIN_CREATE",
        payload: autoState
      })
    }
    if (automationState.id !== null) fetchData();
  }, [automationState.id])

  useEffect(() => {
    const reloadData = async () => {
      await deviceSelectBuild(deviceSelectId);
      const fetchData = await fetchDeviceData(deviceSelectId, tablePagination.pageSize, tablePagination.current)
      setData(fetchData.data.listResult);
      setTotalNum(fetchData.data.totalCount);
      dispatch({
        type: "RELOAD_REQUEST",
        payload: false
      })
    }
    if (reloadState) reloadData();
  }, [reloadState])
  /* eslint-enable */

  const fetchOriginalData = async () => {
    await deviceSelectBuild(ORIGINAL_DEVICE_SELECT_ID);
    const fetchData = await fetchDeviceData(ORIGINAL_DEVICE_SELECT_ID, tablePagination.pageSize, tablePagination.current);
    setData(fetchData.data.listResult);
    setTotalNum(fetchData.data.totalCount);
  }

  const filterData = async (filter: any) => {
    const createSelect = await createDeviceSelectId(filter);
    await deviceSelectBuild(createSelect.data.id);
    const fetchData = await fetchDeviceData(createSelect.data.id, tablePagination.pageSize, tablePagination.current)
    dispatch({ type: "CHANGE_SELECT_DEVICE", payload: createSelect.data.id })
    setData(fetchData.data.listResult);
    setTotalNum(fetchData.data.totalCount);
  }
  /* eslint-disable */
  const fetchRefreshData = useCallback(async () => {
    let crrFilterString = localStorage.getItem("crrFilterString");
    const filter = {
      id: 0,
      filter: crrFilterString
    }
    if (filter.filter) filterData(filter);
  }, [filterCondition])
  /* eslint-enable */


  return (
    <FilterConditionContext.Provider value={[filterCondition, setFilterCondition]}>
      <TableDataContext.Provider value={[dataSource, setData]}>
        <TotalNumberContext.Provider value={[totalNum, setTotalNum]}>
          <SelectedModelContext.Provider value={[selectedModel, setSelectedModel]}>
            <SelectedColumnsContext.Provider value={[selectedRowKeys, setSelectedRowKeys]}>
              <ContentHeader />
              <ContentTable />
            </SelectedColumnsContext.Provider>
          </SelectedModelContext.Provider>
        </TotalNumberContext.Provider>
      </TableDataContext.Provider>
    </FilterConditionContext.Provider>
  );
}

export default Content