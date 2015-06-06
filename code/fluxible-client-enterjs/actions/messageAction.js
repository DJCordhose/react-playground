export default (actionContext, messagePayload) => {
    actionContext.dispatch('MESSAGE_ACTION', messagePayload);
};

