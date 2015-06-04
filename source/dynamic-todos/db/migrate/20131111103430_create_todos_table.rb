class CreateTodosTable < ActiveRecord::Migration
  def change
    create_table :todos do |t|

      t.string :todo_content
      t.string :completed_at

      t.timestamps

    end
  end
end
