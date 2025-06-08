import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bounty/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bounty/"!</div>
}
