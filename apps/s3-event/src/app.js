exports.lambdaHandler = async(event, context) => {
    let fileList;

    function isImage(fName) {
        return fName.match(/\.(gif|jpg|jpeg|tiff|png)$/i)
    }

    try {

        fileList = event['Records'].map(r => {

            const { s3: { bucket: { name: bucketName } } } = r;
            const { s3: { object: { key: fileName } } } = r;
            const outputBucketName = bucketName.replace('input', 'output');
            res = { bucketName, fileName, outputBucketName }
            if (isImage(fileName)) {
                return res;
            } else {
                return null;
            }
        }).filter(i => {
            if (i) return i;
        })

        console.log(fileList)

    } catch (err) {
        console.log(err);
        return err;
    }



    return fileList
};