const glob = require('glob');
const { replaceImage } = require('./replaceImage.js');

  /*
/
 - /about/
   - /images/
     - myimage.jpg
   - index.html

   <img src="./images/myimage.jpg" alt="" />

   const base = path.base(currentFilePath);
   path.resolve(process.env.URL, base, relativeImagePath)
   path.resolve('https://example.com', '/about/', './images/myimage.jpg');
*/
// upload docs: https://cloudinary.com/documentation/image_upload_api_reference


// const imagePath = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/fetch/q_auto,f_auto/${imageURL}`

module.exports = {

  async onPostBuild({ inputs, utils, constants }) {

    const cloudName = inputs.cloudinaryCloudName || process.env.cloudinaryCloudName;
    if(!cloudName) {
      // err
      console.log('err out properly');
      return;
    }

        // find all HTML files in the build directory
    const files = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`);

    // run all the file replacements in parallel...
    const promises = files.map(replaceImage(cloudName));

    // ...but wait for them all to finish before moving on
    await Promise.all(promises);



  }

};
