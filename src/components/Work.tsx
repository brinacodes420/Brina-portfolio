
import PictureRailGallery from './ui/picture-rail-gallery'
import type { PictureRailItem } from './ui/picture-rail-gallery'
import type { Project } from '../config/site'

interface WorkProps {
  projects: Project[]
}

export function Work({ projects }: WorkProps) {
  const galleryItems: PictureRailItem[] = projects.map(
    (project, index) => ({
      id: `project-${index}`,
      title: project.name,
      image: project.image || '',
      url: project.url,
      artist: project.role,
      details: project.description
        ? [project.description]
        : [],
      frame: 'black',
      mat: false,
    }),
  )

  if (projects.length === 0) {
    return (
      <section id="work" className="work" aria-labelledby="work-title">
        <div className="container">
          <h2 id="work-title" className="work__title">
            Selected work
          </h2>
          <p>Projects will appear here soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="container">
        <PictureRailGallery
          items={galleryItems}
          eyebrow="SELECTED WORK"
          heading="Selected work"
          caption="A selection of digital experiences, thoughtful interfaces, and creative work."
        />

        <div className="work__visit-links">
          {projects.map((project) =>
            project.url ? (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work__visit-link"
              >
                Visit {project.name} <span aria-hidden="true">↗</span>
              </a>
            ) : null,
          )}
        </div>
      </div>
    </section>
  )
}
