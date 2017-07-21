
const initialState= {
	index:0,
	videos:[
	'https://www.youtube.com/embed/MhkGQAoc7bc',
	'https://www.youtube.com/embed/i9MHigUZKEM',
	'https://www.youtube.com/embed/4WJLlWpzpP0']
};

const handlers={
  'PLAY_NEXT':(state,action)=>({index:state.index+1})
  ,'PLAY_PREVIOUS':(state,action)=>({index:state.index-1})
  ,'ADD_VIDEO':(state,action)=>({videos:addVideo(state,action.value)})
}

function addVideo (state,data) {
		state.videos.push(data);
		return state.videos;
}
export default function activityReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}