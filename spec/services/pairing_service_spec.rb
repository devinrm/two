require 'rails_helper'

describe PairingService do 

  describe 'get_pairs' do 
    let(:pairs) { PairingService.new.get_pairs }

    before do 
      create(:junior_user)
      create(:mid_level_user)
      create(:senior_user)
    end

    describe 'matching junior developers' do
      it 'matches all junior developers with mid-level developers' do
        expect(get_pairs_with_skill_levels({pair_one_level:'junior', pair_two_level: 'mid_level'}).size).to eq(1)
      expect(pairs.size).to eq(2)
      end

      context 'there are more junior developers than mid level developers' do
        before do 
          create(:junior_user)
        end

        it 'matches remaining junior developers with senior developers' do
          expect(get_pairs_with_skill_levels({pair_one_level:'junior', pair_two_level: 'senior'}).size).to eq(1)
          expect(pairs.size).to eq(2)
        end
      end

      context 'not enough mid or seniors to match with juniors' do
        before do 
          create(:junior_user)
          create(:junior_user)
          create(:junior_user)
        end

        it 'matches junior developers with other junior developers' do
          junior_dev_pairs = get_pairs_with_skill_levels({pair_one_level:'junior', pair_two_level: 'junior'})
          expect(junior_dev_pairs.size).to eq(1)
          expect(pairs.size).to eq(3)
        end
      end
    end

    describe 'matching mid-level developers' do
      before do 
        create(:mid_level_user)
      end

      it 'matches all unmatched mid-level developers with senior developers' do
        expect(get_pairs_with_skill_levels({pair_one_level:'mid_level', pair_two_level: 'senior'}).size).to eq(1)
        expect(pairs.size).to eq(2)
      end

      context 'not enough senior developers to match with mids' do
        before do 
        create(:mid_level_user)
        create(:mid_level_user)
      end

        it 'matches mid-levels with other mid-levels' do
          expect(get_pairs_with_skill_levels({pair_one_level:'mid_level', pair_two_level: 'mid_level'}).size).to eq(1)
          expect(pairs.size).to eq(3)
        end
      end
    end

    describe 'matching senior developers' do
      before do 
        create(:senior_user)
      end

      it 'matches all remaining senior developers with other senior developers' do
        expect(get_pairs_with_skill_levels({pair_one_level:'senior', pair_two_level: 'senior'}).size).to eq(1)
        expect(pairs.size).to eq(2)
      end
    end

    describe 'uneven number of developers' do
      let(:solo_pair) { pairs.select{ |pair| pair.pair_two.nil? }.first }

      it 'defaults to leaving seniors solo' do
        expect(solo_pair.pair_one).to eq('senior')
      end

      context 'no senior developers to solo' do
        before do 
          create(:mid_level_user)
          User.all.senior.first.destroy
        end

        it 'leaves mid_levels solo' do
          expect(solo_pair.pair_one).to eq('mid_level')
        end
      end

      context 'no mid_levels or seniors to solo' do
        before do
          User.all.senior.first.destroy
          User.all.mid_level.first.destroy
        end

        it 'leaves junior solo if no mid_levels or seniors' do
          expect(solo_pair.pair_one).to eq('junior')
        end
      end
    end
  end

  def get_pairs_with_skill_levels(args)
    pair_one_level = args[:pair_one_level]
    pair_two_level = args[:pair_two_level]

    if pair_two_level
      pairs.select{ |e| e.pair_one == pair_one_level && e.pair_two == pair_two_level }
    else
      pairs.select{ |e| e.pair_one == pair_one_level}
    end
  end
end
