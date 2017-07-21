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
import Login from './Login';
class SocietyPortal extends React.Component {
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
        <div className="jumbotron">
          <h1 style={{'margin-left':'50px'}}>Welcome to Society Portal</h1>      
          <p style={{'margin-left':'50px'}}>This portal helps to circulate any new ideas, opinions, complaints to your society secretary</p>
        </div>
        <Login/>    
      </div>
    );
  }
};

let select = (state,props) => {
  console.log(state);
  return {mediaProps:state.reactReducer};
};

export default connect(select)(SocietyPortal);
