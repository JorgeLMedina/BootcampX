const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx"
});

// Takes arguments from the command line terminal
const args = process.argv.slice(2);

pool
  .query(
    `
SELECT
  teachers.name as teacher,
  cohorts.name as cohort,
  count(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
GROUP BY teacher, cohort
ORDER BY teacher;
    `, [args[0]]
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`The teacher ${user.teacher} had ${user.total_assistances} assinstances in the ${user.cohort} cohort.`);
    });
  })
  .catch((err) => console.log("query error", err.stack));