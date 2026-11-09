
import type { CSSProperties } from 'react'

const PETAL_COUNT = 8
const OUTER = Array.from({ length: PETAL_COUNT }, (_, i) => i)

interface BloomMarkProps {
  size?: number
  color?: string
  className?: string
}

export function BloomMark({
  size,
  color = 'currentColor',
  className = '',
}: BloomMarkProps) {
  return (
    <svg
      className={`bloom ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke={color}
      role="img"
      aria-label="Bloom logo"
    >
      <g>
        {OUTER.map((i) => (
          <ellipse
            key={`outer-${i}`}
            className="bloom__petal"
            cx="100"
            cy="56"
            rx="15"
            ry="44"
            style={
              {
                '--r': `${i * (360 / PETAL_COUNT)}deg`,
                animationDelay: `${300 + i * 70}ms`,
              } as CSSProperties
            }
          />
        ))}

        {OUTER.map((i) => (
          <ellipse
            key={`inner-${i}`}
            className="bloom__petal bloom__petal--inner"
            cx="100"
            cy="74"
            rx="9"
            ry="26"
            style={
              {
                '--r': `${i * (360 / PETAL_COUNT) + 22.5}deg`,
                animationDelay: `${1000 + i * 60}ms`,
              } as CSSProperties
            }
          />
        ))}
      </g>

      <circle
        className="bloom__core"
        cx="100"
        cy="100"
        r="3.2"
        fill={color}
        stroke="none"
      /> 
    </svg>
  )
}
