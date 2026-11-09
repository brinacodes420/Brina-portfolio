/**
 * Bloom site configuration
 * ------------------------------------------------------------------
 * This is the ONE place to edit contact details and project links.
 * Nothing here is invented: anything left empty ('') is simply shown
 * as unavailable (buttons look disabled) until you fill it in.
 */

export interface Project {
  /** Unique, URL-safe id. */
  id: string
  name: string
  /** One or two sentences. Keep it factual. */
  description: string
  /** Short line describing Bloom's role, e.g. 'Design and development'. */
  role: string
  /** Live website address, including https://. Leave '' until it is ready. */
  url: string
  /**
   * Optional screenshot. Put the file in /public (for example
   * public/brookwell.jpg) and set this to './brookwell.jpg'.
   * Leave '' to show the neutral browser-frame preview.
   */
  image: string
}

export interface SiteConfig {
  brand: string
  contact: {
    /** International format, digits only or with + and spaces, e.g. '254700000000'. */
    whatsappNumber: string
    /** Pre-filled WhatsApp message. */
    whatsappMessage: string
    /** Your email address. */
    email: string
    /** Pre-filled email subject. */
    emailSubject: string
  }
  /**
   * Selected work. Add a real project by adding another object to this
   * array. It appears automatically; do not add placeholders.
   */
  projects: Project[]
}

export const siteConfig: SiteConfig = {
  brand: 'Bloom',

  contact: {
    whatsappNumber: '', // TODO: add your WhatsApp number
    whatsappMessage: "Hello Bloom, I'd like to talk about a website project.",
    email: '', // TODO: add your email address
    emailSubject: 'Website project enquiry',
  },

  projects: [
    {
      id: 'brookwell-harmony-school',
      name: 'Brookwell Harmony School',
      description:
        'A considered website for Brookwell Harmony School, designed and built by Bloom.',
      role: 'Design and development',
      url: '', // TODO: add the live Brookwell Harmony School website URL
      image: '',
    },
  ],
}
