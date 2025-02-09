import {
    KinesisStreamEvent,
    Context,
    KinesisStreamHandler,
    KinesisStreamRecordPayload,
  } from "aws-lambda";
  import { Buffer } from "buffer";
  import { Logger } from "@aws-lambda-powertools/logger";
  
  const logger = new Logger({
    logLevel: "INFO",
    serviceName: "kinesis-stream-handler-sample",
  });
  
  export const preprocess: KinesisStreamHandler = async (
    event: KinesisStreamEvent,
    context: Context
  ): Promise<void> => {
    for (const record of event.Records) {
      try {
        logger.info(`Processed Kinesis Event - EventID: ${record.eventID}`);
        const recordData = await getRecordDataAsync(record.kinesis);
        logger.info(`Record Data: ${recordData}`);
        } catch (err) {
        logger.error(`An error occurred ${err}`);
        throw err;
      }
      logger.info(`Successfully processed ${event.Records.length} records.`);
    }
  };
  
  async function getRecordDataAsync(
    payload: KinesisStreamRecordPayload
  ): Promise<string> {
    var data = Buffer.from(payload.data, "base64").toString("utf-8");
    await Promise.resolve(1);
    return data;
  }
  
  