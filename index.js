const AWS = require('aws-sdk');
const S3 = new AWS.S3();


exports.handler = async (event) => {
  console.log(event.Records[0].s3.object);
  const newImageRecord = {'name': event.Records[0].s3.object.key, 'type': 'jpeg', "size": event.Records[0].s3.object.size};
  let Bucket = '401lab17';
  let Key = 'images.json';

  try {
    // get images.json(file)
  let imagesDictionary = await S3.getObject({Bucket, Key}).promise();
  // turn buffer --> string; string --> JSON
  let stringifiedImages = imagesDictionary.Body.toString();
  let parsedImages = JSON.parse(stringifiedImages);
  
  const filteredDuplicates = parsedImages.filter(rec => rec.name !== event.Records[0].s3.object.key);
  filteredDuplicates.push(newImageRecord);
  
  const body = JSON.stringify(filteredDuplicates)
  const command = { Bucket, Key: 'images.json', Body: body, ContentType: 'application/json' };
  await uploadFileOnS3(command);

  } catch (e) {
    console.error(e);
    const body = JSON.stringify(newImageRecord)
    const command = { Bucket, Key: 'images.json', Body: body, ContentType: 'application/json' };
    await uploadFileOnS3(command);
    // imagesDictionary = [];
  }
    
};

async function uploadFileOnS3(command){
try {
  const response = await S3.upload(command).promise();
  console.log('Response: ', response);
  return response;
} catch (err) {
  console.log(err);
}
};