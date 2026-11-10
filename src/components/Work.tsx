import PictureRailGallery from './ui/picture-rail-gallery'
import type { PictureRailItem } from './ui/picture-rail-gallery'
import { ActionLink } from './ActionLink'
import { webLink } from '../lib/links'
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
          eyebrow="BRINA / SELECTED WORK"
          heading="Selected work"
          caption="A selection of digital experiences, thoughtful interfaces, and creative work."
        />

        <div className="work__project-links">
          {projects.map((project, index) => (
            <article
              className="project__info"
              key={`${project.name}-${index}`}
            >
              <p className="project__number">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </p>

              <h3 className="project__name">{project.name}</h3>

              <p className="project__description">
                {project.description}
              </p>

              <p className="project__role">{project.role}</p>

              <ActionLink
                href={webLink(project.url)}
                variant="text"
                external
              >
                Visit live website
              </ActionLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}