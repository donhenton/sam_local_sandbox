#convert swagger 1 to 2 with pi-spec-converter 
#npm install -g pi-spec-converter
pi-spec-converter \
--from=swagger_1 \
--to=swagger_2 \
--syntax=json \
rclean.json > restaurants2.json
