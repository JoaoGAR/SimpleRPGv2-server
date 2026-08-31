const { getResponseMessage } = require('../utils/responseMessages');
const { positiveInteger, badRequest } = require('../utils/requestValidation');
const {
    JobError,
    dismissWork: dismissWorkService,
    finishWork: finishWorkService,
    getJobs: getJobsService,
    startWork: startWorkService,
} = require('../services/jobService');

function handleJobError(res, error) {
    if (error instanceof JobError) {
        return res.status(error.status).json({ status: error.status, msg: error.message });
    }

    console.error('Unable to process job:', error);
    return res.status(500).send(getResponseMessage('serverError'));
}

async function getJobs(req, res) {
    try {
        return res.send(await getJobsService(req.user.id));
    } catch (error) {
        return handleJobError(res, error);
    }
}

async function startWork(req, res) {
    const jobId = positiveInteger(req.body.jobId);
    const duration = Number(req.body.duration);
    if (!jobId || !Number.isInteger(duration) || duration < 0 || duration > 2) {
        return badRequest(res, 'Invalid job request.');
    }

    try {
        const queue = await startWorkService(req.user.id, jobId, duration);
        return res.json({ status: 200, msg: getResponseMessage('workQueued'), queue });
    } catch (error) {
        return handleJobError(res, error);
    }
}

async function finishWork(req, res) {
    const queueId = positiveInteger(req.body.queueId);
    if (!queueId) return badRequest(res, 'Invalid queue item.');

    try {
        const { jobResult, travellingId, character } = await finishWorkService(req.user.id, queueId);
        return res.send({ jobResult, status: 200, message: getResponseMessage('workCompleted'), travellingId, character });
    } catch (error) {
        return handleJobError(res, error);
    }
}

async function dismissWork(req, res) {
    const queueId = positiveInteger(req.body.queueId);
    if (!queueId) return badRequest(res, 'Invalid queue item.');

    try {
        const { travellingId } = await dismissWorkService(req.user.id, queueId);
        return res.send({ status: 200, message: getResponseMessage('workDismissed'), travellingId });
    } catch (error) {
        return handleJobError(res, error);
    }
}

module.exports = { getJobs, startWork, finishWork, dismissWork };
