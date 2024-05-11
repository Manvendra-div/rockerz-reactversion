import { combineReducers } from 'redux';
import SideBarToggleSlice from './ToggleSlice/SideBarToggleSlice';
import  loadingSlice  from './LoadingSlice/loadinSlice';
import CurrentTrackSlice from './CurrentTrackSlice/CurrentTrackSlice';
import PlayerToggleSlice from './ToggleSlice/PlayerToggleSlice';

const rootReducer = combineReducers({
    loadingState: loadingSlice,
    player:PlayerToggleSlice,
    sideBarToggle: SideBarToggleSlice,
    currentTrack: CurrentTrackSlice,
});

export default rootReducer;
