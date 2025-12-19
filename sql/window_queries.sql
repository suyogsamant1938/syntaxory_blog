-- Top blogs by likes
select
  blog_id,
  count(*) as total_likes,
  rank() over (order by count(*) desc) as rank
from likes
group by blog_id;
