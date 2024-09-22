import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from './../slices/channelsSlice.js'; // 
import { selectors as currentChannelSelectors } from './../slices/actualChannelSlice.js';
import { useDispatch } from 'react-redux';
import { actions as currentChannelActions } from '../slices/actualChannelSlice.js';


function Navbar() {
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);
    const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
    console.log('currentChannel', currentChannel);

    console.log('channels из навбара', channels);
    const selectChannel = (e) => {
        e.preventDefault();
        const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(newCurrentChannel))
    }

    const someAction = () => {
        console.log(`clicked!!!!`)
    }

    return (
        <Nav defaultActiveKey="/home" className="flex-column g-0">
            <div className="mb-4 p-3 d-flex justify-content-between align-items-center">
                <p className="m-2">Каналы</p>
                <div onClick={someAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </div>
            </div>
            {channels.map((channel) => {
                const activeClass = 'w-100 rounded-0 text-start text-truncate btn btn-secondary'
                // = channel.id === currentChannel.id ?
                //     'g-0 btn btn-primary text-white' : 'border border-primary g-0';
                return (<Nav.Link key={channel.id}
                    id={channel.id}
                    eventKey="link-1"
                    className={activeClass}
                    onClick={selectChannel}>
                    {channel.name}
                </Nav.Link>)
            })}

            <div>
                {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
                    (variant) => (
                        <Dropdown as={ButtonGroup} className='d-flex mb-1'>
                        <Button variant="btn btn-outline-primary text-start"># {variant}</Button>
                        <Dropdown.Toggle split variant="btn btn-outline-primary" id="dropdown-custom-2" />
                        <Dropdown.Menu className="super-colors">
                          <Dropdown.Item eventKey="1">Переименовать</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Удалить</Dropdown.Item>
                         </Dropdown.Menu>
                      </Dropdown>

                        // <SplitButton
                        //     className='d-flex justify-content-between'
                        //     key={variant}
                        //     id={variant}
                        //     variant='w-100 rounded-0 text-start text-truncate btn '
                        //     //btn-secondary
                        //     // outline d-flex justify-content-end
                        //     title={variant}
                        // >
                        //     <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
                        //     <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
                        // </SplitButton>
                    ),
                )}
            </div>





        </Nav>
    );
}

export default Navbar;