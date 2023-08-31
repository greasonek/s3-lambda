# LAB 17 - S3 & LAMBDA

## Author: Emily Greason

### HOW TO

- Using AWS-S3, this lab initiates an event that stores uploaded images as JSON files with the object containing name, type and size

- I created a Bucket (401lab17) with the Key being (images.json) and used a try/catch block to take in the new images, stringify the object, and parse the JSON file.

- This event also filters for duplicate files using parsedImages.filter to find names that are identical and push the filtered duplicates into the images record

- The async function uploadFileOnS3 uses a try/catch block to catch the response which is the uploaded image with the JSON information

### Issues

- Some issues I ran into were that my json file was not originally loading all of the files I was uploading and not taking in the values for the id, name and number

- Once I realized that my filter wasn't filtering for the image names that were different I was able to get more uploaded images to appear in the JSON

### link to images.json file
https://401lab17.s3.us-west-2.amazonaws.com/images.json
