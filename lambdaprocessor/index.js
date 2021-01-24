"use strict";

exports.handler = (event, context, callback) => {
  /* Process the set of records and transform */
  const items = event.records.map((record) => {
    let item = new Buffer(record.data, "base64").toString("utf8");
    // Adding a new line after every record for athena processing
    let result = item + "\n";
    const payload = new Buffer(result, "utf8").toString("base64");

    return {
      recordId: record.recordId,
      result: "Ok",
      data: payload,
    };
  });
  console.log(`Processing done.  Total Successful records ${items.length}.`);
  callback(null, { records: items });
};
