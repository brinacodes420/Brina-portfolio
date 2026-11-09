interface FooterProps {
  brand: string
}

export function Footer({ brand }: FooterProps) {
  return (
    <footer className="footer on-dark">
      <div className="container footer__inner">
        <span className="wordmark">{brand}</span>
        <small className="footer__copy">
          &copy; {new Date().getFullYear()} {brand}
        </small>
      </div>
    </footer>
  )
}
