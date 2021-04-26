FROM mongo

COPY mock_data.json /mock_data.json
CMD mongoimport --host $HOST --username $USERNAME --password $PASSWORD --authenticationDatabase admin --db $DATABASE --collection jobs --type json --file /mock_data.json --jsonArray
