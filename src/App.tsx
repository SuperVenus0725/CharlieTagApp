import { useState, createContext, useEffect } from 'react';

import './App.scss';

import { Layout } from 'antd';

import MainContent from './pages/content';
import MainHeader from './components/Header';
import { fetchAllTags } from './utils/request';


const { Header, Content } = Layout;

//context type
type TableType = [string, React.Dispatch<React.SetStateAction<string>>];// sample code include set function
type TagListType = [any, React.Dispatch<React.SetStateAction<any>>];
type RuleDataType = [any, React.Dispatch<React.SetStateAction<any>>];
type TableDataType = [any[], React.Dispatch<React.SetStateAction<any[]>>];

//export context
export const RuleDataContext = createContext<RuleDataType>([{}, () => { }]);
export const TableTypeContext = createContext<TableType>(['', () => { }]);
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export const TagListContext = createContext<TagListType>([{}, () => { }]);
export const TableDataContext = createContext<TableDataType>([[], () => { }]);


function App() {
  //state
  const [tableType, setTableType] = useState('devices');
  const [tagList, setTagList] = useState<object[]>([]);
  const [ruleData, setRuleData] = useState<object>({});
  const [dataSource, setData] = useState<object[]>([]);

  //get all tags 
  useEffect(() => {
    const getAllTags = async () => {
      const allTags = await fetchAllTags();
      setTagList(allTags);
    }
    getAllTags();
  }, []);


  const content = (
    <div className='App-scroll'>
      <RuleDataContext.Provider value={[ruleData, setRuleData]}>
        <TagListContext.Provider value={[tagList, setTagList]}>
          <TableTypeContext.Provider value={[tableType, setTableType]}>
            <TableDataContext.Provider value={[dataSource, setData]}>
              <Header className='App-header'>
                <MainHeader />
              </Header>
              <Content className='App-content'>
                <MainContent />
              </Content>
            </TableDataContext.Provider>
          </TableTypeContext.Provider>
        </TagListContext.Provider>
      </RuleDataContext.Provider>
    </div >)

  return (
    <Layout className='App'>
      <Layout className='App-layout'>
        {content}
      </Layout>
    </Layout>
  );
}

export default App;
