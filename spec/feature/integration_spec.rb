
# location: spec/feature/integration_spec.rb
require 'rails_helper'

RSpec.describe 'Creating attendance', type: :feature do
	scenario 'valid inputs' do
		visit NewAttendancesPage
		click_on 'showEdit'
		assert_selector 'Yes'
		click on 'Save'
		visit AttendancePage
		expect(page).to have_content('Yes')
	end
end
# frozen_string_literal: true

# location: spec/feature/integration_spec.rb
require 'rails_helper'

# RSpec.describe 'Creating a book', type: :feature do
#   scenario 'valid inputs' do
#     visit new_book_path
#     fill_in 'Title', with: 'harry potter'
#     click_on 'Create Book'
#     visit books_path
#     expect(page).to have_content('harry potter')
#   end
# end