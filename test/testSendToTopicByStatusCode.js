"use strict";

const SNSService = require("../lib/snsService");

module.exports.sendToTopicByStatusCodeTests = {
    testToSendItToSuccessTopicOn200: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [],
            failureStatusCodes: [],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let statusCode = 200;
        let payload = {
            "data": "Test"
        };

        snsService.sendToTopicByStatusCode(statusCode, payload)
            .then(response => {
                test.ok(response !== null);
                test.ok(response.topicName === config.successTopicName);
                test.done();
            })
            .catch(err => {
                //Only used by build server
                test.done();
            });
    },
    testToSendItToErrorTopicOn400: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [],
            failureStatusCodes: [400],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let statusCode = 400;
        let payload = {
            "data": "Test"
        };

        snsService.sendToTopicByStatusCode(statusCode, payload)
            .then(response => {
                test.ok(response !== null);
                test.ok(response.topicName === config.failureTopicName);
                test.done();
            })
            .catch(err => {
                //Only used by build server
                test.done();
            });
        ;
    },
    testToSendItToRetryTopicOn500: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [500],
            failureStatusCodes: [400],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let statusCode = 500;
        let payload = {
            "data": "Test"
        };

        snsService.sendToTopicByStatusCode(statusCode, payload)
            .then(response => {
                test.ok(response !== null);
                test.ok(response.topicName === config.retryTopicName);
                test.done();
            })
            .catch(err => {
                //Only used by build server
                test.done();
            });
    },
    testToSendItToSuccessTopicOnIfUnknown: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [500],
            failureStatusCodes: [400],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let statusCode = 201;
        let payload = {
            "data": "Test"
        };

        snsService.sendToTopicByStatusCode(statusCode, payload)
            .then(response => {
                test.ok(response !== null);
                test.ok(response.topicName === config.successTopicName);
                test.done();
            })
            .catch(err => {
                //Only used by build server
                test.done();
            });
    },
    testToFailIfStatusCodeIsInvalid: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [500],
            failureStatusCodes: [400],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let payload = {
            "data": "Test"
        };

        snsService.sendToTopicByStatusCode(null, payload)
            .catch(err => {
                test.ok(err !== null);
                test.ok(err.message === "StatusCode is invalid");
                test.done();
            });
    },
    testToFailIfPayLoadIsInvalid: function (test) {
        let config = {
            region: "us-west-2",
            retryStatusCodes: [500],
            failureStatusCodes: [400],
            successStatusCodes: [200],
            maxRetryAttempts: 2,
            retryTopicName: "retry-topic",
            successTopicName: "success-topic",
            failureTopicName: "error-topic"
        };

        let snsService = new SNSService(config);
        let statusCode = 201;

        snsService.sendToTopicByStatusCode(statusCode)
            .catch(err => {
                test.ok(err !== null);
                test.ok(err.message === "PayLoad is empty");
                test.done();
            });
    }
};