ActiveAdmin.register_page 'Dashboard' do
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }
  content title: proc { I18n.t('active_admin.dashboard') } do
    div class: 'blank_slate_container', id: 'dashboard_default_message' do
      span class: 'blank_slate' do
        span I18n.t('active_admin.dashboard_welcome.welcome')
        small I18n.t('active_admin.dashboard_welcome.call_to_action')
      end
    end
    columns do
      column do
        panel 'Recent Data Entries' do
          table_for DataEntry.limit(10).order('id desc') do
            column('Title', &:title)
            column('Subtitle', &:subtitle)
            column('Latitude', &:latitude)
            column('Longitude', &:longitude)
            column('View') { |entry| link_to('View', admin_data_entry_path(entry)) }
          end
        end
      end
    end
  end
end
