import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from './button'


export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // evita renderizar no SSR

  return (
    <>
      {theme === 'dark' ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme('light')}>
          <Sun />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme('dark')}>
          <Moon />
        </Button>
      )}
    </>
  )
}