const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

const projectId = 'speech-analysis';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file, e.g. 16000
const sampleRate = 16000;

const request = {
  config: {
    encoding: encoding,
    sampleRate: sampleRate,
    languageCode: 'en-GB',
    speechContext: {
      phrases: ['Shahzainit day', 'Buildit hackday']
    }
  }
};

// Create a recognize stream
const recognizeStream = speechClient.createRecognizeStream(request)
  .on('error', (error) => {
    console.error(error.message)
  })
  .on('data', (data) => {
    console.log(data);
    //process.stdout.write(data.results);
  });

// Start recording and send the microphone input to the Speech API
record.start({
  sampleRate: sampleRate,
  threshold: 0
}).pipe(recognizeStream);
console.log('Listening, press Ctrl+C to stop.');
