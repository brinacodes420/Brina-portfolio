
/**
 * Bloom site configuration
 */

export interface Project {
  id: string
  name: string
  description: string
  role: string
  url: string
  image: string
}

export interface SiteConfig {
  brand: string
  contact: {
    whatsappNumber: string
    whatsappMessage: string
    email: string
    emailSubject: string
  }
  projects: Project[]
}

export const siteConfig: SiteConfig = {
  brand: 'Bloom',

  contact: {
    whatsappNumber: '254740203320',
    whatsappMessage: "Hello Brina, I'd like to talk about a website project.",
    email: '',
    emailSubject: 'Website project enquiry',
  },

  projects: [
    {
      id: 'brookwell-harmony-school',
      name: 'Brookwell Harmony School',
      description:
        'A considered website for Brookwell Harmony School, designed and built by Brina.',
      role: 'Design and development',
      url: 'https://brookwell-harmony-school-nu.vercel.app/',
      image: '/brookwell-preview.png',
    },
    {
      id: 'lokation',
      name: 'Lokation',
      description:
        'A location-based navigation app exploring interactive maps and camera-guided directions.',
      role: 'Product design and development',
      url: 'https://lokation-delta.vercel.app/',
      image: '/lokation-preview.png',
    },
  ],
}
