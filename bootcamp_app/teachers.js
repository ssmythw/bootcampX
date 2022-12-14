const { Pool } = require("pg");

const pool = new Pool({
  user: "scott",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
    SELECT teachers.name, cohorts.name, count(assistance_requests.*) AS total_assistances
    FROM teachers
    JOIN assistance_requests ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name = ${process.argv[2]}
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
    `
  )
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.error("query error", err.stack));
