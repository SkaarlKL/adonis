function errorResponseStandard(error) {
    const errorObject = {
        response: {},
        status: 0,
        message: []
    }
    if (error.response) {
        if (error.response.status) {
            errorObject.status = error.response.status;
        } else errorObject.status = 500;
    }
    if (error.message) {
        errorObject.message.push(error.message);
    } else errorObject.message.push('Internal Server Error');
    if (error.data) {
        errorObject.response = error.data;
    }
    return {
        error
        // data: errorObject.response || {},
        // status: error.status,
        // message: errorObject.message || [error.message]
    }
};

function successfullResponseStandard(response, message, status) {
    const responseObject = {
        data: response ? response : {},
        status: status ? status : 200,
        message: message ? message : ['']
    };
    return responseObject;
}

module.exports = { errorResponseStandard, successfullResponseStandard };