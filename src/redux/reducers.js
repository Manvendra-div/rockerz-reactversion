import { combineReducers } from 'redux';
import SideBarToggleSlice from './ToggleSlice/SideBarToggleSlice';
import  loadingSlice  from './LoadingSlice';
import CurrentTrackSlice from './CurrentTrackSlice';
import PlayerToggleSlice from './ToggleSlice/PlayerToggleSlice';
import LoginSlice from './LoginSlice';
import DialogToggleSlice from './ToggleSlice/DialogToggleSlice';
import LastSessionSlice from './LastSessionSlice';
import FavouritesTracksSlice from './FavouritesTracksSlice';

const rootReducer = combineReducers({
    loadingState: loadingSlice,
    player:PlayerToggleSlice,
    sideBarToggle: SideBarToggleSlice,
    currentTrack: CurrentTrackSlice,
    loginState:LoginSlice,
    dialogSlice:DialogToggleSlice,
    lastSession:LastSessionSlice,
    favouriteTrack:FavouritesTracksSlice,
});

export default rootReducer;
