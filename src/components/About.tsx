
import type { Profile, Skill, TimelineEntry } from "../types";

interface AboutProps {
  profile: Profile;
  skills: Skill[];
  timeline: TimelineEntry[];
}

function About({ profile, skills, timeline }: AboutProps) {
  const skillCategories = Array.from(
    new Set(skills.map((skill) => skill.category)),
  );

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">GET TO KNOW ME</span>
          <h2>
            A little about{" "}
            <span className="gradient-text">my journey.</span>
          </h2>
          <p>
            The interests, skills, and projects shaping my path.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-introduction glass">
            <span className="about-monogram" aria-hidden="true">
              {profile.firstName.charAt(0)}
            </span>

            <h3>Hi, I'm {profile.name}.</h3>

            <p>{profile.intro}</p>

            <p>
              I'm based in {profile.location} and continue to develop
              my skills through hands-on projects, experimentation,
              and independent learning.
            </p>

            <div className="about-location">
              <span aria-hidden="true">⌖</span>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="about-skills">
            <h3>Skills &amp; tools</h3>

            {skillCategories.map((category) => (
              <div className="skill-category" key={category}>
                <h4>{category}</h4>

                <div className="skill-tags">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <span className="skill-tag" key={skill.id}>
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-section">
          <h3>My learning journey</h3>

          <div className="timeline">
            {timeline.map((entry) => (
              <article className="timeline-entry" key={entry.id}>
                <div className="timeline-marker" aria-hidden="true" />

                <div className="timeline-content">
                  <span className="timeline-period">
                    {entry.period}
                  </span>

                  <h4>{entry.title}</h4>
                  <p className="timeline-organization">
                    {entry.organization}
                  </p>
                  <p>{entry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
