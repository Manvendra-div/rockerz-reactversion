import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../googleSignIn/config'; // Import Firebase auth module

const initialState = {
  user: null, // Initial user state is null
};

export const LoginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set user data to the state
    },
    clearUser: (state) => {
      state.user = null; // Clear user data from the state
    },
  },
});

// Action to handle Firebase Google sign-in
export const signInWithGoogle = () => {
  return async (dispatch) => {
    try {
      const provider = new auth.GoogleAuthProvider();
      const result = await auth().signInWithPopup(provider);
      dispatch(setUser(result.user)); // Dispatch setUser action with user data
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
};

// Action to handle sign-out
export const signOut = () => {
  return async (dispatch) => {
    try {
      await auth().signOut();
      dispatch(clearUser()); // Dispatch clearUser action to clear user data
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
};

export const { setUser, clearUser } = LoginSlice.actions;

export default LoginSlice.reducer;
