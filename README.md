# HEADLESS Three.js

This template is a simple starting point for a headless three.js project. It demonstrates how to create a scene, add a camera, load an environment and render the scene to a file.

This repo can be extended for numerous use cases. I have included an example `dockerfile`, its configured for runpod, but can be modified to run on any cloud provider.

## What to explore
1. Pass inputs into the script via cmd line args to adjust the scene/output
2. Return the rendered image as a base64 string in the runpod response
3. Rather than saving the image to disk, upload it to a cloud storage service
4. Use animations to create multiple frames and stitch them together to create a gif

## Remember
- The puppeteer base image version should be the same as the package version in the `package.json`, otherwise you may have version conflicts that are difficult to debug.
- To update the three.js version, just update the version in the `importmap` at the top of `render.html` file.
