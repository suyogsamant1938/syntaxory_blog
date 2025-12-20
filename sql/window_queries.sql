-- Top blogs by likes
select
  blog_id,
  count(*) as total_likes,
  rank() over (order by count(*) desc) as rank
from likes
group by blog_id;

-- rank blogs by popularity without losing row-level detail
select
  b.id,
  b.title,
  count(l.blog_id) as total_likes,
  rank() over (order by count(l.blog_id) desc) as popularity_rank
from blogs b
left join likes l on b.id = l.blog_id
group by b.id;
