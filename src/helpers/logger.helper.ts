import { createLogger, format, transports } from 'winston';
import  'winston-daily-rotate-file';

const _generateLogLevel = (level?: string) => {
  switch (level) {
    case 'DEV':   return 'debug';
    case 'QA':  return 'info';
    case 'PRD':
    default : return 'error'
  }
}

const level = _generateLogLevel(process.env.ENV);

const configurationBase = [
  format.errors({ stack: true }),
  format.timestamp({format: 'YYYY-MM-DD|HH:mm:ss:SSS'}),
  format.align(),
  format.printf(info => `${info.level}|${[info.timestamp]}|${info.message}`)
]

const configurationConsole = format.combine(
  format.colorize(),
  ...configurationBase
);

const configurationFile = format.combine(
  ...configurationBase
);

const transport = new transports.DailyRotateFile({
  filename: `${process.env.LOG_PATH}/TS_SERVER_%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxSize: '10m',
  maxFiles: '7d',
  format: configurationFile,
  level
})

transport.on('rotate', (oldFilename, newFilename) =>  {
  const today = new Date().toISOString().split('T');
  console.log(`warn|${today[0]}|${today[1]}| LOG_ROTATED [FROM: ${oldFilename} TO: ${newFilename}]`);
});

export default createLogger({
  transports : [
    new transports.Console({
      format: configurationConsole,
      level
    }),
    transport
  ]
});
