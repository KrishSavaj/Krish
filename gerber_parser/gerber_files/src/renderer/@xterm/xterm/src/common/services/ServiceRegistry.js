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
exports.serviceRegistry = void 0;
exports.getServiceDependencies = getServiceDependencies;
exports.createDecorator = createDecorator;
const DI_TARGET = 'di$target';
const DI_DEPENDENCIES = 'di$dependencies';
exports.serviceRegistry = new Map();
function getServiceDependencies(ctor) {
    return ctor[DI_DEPENDENCIES] || [];
}
function createDecorator(id) {
    if (exports.serviceRegistry.has(id)) {
        return exports.serviceRegistry.get(id);
    }
    const decorator = function (target, key, index) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(decorator, target, index);
    };
    decorator.toString = () => id;
    exports.serviceRegistry.set(id, decorator);
    return decorator;
}
function storeServiceDependency(id, target, index) {
    if (target[DI_TARGET] === target) {
        target[DI_DEPENDENCIES].push({ id, index });
    }
    else {
        target[DI_DEPENDENCIES] = [{ id, index }];
        target[DI_TARGET] = target;
    }
}
