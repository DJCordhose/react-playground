import BaseStore from 'fluxible/addons/BaseStore';

export default class MessageStore extends BaseStore {
    static get storeName() {
        return 'MessageStore';
    }
    static get handlers() {
        return {
            'MESSAGE_ACTION': 'handleMessage'
        };
    }

    initialize() {
        this._message = null;
    }

    handleMessage(payload) {
        this._message = payload;
        this.emitChange();
    }

    get message() {
        return this._message;
    }

    get link() {
        // TODO how to get the id?
        const id = 4711;
        const link = `http://localhost:8080/greeting?id=${id}`;
        return link;
    }

    dehydrate() {
        return {
            message: this.message
        };
    }
    rehydrate(state) {
        this._message = state.message;
    }

}