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