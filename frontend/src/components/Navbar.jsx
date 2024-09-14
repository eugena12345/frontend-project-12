import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from './../slices/channelsSlice.js'; // 
import { selectors as currentChannelSelectors } from './../slices/actualChannelSlice.js';

function Navbar() {
    const channels = useSelector(channelsSelectors.selectAll);
    const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
    console.log('currentChannel', currentChannel);
  
    console.log('channels из навбара', channels);

    return (
        <Nav defaultActiveKey="/home" className="flex-column border border-primary g-0">
            {channels.map((channel) => <Nav.Link key={channel.id} eventKey="link-1" className=" border border-primary g-0">{channel.name}</Nav.Link>)}
        </Nav>
    );
}

export default Navbar;