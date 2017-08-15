class PairingService 
  attr_accessor :pairs

  def initialize
    @pairs = []
  end

  def get_pairs
    juniors = User.all.junior.order('random()').to_a
    mid_levels = User.all.mid_level.order('random()').to_a
    seniors = User.all.senior.order('random()').to_a

    generate_pairs(juniors, mid_levels, seniors)

    pairs
  end  

  private

  def generate_pairs(juniors, mid_levels, seniors)
    return if (juniors + mid_levels + seniors).empty?

    pairs << pair(juniors, mid_levels, seniors)
    generate_pairs(juniors, mid_levels, seniors)
  end

  def pair(juniors, mid_levels, seniors)
    pair_one = juniors.pop || mid_levels.pop || seniors.pop
    pair_two = if pair_one.junior?
                    mid_levels.pop || seniors.pop || juniors.pop
                  else
                    seniors.pop || mid_levels.pop
                  end
    Pair.new(pair_one.name, pair_two.try(:name))
  end
end

Pair = Struct.new(:pair_one, :pair_two)