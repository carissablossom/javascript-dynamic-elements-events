class Todo < ActiveRecord::Base
  # Remember to create a migration!

  after_save :update_completed_time


  def update_completed_time
    self.completed_at = Time.now.strftime("%I:%M %p %Z on %A %B %d")
  end

end
