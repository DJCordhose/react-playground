export default (context, payload, done) => {
    const id = payload.get('params').get('id');
    context.dispatch('LOAD_GREETING', { id });
    done();
};

