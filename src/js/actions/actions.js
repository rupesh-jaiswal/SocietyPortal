
export  function playNext (value) {
  return function(dispatch){
    dispatch({
    type: 'PLAY_NEXT'
  });
};
}

export  function playPrevious () {
  return {
    type: 'PLAY_PREVIOUS'
  }
}

export  function addVideoToPlaylist (value) {

  return function(dispatch) {
    dispatch({type: 'ADD_VIDEO',value});
  };
}