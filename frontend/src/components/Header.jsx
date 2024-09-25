import Nav from 'react-bootstrap/Nav';
import { actions as autorizedActions } from '../slices/auorizeSlice.js';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Header = ({ setUser }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let userToken = localStorage.getItem('token');

    const logout = () => {
        setUser(null);
        dispatch(autorizedActions.logout())
    };

    const goToPageOne = () => {
        navigate('/', { replace: false });
    }
    return (
        <Nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-primary px-4'>
            <h2 className="h-2 text-white" onClick={goToPageOne}>Hexlet chat</h2>
            <div className="p-2 ms-auto">
                {userToken && <Button className='btn btn-outline-light' onClick={logout}>Выйти</Button>}
            </div>
        </Nav>
    )
};

export default Header;
