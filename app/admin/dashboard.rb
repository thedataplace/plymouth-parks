intro = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum"""

ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    # div class: "blank_slate_container", id: "dashboard_default_message" do
    #   span class: "blank_slate" do
    #     span I18n.t("active_admin.dashboard_welcome.welcome")
    #     small I18n.t("active_admin.dashboard_welcome.call_to_action")
    #   end
    # end

    columns do
      column do
        panel "Info" do
          para intro
        end
      end
      column do
        panel "Recent Data Entries" do
          table_for DataEntry.limit(10).order("id desc") do
            column("Title")     { |entry| entry.title }
            column("Subtitle")  { |entry| entry.subtitle }
            column("Latitude")  { |entry| entry.latitude }
            column("Longitude") { |entry| entry.longitude }
            column("View")      { |entry| link_to("View", admin_data_entry_path(entry)) }
          end
        end
      end
    end
  end
end
