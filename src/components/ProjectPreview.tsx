import { displayHost } from '../lib/links'
import type { Project } from '../config/site'

interface ProjectPreviewProps {
  project: Project
}


/**
 * A browser-frame preview. Shows the project's screenshot when `image` is set
 * in the config; otherwise a neutral, abstract layout carrying only the
 * project's name, so nothing about the real site is invented.
 */
export function ProjectPreview({ project }: ProjectPreviewProps) {
  const host = displayHost(project.url)

  return (
    <div className="preview">
      <div className="browser">
        <div className="browser__bar" aria-hidden="true">
          <span className="browser__dot" />
          <span className="browser__dot" />
          <span className="browser__dot" />
          <span className="browser__url">{host}</span>
        </div>
        <div className="browser__view">
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of the ${project.name} website`}
              loading="lazy"
            />
          ) : (
            <div
              className="mock"
              role="img"
              aria-label={`Preview of the ${project.name} website`}
            >
              <div className="mock__nav">
                <span className="mock__name">{project.name}</span>
                <span className="mock__links">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="mock__body">
                <div className="mock__text">
                  <i className="bar bar--lg" style={{ width: '92%' }} />
                  <i className="bar bar--lg" style={{ width: '68%' }} />
                  <i className="bar" style={{ width: '58%' }} />
                  <i className="bar" style={{ width: '46%' }} />
                  <i className="mock__pill" />
                </div>
                <div className="mock__shapes">
                  <i className="mock__arch" />
                  <i className="mock__dot" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
