class PairsController < ApplicationController
  def index
   render json: {pairs: PairingService.new.get_pairs}
  end
end