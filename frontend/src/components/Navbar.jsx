import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from './../slices/channelsSlice.js'; // 


function Navbar() {
    const channels = useSelector(channelsSelectors.selectAll);

    console.log('channels из навбара', channels);

    return (
        <Nav defaultActiveKey="/home" className="flex-column border border-primary g-0">
            {channels.map((channel) => <Nav.Link key={channel.id} eventKey="link-1" className=" border border-primary g-0">{channel.name}</Nav.Link>)}
        </Nav>
    );
}

export default Navbar;