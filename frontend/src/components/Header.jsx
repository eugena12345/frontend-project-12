import Nav from 'react-bootstrap/Nav';


const Header = () => {
    return (
        <Nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-info gx-5 px-4'>
            <h2 className="h-2 text-white">Hexlet chat</h2>
            <div className="p-2 ms-auto"> тут будет кнопка "выйти"</div>
        </Nav>
    )
};

export default Header;
