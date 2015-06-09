import BaseStore from 'fluxible/addons/BaseStore';

export default class MessageStore extends BaseStore {
    static get storeName() {
        return 'MessageStore';
    }
    static get handlers() {
        return {
            'MESSAGE_ACTION': 'handleMessage',
            'LOAD_GREETING': 'handleLoadGreeting',
            'SAVE_GREETING': 'handleSaveGreeting'
        };
    }

    initialize() {
        this._message = null;
        this._id = null;
    }

    handleSaveGreeting(payload) {
        console.log(`Store hit by saving ${payload}`);
        this._message = payload;
        this.emitChange();
    }

    handleMessage(payload) {
        this._message = payload;
        this.emitChange();
    }

    handleLoadGreeting(payload) {
        this._id = payload.id;
        // TODO: neede to load
        // TODO: how to I know if I am on client or on server?
        this.emitChange();
    }

    get message() {
        return this._message;
    }

    get link() {
        const id = this._id;
        if (id) {
            // TODO: make the prefix configurable or infer from current url or server
            const link = `http://localhost:8080/greeting?id=${id}`;
            return link;
        } else {
            return null;
        }
    }

    dehydrate() {
        return {
            message: this.message,
            id: this._id
        };
    }
    rehydrate(state) {
        this._message = state.message;
        this._id = state.id;
    }

}