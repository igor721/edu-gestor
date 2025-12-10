export function computeStudentTotals(students) {
  const total = students.length;

  const byGrade = students.reduce((acc, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {});

  const byGender = students.reduce((acc, s) => {
    acc[s.gender] = (acc[s.gender] || 0) + 1;
    return acc;
  }, {});

  const byCity = students.reduce((acc, s) => {
    acc[s.city] = (acc[s.city] || 0) + 1;
    return acc;
  }, {});

  const byAge = students.reduce((acc, s) => {
    acc[s.age] = (acc[s.age] || 0) + 1;
    return acc;
  }, {});

  const avgDevelopment = total ? (students.reduce((sum, s) => sum + s.average, 0) / total) : 0;
  const avgAttendance = total ? (students.reduce((sum, s) => sum + s.attendance, 0) / total) : 0;

  return {
    total,
    byGrade,
    byGender,
    byCity,
    byAge,
    avgDevelopment: Number(avgDevelopment.toFixed(1)),
    avgAttendance: Number(avgAttendance.toFixed(1)),
  };
}

export function toChartSeries(obj) {
  return Object.entries(obj).map(([name, value]) => ({ name, value }));
}
