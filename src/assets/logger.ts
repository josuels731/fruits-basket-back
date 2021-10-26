// Type Definitions
interface T_EnvConfig {
  consoleLog: boolean,
  color?: string
}

type T_EnvType = {
  index: T_EnvConfig,
  logger_main: T_EnvConfig,
  logger_error: T_EnvConfig,
  server_main: T_EnvConfig,
  server_requests: T_EnvConfig,
  database_connection: T_EnvConfig,
}

type T_Environments = keyof T_EnvType;

// Constant values definition
const environments: T_EnvType = {
  index: { consoleLog: true },
  logger_main: { consoleLog: true },
  logger_error: { consoleLog: true },
  server_main: { consoleLog: true },
  server_requests: { consoleLog: true },
  database_connection: { consoleLog: true },
}

const colors = [
  '\x1b[32m',
  '\x1b[33m',
  '\x1b[34m',
  '\x1b[35m',
  '\x1b[36m',
  '\x1b[31m\x1b[1m',
  '\x1b[32m\x1b[1m',
  '\x1b[33m\x1b[1m',
  '\x1b[34m\x1b[1m',
  '\x1b[35m\x1b[1m',
  '\x1b[36m\x1b[1m',
];

// Variables Definition
let colorInd = 0;

// Code
function log(data: any, source: T_Environments) {
  const conf = environments[source];
  const date = new Date();
  const now = `${date.toLocaleTimeString()}.${date.getMilliseconds().toString().padStart(3, '0')}`.padStart(12, ' ');
  if (!conf) {
    consoleLog('logger_main', now, `Fonte ${source} não identificada: ${data}`, true, { color: '\x1b[37m' });
    return;
  }

  if (conf.consoleLog) {
    consoleLog(source, now, data, false, conf);
  }
}

function error(data: any, source: T_Environments) {
  const conf = environments[source];
  const date = new Date();
  const now = `${date.toLocaleTimeString()}.${date.getMilliseconds().toString().padStart(3, '0')}`.padStart(12, ' ');
  if (!conf) {
    consoleLog('logger_error', now, `Fonte ${source} não identificada: ${data}`, true, { color: '\x1b[30m' });
    return;
  }

  if (conf.consoleLog) {
    consoleLog(source, now, data, true, conf);
  }
}

function consoleLog(source: T_Environments, timestampString: string, data: any, isError: boolean, conf: any) {
  const clearColor = '\x1b[0m';
  const errorColor = '\x1b[41m\x1b[1;33m';
  const formattedSource = source.padStart(20, ' ');

  if (!conf.color)
    newColor(source);
  const confColor = conf.color;

  const type = isError ? `${errorColor}Erro: ${clearColor}` : `${confColor} Log: `;

  console.log(type, confColor, formattedSource, '-', timestampString, '-', clearColor, data);
}

function newColor(source: T_Environments) {
  if (!colors[colorInd])
    colorInd = 0;

  environments[source].color = colors[colorInd];
  colorInd++;
}

export { log, error };