import { Component, type ReactNode } from 'react'

/**
 * Barreira de erro: se o componente filho quebrar em tempo de execução,
 * o resto do site continua de pé (mostra o `fallback`, ou nada).
 */
export default class SafeBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Um componente falhou e foi isolado:', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
