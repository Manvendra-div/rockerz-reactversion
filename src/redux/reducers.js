import { combineReducers } from 'redux';
import SideBarToggleSlice from './ToggleSlice/SideBarToggleSlice';
import  loadingSlice  from './LoadingSlice/loadinSlice';
import CurrentTrackSlice from './CurrentTrackSlice/CurrentTrackSlice';
import PlayerToggleSlice from './ToggleSlice/PlayerToggleSlice';
import LoginSlice from './LoginSlice/LoginSlice';
import DialogToggleSlice from './ToggleSlice/DialogToggleSlice';

const rootReducer = combineReducers({
    loadingState: loadingSlice,
    player:PlayerToggleSlice,
    sideBarToggle: SideBarToggleSlice,
    currentTrack: CurrentTrackSlice,
    loginState:LoginSlice,
    dialogSlice:DialogToggleSlice
});

export default rootReducer;
