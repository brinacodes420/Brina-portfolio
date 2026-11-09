
import { useState } from 'react'
import { ActionLink } from './ActionLink'
import { WheelCarousel } from './ui/wheel-carousel'
import type { WheelCarouselItem } from './ui/wheel-carousel'
import { webLink } from '../lib/links'
import type { Project } from '../config/site'

interface WorkProps {
  projects: Project[]
}

export function Work({ projects }: WorkProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const carouselItems: WheelCarouselItem[] = projects.map((project) => ({
    label: project.name,
    image: project.image || '',
    imageAlt: `Preview of the ${project.name} website`,
  }))

  const selectedProject = projects[activeIndex]

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
        <h2 id="work-title" className="work__title">
          Selected work
        </h2>

        <div className="work__carousel">
          <WheelCarousel
            items={carouselItems}
            initialIndex={0}
            mode="custom"
            background="#050608"
            panelColor="#111C19"
            textColor="rgba(247, 245, 239, 0.45)"
            selectedColor="#F7F5EF"
            markerColor="#A6B5A0"
            photoWidth={44}
            photoAspect="3/4"
            contentWidth={1100}
            onActiveChange={(_, index) => setActiveIndex(index)}
          />
        </div>

        {selectedProject && (
          <div className="project__info" aria-live="polite">
            <p className="project__number">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')}
            </p>

            <h3 className="project__name">{selectedProject.name}</h3>

            <p className="project__description">
              {selectedProject.description}
            </p>

            <p className="project__role">{selectedProject.role}</p>

            <ActionLink
              href={webLink(selectedProject.url)}
              variant="text"
              external
            >
              Visit live website
            </ActionLink>
          </div>
        )}
      </div>
    </section>
  )
}
