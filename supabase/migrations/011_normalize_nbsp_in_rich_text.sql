-- Content pasted from Word/PDF into the rich text editor arrives with every
-- space encoded as &nbsp; (non-breaking space). Browsers then treat a whole
-- paragraph as one unbreakable "word" and are forced to break it mid-word at
-- the container edge. Replace those with ordinary spaces.
-- Run this in the Supabase SQL editor after migrations 001-010.

update welcome_slides
  set content = regexp_replace(replace(content, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where content like '%&nbsp;%';

update articles
  set content = regexp_replace(replace(content, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where content like '%&nbsp;%';

update announcements
  set content = regexp_replace(replace(content, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where content like '%&nbsp;%';

update pastors
  set biography = regexp_replace(replace(biography, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where biography like '%&nbsp;%';

update parish_history
  set content = regexp_replace(replace(content, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where content like '%&nbsp;%';

update categorical_groups
  set content = regexp_replace(replace(content, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where content like '%&nbsp;%';

update social_ministries
  set description = regexp_replace(replace(description, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where description like '%&nbsp;%';

update social_ministries
  set activities = regexp_replace(replace(activities, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where activities like '%&nbsp;%';

update sacrament_forms
  set description = regexp_replace(replace(description, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where description like '%&nbsp;%';

update parish_profile
  set about_saint = regexp_replace(replace(about_saint, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where about_saint like '%&nbsp;%';

update parish_profile
  set vision = regexp_replace(replace(vision, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where vision like '%&nbsp;%';

update parish_profile
  set mission = regexp_replace(replace(mission, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where mission like '%&nbsp;%';

update parish_profile
  set address = regexp_replace(replace(address, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where address like '%&nbsp;%';

update parish_profile
  set office_hours = regexp_replace(replace(office_hours, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where office_hours like '%&nbsp;%';

update mass_intentions_info
  set format_info = regexp_replace(replace(format_info, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where format_info like '%&nbsp;%';

update mass_intentions_info
  set deadline_info = regexp_replace(replace(deadline_info, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where deadline_info like '%&nbsp;%';

update mass_intentions_info
  set offering_info = regexp_replace(replace(offering_info, '&nbsp;', ' '), ' {2,}', ' ', 'g')
  where offering_info like '%&nbsp;%';
