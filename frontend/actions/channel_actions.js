import * as ChannelApiUtil from '../util/channels_api_util';

export const RECEIVE_ALL_CHANNELS = 'RECEIVE_ALL_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const fetchChannels = () => dispatch => {
  return (
    ChannelApiUtil.fetchChannels().then(channels =>
      dispatch(receiveAllChannels(channels)))
  );
};

export const createChannel = (channel) => dispatch => {
  return (
    ChannelApiUtil.createChannel(channel).then(channel =>
      dispatch(receiveChannel))
  );
};

export const deleteChannel = (channelId) => dispatch => {
  return(
    ChannelApiUtil.deleteChannel(channelId).then(() =>
      dispatch(removeChannel(channelId)))
  );
};


const receiveAllChannels = (channels) => {
  return({
    type: RECEIVE_ALL_CHANNELS,
    channels
  });
};

const receiveChannel = (channel) => {
  return({
    type: RECEIVE_CHANNEL,
    channel
  });
};

const removeChannel = (channelId) => {
  return({
    type: REMOVE_CHANNEL,
    channelId
  });
};
