
import { ActionLink } from './ActionLink'
import { whatsappLink } from '../lib/links'
import type { SiteConfig } from '../config/site'

interface ContactProps {
  contact: SiteConfig['contact']
}

export function Contact({ contact }: ContactProps) {
  return (
    <section
      id="contact"
      className="contact on-dark"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <h2 id="contact-title" className="contact__title">
          Start a project with Brina.
        </h2>

        <p className="contact__text">
          Tell us about your business and what you want your website to do. We
          will reply and take it from there.
        </p>

        <div className="contact__actions">
          <ActionLink
            href={whatsappLink(
              contact.whatsappNumber,
              contact.whatsappMessage,
            )}
            variant="inverse"
            external
          >
            Message on WhatsApp
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
