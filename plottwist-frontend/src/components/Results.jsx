function Results({ data }) {
  return (
    <div>
      {/* 1. show data.readiness_score */}
      <p>Readiness Score: {data.readiness_score}</p>
      {/* 2. loop data.existing_skills with .map() */}
      <h3>Existing Skills</h3>
      <ul>
        {data.existing_skills.map((skill) => (
          <div key={skill.name}>
            <p>{skill.name}</p>
            <p>{skill.score}</p>
          </div>
        ))}
      </ul>
      {/* 3. loop data.missing_skills with .map() */}
      <h3>Missing Skills</h3>
      <ul>
        {data.missing_skills.map((skill) => (
          <div key={skill.name}>
            <p>{skill.name}</p>
            <p>{skill.why_it_matters}</p>
          </div>
        ))}
      </ul>
        {data.plan.map((milestone) => (
            <div key={milestone.milestone}>
                <h4>{milestone.milestone}</h4>
                <p>{milestone.timeframe}</p>
                <ul>
                {milestone.actions.map((action) => (
                    <li key={action}>{action}</li>
            ))}
      </ul>
  </div>
))}
    </div>
  )
}

export default Results