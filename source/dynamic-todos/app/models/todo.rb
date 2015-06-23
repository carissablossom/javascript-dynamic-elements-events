class Todo < ActiveRecord::Base
  validates :todo_content, presence: true
  # Remember to create a migration!
end
