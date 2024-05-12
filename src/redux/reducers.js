import { combineReducers } from 'redux';
import SideBarToggleSlice from './ToggleSlice/SideBarToggleSlice';
import  loadingSlice  from './LoadingSlice/loadinSlice';
import CurrentTrackSlice from './CurrentTrackSlice/CurrentTrackSlice';
import PlayerToggleSlice from './ToggleSlice/PlayerToggleSlice';
import LoginPopupSlice from './LoginSlice/LoginPopupSlice';
import LoginSlice from './LoginSlice/LoginSlice';

const rootReducer = combineReducers({
    loadingState: loadingSlice,
    player:PlayerToggleSlice,
    sideBarToggle: SideBarToggleSlice,
    currentTrack: CurrentTrackSlice,
    loginpopup:LoginPopupSlice,
    loginState:LoginSlice
});

export default rootReducer;
