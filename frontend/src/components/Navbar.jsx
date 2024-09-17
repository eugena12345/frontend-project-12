import Nav from 'react-bootstrap/Nav';
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
       // console.log(newCurrentChannel);

    }

    return (
        <Nav defaultActiveKey="/home" className="flex-column border border-primary g-0">
            {channels.map((channel) => <Nav.Link key={channel.id}
                id={channel.id}
                eventKey="link-1"
                className=" border border-primary g-0"
                onClick={selectChannel}>
                {channel.name}
            </Nav.Link>)}
        </Nav>
    );
}

export default Navbar;