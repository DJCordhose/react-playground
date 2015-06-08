import Fluxible from 'fluxible';

import Home from './components/home/HomeControllerView';
import MessageStore from './stores/MessageStore';

export default new Fluxible({
    component: Home,
    stores: [MessageStore]
});
