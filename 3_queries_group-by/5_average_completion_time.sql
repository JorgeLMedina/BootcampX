SELECT 
  students.name as student, 
  avg(assignment_submissions.duration) 
  as average_assigment_duration
FROM assignment_submissions
JOIN students ON students.id = student_id
WHERE students.end_date IS NULL
GROUP BY students.name
ORDER BY average_assigment_duration DESC;