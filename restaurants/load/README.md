# Loading Data

## Files And Their Purposes

* odata.json Original JSON Restaurant/Review Data
* doload.sh Launcher to actually batch write data to Dynamodb
* transform.js take odata and create appropriate batch write files in the out directory
* rundocker.sh local dynamodb docker launcher
