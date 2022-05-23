import { Row, Col, Button, Divider } from 'antd';
import Icon from '@ant-design/icons';
import { useState, createContext } from 'react';
import { automation, plus, tags } from '../../icons';
import NewTagModal from './Modals/NewTagModal';
import TagsModal from './Modals/TagsModal';
import AutomationModal from './Modals/AutomationModal';
import NewRuleModal from './Modals/NewRuleModal';
//import SwitchSelector from 'react-switch-selector';

//Icons used for this page
const plusIcon = () => <img src={plus} alt='plus' />;
const tagsIcon = () => <img src={tags} alt='tags' />;
const automationIcon = () => <img src={automation} alt='automation' />;

//context type
type ModalShowType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];  // sample code include set function
type ShowNewTagModalType = React.Dispatch<React.SetStateAction<boolean>>;
type ShowNewRuleModalType = React.Dispatch<React.SetStateAction<boolean>>;
type EditTagType = [any, React.Dispatch<React.SetStateAction<any>>];
type EditRuleType = [any, React.Dispatch<React.SetStateAction<any>>];
type PageStateType = [any, React.Dispatch<React.SetStateAction<any>>];

//export context
export const ModalShowContext = createContext<ModalShowType>([false, () => { }]);
export const ShowNewTagModalContext = createContext<ShowNewTagModalType>(() => { });
export const ShowNewRuleModalContext = createContext<ShowNewRuleModalType>(() => { });
export const EditTagContext = createContext<EditTagType>([{}, () => { }]);
export const EditRuleContext = createContext<EditRuleType>([{}, () => { }]);
export const PageStateContext = createContext<PageStateType>([{}, () => { }])

function Header() {
  //state
  const [newTagModalShow, setNewTagModalShow] = useState(false);
  const [tagsModalShow, setTagsModalShow] = useState(false);
  const [newRuleModalShow, setNewRuleModalShow] = useState(false);
  const [automationModalShow, setAutomationModalShow] = useState(false);
  const [editTagItem, setEditTagItem] = useState({});
  const [editRuleItem, setEditRuleItem] = useState({});
  const [crrPage, setCrrPage] = useState<Number>(1);

  // const setTableType = useContext(TableTypeContext)[1];
  // const onChange = (newValue: any) => {
  //   setTableType(newValue);
  // }

  return (
    <>
      <Row align='middle'>
        <Col span={8} className='top-button-group'>
          <Button className='header-button new-tag-button' icon={<Icon component={plusIcon} className='plus-icon' />} onClick={() => { setNewTagModalShow(true) }}>New Tag</Button>
          <Button className='header-button tags-button' icon={<Icon component={tagsIcon} />} onClick={() => { setTagsModalShow(true) }}>Tags</Button>
          <Divider className='header-button-divider' type='vertical' />
          <Button className='header-button automation-button' icon={<Icon component={automationIcon} />} onClick={() => { setAutomationModalShow(true) }}>Automation</Button>
        </Col>
        <Col className='header-switch-selector-col' span={8}>
          <div className='header-switch-selector'>
            {/* <SwitchSelector
              onChange={onChange}
              options={[
                {
                  label: 'Devices',
                  value: 'devices',
                  // selectedBackgroundColor: '#0097e6',
                },
                {
                  label: 'Agents',
                  value: 'agents',
                  // selectedBackgroundColor: '#fbc531'
                }
              ]}
              initialSelectedIndex={0}
              selectedFontColor='#5F6A83'
              border='#E2E2E5'
              // border={5}
              selectedBackgroundColor='#FFFFFF'
              backgroundColor='#EDEDED'
              fontColor='#BDBDBD'
            /> */}
          </div>
        </Col>
        <Col span={8} />
      </Row>
      <ModalShowContext.Provider value={[newTagModalShow, setNewTagModalShow]}>
        <EditTagContext.Provider value={[editTagItem, setEditTagItem]}>
          <NewTagModal />
        </EditTagContext.Provider>
      </ModalShowContext.Provider>
      <ModalShowContext.Provider value={[tagsModalShow, setTagsModalShow]}>
        <ShowNewTagModalContext.Provider value={setNewTagModalShow}>
          <EditTagContext.Provider value={[editTagItem, setEditTagItem]}>
            <TagsModal />
          </EditTagContext.Provider>
        </ShowNewTagModalContext.Provider>
      </ModalShowContext.Provider>

      <PageStateContext.Provider value={[crrPage, setCrrPage]}>
        <ModalShowContext.Provider value={[newRuleModalShow, setNewRuleModalShow]}>
          <EditRuleContext.Provider value={[editRuleItem, setEditRuleItem]}>
            <NewRuleModal />
          </EditRuleContext.Provider>
        </ModalShowContext.Provider>
        <ModalShowContext.Provider value={[automationModalShow, setAutomationModalShow]}>
          <ShowNewRuleModalContext.Provider value={setNewRuleModalShow} >
            <EditRuleContext.Provider value={[editRuleItem, setEditRuleItem]}>
              <AutomationModal />
            </EditRuleContext.Provider>
          </ShowNewRuleModalContext.Provider>
        </ModalShowContext.Provider>
      </PageStateContext.Provider>

    </>
  );
}

export default Header;
