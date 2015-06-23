//events aren't global (yay), so this an event bus that's shared within the admin module only

import Events from 'event-emitter';

export default Events({});