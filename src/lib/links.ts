
/** Returns a wa.me link, or undefined when no number is configured. */
export function whatsappLink(
  number: string,
  message: string,
): string | undefined {
  const digits = number.replace(/\D/g, '')

  if (!digits) return undefined

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Returns a mailto link, or undefined when no address is configured. */
export function emailLink(
  email: string,
  subject: string,
): string | undefined {
  const address = email.trim()

  if (!address) return undefined

  return `mailto:${address}?subject=${encodeURIComponent(subject)}`
}

/** Returns a normalised http(s) URL, or undefined when empty or invalid. */
export function webLink(url: string): string | undefined {
  try {
    const parsed = new URL(url.trim())

    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
      ? parsed.href
      : undefined
  } catch {
    return undefined
  }
}

/** Display host for a URL, without "www.". Empty string when unavailable. */
export function displayHost(url: string): string {
  const href = webLink(url)

  return href ? new URL(href).hostname.replace(/^www\./, '') : ''
}
