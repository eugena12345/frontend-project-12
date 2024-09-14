import Nav from 'react-bootstrap/Nav';
import { actions as autorizedActions } from '../slices/auorizeSlice.js';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';



const Header = ({ setUser }) => {
    const dispatch = useDispatch();
    let userToken = localStorage.getItem('token');

    const logout = () => {
        setUser(null);
        dispatch(autorizedActions.logout())
    };
    return (
        <Nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-primary px-4'>
            <h2 className="h-2 text-white">Hexlet chat</h2>
            <div className="p-2 ms-auto">
                {userToken && <Button className='btn btn-outline-light' onClick={logout}>Выйти</Button>}
            </div>
        </Nav>
    )
};

export default Header;
