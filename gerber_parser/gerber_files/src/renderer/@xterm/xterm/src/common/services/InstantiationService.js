"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 *
 * This was heavily inspired from microsoft/vscode's dependency injection system (MIT).
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantiationService = exports.ServiceCollection = void 0;
const Services_1 = require("common/services/Services");
const ServiceRegistry_1 = require("common/services/ServiceRegistry");
class ServiceCollection {
    constructor(...entries) {
        this._entries = new Map();
        for (const [id, service] of entries) {
            this.set(id, service);
        }
    }
    set(id, instance) {
        const result = this._entries.get(id);
        this._entries.set(id, instance);
        return result;
    }
    forEach(callback) {
        for (const [key, value] of this._entries.entries()) {
            callback(key, value);
        }
    }
    has(id) {
        return this._entries.has(id);
    }
    get(id) {
        return this._entries.get(id);
    }
}
exports.ServiceCollection = ServiceCollection;
class InstantiationService {
    constructor() {
        this._services = new ServiceCollection();
        this._services.set(Services_1.IInstantiationService, this);
    }
    setService(id, instance) {
        this._services.set(id, instance);
    }
    getService(id) {
        return this._services.get(id);
    }
    createInstance(ctor, ...args) {
        const serviceDependencies = (0, ServiceRegistry_1.getServiceDependencies)(ctor).sort((a, b) => a.index - b.index);
        const serviceArgs = [];
        for (const dependency of serviceDependencies) {
            const service = this._services.get(dependency.id);
            if (!service) {
                throw new Error(`[createInstance] ${ctor.name} depends on UNKNOWN service ${dependency.id}.`);
            }
            serviceArgs.push(service);
        }
        const firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
        // check for argument mismatches, adjust static args if needed
        if (args.length !== firstServiceArgPos) {
            throw new Error(`[createInstance] First service dependency of ${ctor.name} at position ${firstServiceArgPos + 1} conflicts with ${args.length} static arguments`);
        }
        // now create the instance
        return new ctor(...[...args, ...serviceArgs]);
    }
}
exports.InstantiationService = InstantiationService;
