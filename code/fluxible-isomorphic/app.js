import Fluxible from 'fluxible';

import HelloMessage from './components/HelloMessage';
import MessageStore from './stores/MessageStore';

export default new Fluxible({
    component: HelloMessage,
    stores: [MessageStore]
});
