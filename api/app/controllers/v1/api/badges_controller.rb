class V1::Api::BadgesController < ApplicationController

  def index
    puts '*' * 100
    p params
    puts '*' * 100
    render json: Teacher.find(params[:teacher_id]).badges
  end

  def create
    teacher = Teacher.find(params[:teacher_id])
    badge = Badge.create!( title: params[:title] )
    teacher.badges << badge
    render json: badge
  end

  def update
    badge = Badge.find(params[:id])
    badge.points += params[:value].to_i
    badge.save!
    render json: badge
  end


end
