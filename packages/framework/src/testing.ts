/*
 * Deepkit Framework
 * Copyright (C) 2021 Deepkit UG, Marc J. Schmidt
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the MIT License.
 *
 * You should have received a copy of the MIT License along with this program.
 */

import { BrokerKernel } from '@deepkit/broker';
import { ClassType } from '@deepkit/core';
import { ConsoleTransport, Logger, MemoryLoggerTransport } from '@deepkit/logger';
import { Database, DatabaseRegistry, MemoryDatabaseAdapter } from '@deepkit/orm';
import { ClassSchema } from '@deepkit/type';
import { Application } from './application';
import { ApplicationServer } from './application-server';
import { Broker, BrokerServer, DirectBroker } from './broker/broker';
import { injectorReference, Provider } from '@deepkit/injector';
import { AppModule, ModuleOptions } from '@deepkit/app';
import { WebMemoryWorkerFactory, WebWorkerFactory } from './worker';


export class TestingFascade<A extends Application<any>> {
    constructor(public app: A) { }

    public async startServer() {
        await this.app.get(ApplicationServer).start();
    }

    public async stopServer() {
        await this.app.get(ApplicationServer).close();
    }

    public async request(method: string, path: string, body?: any) {

    }

    public createRpcClient() {
        return this.app.get(ApplicationServer).createClient();
    }
}

export class BrokerMemoryServer extends BrokerServer {
    public kernel = new BrokerKernel();

    async start() {
    }

    async stop() {
    }
}

/**
 * Creates a new Application instance, but with kernel services in place that work in memory.
 * For example RPC/Broker/HTTP communication without TCP stack. Logger uses MemoryLogger.
*/
export function createTestingApp<O extends ModuleOptions>(optionsOrModule: O, entities?: (ClassType | ClassSchema)[]): TestingFascade<Application<O>> {
    const module = optionsOrModule instanceof AppModule ? optionsOrModule : new AppModule(optionsOrModule);

    module.setupProvider(Logger).removeTransport(injectorReference(ConsoleTransport));
    module.setupProvider(Logger).addTransport(injectorReference(MemoryLoggerTransport));

    const providers: Provider<any>[] = [
        { provide: WebWorkerFactory, useClass: WebMemoryWorkerFactory }, //don't start HTTP-server
        { provide: BrokerServer, useClass: BrokerMemoryServer }, //don't start Broker TCP-server
        MemoryLoggerTransport,
        {
            provide: Broker, deps: [BrokerServer], useFactory: (server: BrokerMemoryServer) => {
                return new DirectBroker(server.kernel);
            }
        },
    ];

    if (entities) {
        providers.push({ provide: Database, useValue: new Database(new MemoryDatabaseAdapter, entities) })
        module.setupProvider(DatabaseRegistry).addDatabase(Database);
    }

    return new TestingFascade(new Application(module, providers));
}
