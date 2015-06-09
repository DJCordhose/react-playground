import loadGreetingAction from '../../actions/loadGreetingAction';

import HomeControllerView from '../components/home/HomeControllerView';
import GreetingControllerView from '../components/greeting/GreetingControllerView';

export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: HomeControllerView
    },
    about: {
        path: '/greeting/:id',
        method: 'get',
        page: 'greeting',
        title: 'Greeting',
        handler: GreetingControllerView,
        action: loadGreetingAction
    }
};
