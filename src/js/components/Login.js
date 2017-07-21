// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import CaretNextIcon from 'grommet/components/icons/base/CaretNext';
import CaretPreviousIcon from 'grommet/components/icons/base/CaretPrevious';
import AddIcon from 'grommet/components/icons/base/Add';
import Pulse from 'grommet/components/icons/Pulse';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Notification from 'grommet/components/Notification';
import {addVideoToPlaylist,playNext,playPrevious} from '../actions/actions';
import events from 'events';
import ReactPlayer from 'react-player'
class Login extends React.Component {
  constructor (props) {
    super(props);
    this.eventEmitter = new events.EventEmitter();
    this._onChange = this._onChange.bind(this);
    this._onPlayNext = this._onPlayNext.bind(this);
    this._onPlayPrevious = this._onPlayPrevious.bind(this);
    this._onAddUrl = this._onAddUrl.bind(this);
    this.state={
      index:this.props.mediaProps.index,
      videos:this.props.mediaProps.videos

    };
  }

  componentWillMount() {
      this.eventEmitter.on('next',this._onPlayNext);
      this.eventEmitter.on('previous',this._onPlayPrevious);
  }

  componentWillReceiveProps(receivedProps) {
    this.setState({index:receivedProps.mediaProps.index,
                  videos:receivedProps.mediaProps.videos});
  }
  _onAddUrl(event) {
    this.props.dispatch(addVideoToPlaylist(this.state.addVideo));
  }

  _onPlayPrevious() {
    this.props.dispatch(playPrevious());
  }

  _onPlayNext() {
    this.props.dispatch(playNext());
  }
  _onChange(event) {
    this.setState({addVideo:event.currentTarget.value});
  }

  render() {
    const src=this.state.videos[this.state.index];
    const mediaPlayerContext=this;
    let previousOnClick,nextOnClick;
    if(this.state.index!==0) {
      previousOnClick=function() {mediaPlayerContext.eventEmitter.emit('previous')};
    } 
    if(this.state.index!==this.state.videos.length-1) {
      nextOnClick=function() {mediaPlayerContext.eventEmitter.emit('next')};
    }
    let message=this.state.videos.length+' videos are being added to the player.You can add more videos by clicking on plus icon.';
    return (
      <div>
          <form>
          <div className="form-group form-inline">
            <label className="control-label col-sm-5" for="email">Email:</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
            </div>
          </div>
          <div className="form-group form-inline">
            <label className="control-label col-sm-2" for="pwd">Password:</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd"/>
            </div>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" name="remember"/> Remember me</label>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
    </form>  
      </div>
    );
  }
};

let select = (state,props) => {
  console.log(state);
  return {mediaProps:state.reactReducer};
};

export default connect(select)(Login);
