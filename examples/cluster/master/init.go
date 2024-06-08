package master

import (
	"github.com/flwwsg/nano/component"
	"github.com/flwwsg/nano/session"
)

var (
	// All services in master server
	Services = &component.Components{}

	// Topic service
	topicService = newTopicService()
	// ... other services
)

func init() {
	Services.Register(topicService)
}

func OnSessionClosed(s *session.Session) {
	topicService.userDisconnected(s)
}
