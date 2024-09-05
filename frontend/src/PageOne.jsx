import { useSelector } from "react-redux";
import { selectors as userSelectors } from './slices/auorizeSlice.js';


const PageOne = () => {
    const user = useSelector((state) => {
        console.log('state', JSON.stringify(state.user));
        return userSelectors.selectById(state, 1)
    });
    
    //useSelector((state) => {
        //console.log('userSelectors.selectById(state, 1)', userSelectors.selectById(state, 1));
     //   return userSelectors.selectById(state, 1);
//})

console.log(user);
return ((
    <div>
        Всем привет!!!! Это юзер такой {user};
    </div>
))
}

export default PageOne;