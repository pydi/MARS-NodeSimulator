module.exports.createResponse = function(statusCode) {
    var res;
    var now = new Date();
    res = {
        "status": {
            "responseTime": parseInt(now.valueOf() / 1000),
            "statusCode": statusCode
        }
    };
    return res;
};

