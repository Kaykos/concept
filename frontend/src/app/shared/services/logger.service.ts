import {Injectable} from '@angular/core';

declare var debug: any;

@Injectable()
export class Logger {
  private logger: any;

  constructor(){
    this.logger = debug;
  }

  log(...args: any[]){
    this.logger.log(...args);
  }

  debug(...args: any[]){
    this.logger.debug(...args);
  }

  info(...args: any[]){
    this.logger.info(...args);
  }

  warn(...args: any[]){
    this.logger.warn(...args);
  }

  error(...args: any[]){
    this.logger.error(...args);
  }
}
