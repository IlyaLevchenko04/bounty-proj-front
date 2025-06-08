import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bounty/$bountyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bounty/$bountyId"!</div>
}
