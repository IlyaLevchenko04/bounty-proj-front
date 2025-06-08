import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/activeBounties')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/activeBounties"!</div>
}
