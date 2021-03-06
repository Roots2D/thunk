class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      if @channel.is_dm
          params[:channel][:invitations].each do |user|
          payload = {channel_id: @channel.id, user_id: user}
          ChannelSubscription.create(payload)
        end
      end
      payload = {channel_id: @channel.id, user_id: @channel.admin_id}
      ChannelSubscription.create(payload)
      render 'api/channels/show'
    else
      render json: ["Channel name above 22 characters"], status: 401
    end
  end

  def show
    @channel = Channel.find_by(id: params[:id])
    if @channel
      render 'api/channels/show'
    else
      render json: {}
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    @channel_sub = current_user.channel_subscriptions.find_by(
      channel_id: @channel.id)
    if current_user.id == @channel.admin_id && !@channel.is_dm
      @channel.destroy
    elsif @channel.channel_subscriptions.length == 1
      @channel.destroy
    else
      @channel_sub.destroy
    end
    render json: {}
  end

  def update
    @channel = Channel.find_by(id: params[:channelId])
    if !@channel.is_dm
      payload = {channel_id: params[:channelId], user_id: current_user.id}
      ChannelSubscription.create(payload)
    else
    end
    render 'api/channels/show'
  end


  private

  def channel_params
    params.require(:channel).permit(:title, :admin_id, :is_dm,
      :is_private)
  end
end
