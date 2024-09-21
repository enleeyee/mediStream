import type { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

// Initialize the AWS SDK Transcribe client
const transcribe = new AWS.TranscribeService();

export const handler: Handler = async (event, context) => {
    // Assume the event contains the S3 bucket and key for the audio file
    const { audioS3Uri } = event;

    // Create a unique name for the transcription job
    const transcriptionJobName = `medical-conversation-${Date.now()}`;

    // Parameters for AWS Transcribe Medical
    const params = {
        TranscriptionJobName: transcriptionJobName,
        LanguageCode: 'en-US', // Adjust language if needed
        Media: {
            MediaFileUri: audioS3Uri,  // URI of the audio file in S3
        },
        MediaFormat: 'mp3',  // Adjust based on your input audio format
        OutputBucketName: process.env.OUTPUT_BUCKET,  // S3 bucket where the transcription will be stored
        MedicalTranscriptionJob: true,
        Specialty: 'PRIMARYCARE',
        Type: 'DICTATION'
    };

    try {
        // Start the transcription job
        await transcribe.startMedicalTranscriptionJob(params).promise();

        // Poll the job status until it's completed
        const transcriptionResult = await pollTranscriptionJob(transcriptionJobName);

        // Fetch the transcription text from the job output
        const transcriptionText = await getTranscriptionText(transcriptionResult.TranscriptFileUri);

        // Return the transcription result
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Transcription completed successfully",
                transcriptionText
            })
        };
    } catch (error) {
        console.error("Error with transcription:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error with transcription",
                error: error.message
            })
        };
    }
};

// Poll the transcription job until it's done
async function pollTranscriptionJob(jobName: string) {
    const transcribe = new AWS.TranscribeService();

    while (true) {
        const result = await transcribe.getMedicalTranscriptionJob({ TranscriptionJobName: jobName }).promise();
        const jobStatus = result.MedicalTranscriptionJob.TranscriptionJobStatus;

        if (jobStatus === 'COMPLETED') {
            return result.MedicalTranscriptionJob;
        } else if (jobStatus === 'FAILED') {
            throw new Error("Transcription job failed.");
        }

        // Wait for a few seconds before checking again
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Fetch the transcription text from the S3 URI
async function getTranscriptionText(transcriptUri: string) {
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.OUTPUT_BUCKET,
        Key: transcriptUri.split('/').pop()  // Extract the file name from the URI
    };

    const data = await s3.getObject(params).promise();
    return data.Body.toString('utf-8');
}
