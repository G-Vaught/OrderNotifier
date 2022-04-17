/*
    General utility functions for things like setting responses, and parsing params
*/
module.exports = {
    setSuccess: function (res, data, message, statusCode) {
        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(data));
        }
        res.status = statusCode | 200;
        res.statusMessage = message;
        return res;
    },
    setError: function (res, data, message, statusCode) {
        if (data) {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(data));
        }
        res.status = statusCode | 500;
        res.statusMessage = message;
        return res;
    }
};