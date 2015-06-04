class Todo < ActiveRecord::Base
  # Remember to create a migration!

  order(created_at: :desc)
end
